export default function loadStyle(file, head, fn) {
  if (typeof head === 'function') {
    fn = head;
    head = document.getElementsByTagName('head')[0];
  }

  let style = document.createElement('style');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  let done = false;
  let timer;

  function ready(err) {
    done = true;
    style.onload = style.onerror = style.onreadystatechange = null;
    clearTimeout(timer);
    fn(err);
  }

  style.onload = style.onreadystatechange = function(e) {
    if (!done && (!this.readyState || this.readyState == 'complete' || this.readyState == 'loaded')) {
      ready(null);
    }
  };

  style.onerror = function(error) {
    if (!done) {
      ready(error || new Error('Could not load file'));
    }
  };

  timer = setTimeout(function() {
    ready(new Error('style loading timed-out'));
  }, 3e4);

  style.href = file;
  head.appendChild(style);
}
