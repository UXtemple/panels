// Original source [partition-bundle](https://github.com/arian/partition-bundle/blob/master/lib/loadScript.js)
export default function load(file) {
  return new Promise((resolve, reject) => {
    if (typeof file === 'undefined') {
      return resolve()
    }

    const resource = document.createElement('script')
    let done = false

    function ready(err) {
      done = true
      resource.onload = resource.onerror = resource.onreadystatechange = null
      clearTimeout(timer)
      err ? reject(err) : resolve()
    }

    resource.onload = resource.onreadystatechange = e => {
      if (
        !(done &&
          (!this.readyState ||
            this.readyState === 'complete' ||
            this.readyState === 'loaded'))
      ) {
        ready(null)
      }
    }

    resource.onerror = error => {
      if (!done) {
        ready(error || new Error('Could not load file'))
      }
    }

    const timer = setTimeout(() => {
      ready(new Error(`Resource ${file} loading timed-out`))
    }, 3e4)

    resource.src = file
    document.getElementsByTagName('head')[0].appendChild(resource)
  })
}
