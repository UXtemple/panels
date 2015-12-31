# panels by UXtemple

A runtime to run panels apps.

Docs are WIP.

See `playground/panels.dev.es6` for an example app for now.

## Anatomy of a panels app

The minimal panels app will export two things, `panels` and `types`:

```js
// app.js
var React = require('react');

var panels = {
  '/': {
    type: 'Home'
  }
};

var types = {
  'Home': React.createClass({
    displayName: 'Home',
    render: function() {
      return React.createElement('div', {}, 'Home');
    }
  })
};

module.exports = {
  panels: panels,
  types: types
};
```

`panels` is lookup matching paths to types.
`types` is a lookup matching types to React components.

Panels works with browserify-like bundles and leverages [its
ability](https://github.com/substack/node-browserify#multiple-bundles) to require modules across
different JavaScript files loaded in a browser.

Bundle your app with:
```
browserify --external react --require ./app.js:app.com > app.com.js
```

```
sudo static --port 80 .
```

And launch it on a browser:
```html
<!-- app.html -->
<!DOCTYPE html>
<html lang=en>
  <head>
    <meta charset=utf-8 />
    <meta content='IE=edge,chrome=1' http-equiv=X-UA-Compatible />
    <meta content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' name=viewport />
    <meta content=! name=fragment />
    <title>panels</title>
    <style>body{margin:0;}a,button,div,img,input,form,h1,h2,h3,h4,h5,h6,h7,nav,label,li,ol,p,span,svg,ul{box-sizing:border-box;position:relative;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:stretch;align-items:stretch;-webkit-flex-shrink:0;flex-shrink:0;border:0 solid black;margin:0;padding:0;}.panel::-webkit-scrollbar{width:0!important;}</style>
  </head>
  <body>
    <div id=root></div>
    <script src=panels.js></script>
    <script src=app.com.js></script>
  </body>
</html>
```

Your app is composed of at least two files:

```js
// panels.json
{
  "logic": "https://my.app.com/logic.js"
}
```

ES6 example
```js
// app.js
import React from 'react';

export const panels = {
  '/': {
    type: 'Home'
  }
}

export const types = {
  'Home': props => <div>Home!</div>
}
```


and a module bundle that exposes at least `panels` and `types`:


MIT license.

With <3 by UXtemple.
Like Panels? Get in touch! :)
Ping us on twitter [@uxtemple](https://twitter.com/uxtemple) or drop us a line hi@uxtemple.com.
