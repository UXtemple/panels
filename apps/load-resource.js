// Original source [partition-bundle](https://github.com/arian/partition-bundle/blob/master/lib/loadScript.js)
const LOGIC = 'js';
const STYLE = 'css';

function getType(file) {
  return file.match(/\.([a-z]+)$/)[1];
}

function createResource(file) {
  switch(getType(file)) {
  case LOGIC:
    return document.createElement('script');

  case STYLE:
    const resource = document.createElement('link');
    resource.rel = 'stylesheet';
    resource.type = 'text/css';
    return resource;

  default:
    throw new Error(`Can't create resource ${type} with source ${file}`);
  }
}

function setSource(resource, file) {
  switch(getType(file)) {
  case LOGIC:
    resource.src = file;
    break;

  case STYLE:
    resource.href = file;
    break;

  default:
    throw new Error(`Can't set source ${file} on resource ${type}`);
    break;
  }
}

export default function load(file) {
  return new Promise((resolve, reject) => {
    if (typeof file === 'undefined') {
      return resolve();
    }

    let done = false;
    let resource = createResource(file);
    let timer;

    function ready(err) {
      done = true;
      resource.onload = resource.onerror = resource.onreadystatechange = null;
      clearTimeout(timer);
      err ? reject(err) : resolve();
    }

    resource.onload = resource.onreadystatechange = function(e) {
      if (!done && (!this.readyState || this.readyState == 'complete' || this.readyState == 'loaded')) {
        ready(null);
      }
    };

    resource.onerror = function(error) {
      if (!done) {
        ready(error || new Error('Could not load file'));
      }
    };

    timer = setTimeout(function() {
      ready(new Error(`Resource ${file} loading timed-out`));
    }, 3e4);

    setSource(resource, file);
    document.getElementsByTagName('head')[0].appendChild(resource);
  });
}
