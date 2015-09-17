import { panels, vendor } from './assets';

const HEAD = '<link href=https://fonts.googleapis.com/css?family=Roboto:100,400&subset=latin,latin-ext rel=stylesheet />';

export default function render({apps, data, head=HEAD, html, title}) {
  const appsScripts = apps.map(app => `<script src=//${app}/${app}.js></script>`);

  return `<!DOCTYPE html>
<html lang=en>
  <head>
    <meta charset=utf-8 />
    <meta content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' name=viewport />
    <base href=/ />
    <meta content=! name=fragment />
    <title>${title}</title>
    <link href=/favicon.ico rel=icon type=image/x-icon />
    ${head}
    <link href=https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css rel=stylesheet />
    <style>body{margin:0;}a,div,img,input,h1,h2,p,span{box-sizing:border-box;position:relative;display:flex;flex-direction:column;align-items:stretch;flex-shrink: 0;border:0 solid black;margin:0;padding:0;}</style>
  </head>
  <body>
    <div id=root>${html}</div>
    <script>window.__panels__=${data};</script>
    <script src=${vendor}></script>
    ${appsScripts}
    <script src=${panels}></script>
  </body>
</html>`;
}
