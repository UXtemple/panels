import { panels, vendor } from '../assets';

const TYPE = process.env.NODE_ENV === 'production' ? 'min' : 'dev';

export default function render({apps = [], data, html='', title=''}={}) {
  const appsStyles = apps.map(app => `<link href=//${app}/${app}.css rel=stylesheet />`).join('');
  const appsScripts = apps.map(app => `<script src=//${app}/${app}.${TYPE}.js></script>`).join('');
  const panelsData = data ? `<script>window.__panels__=${data};</script>` : '';

  return `<!DOCTYPE html>
<html lang=en>
  <head>
    <meta charset=utf-8 />
    <meta content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' name=viewport />
    <base href=/ />
    <meta content=! name=fragment />
    <title>${title}</title>
    <link href=/favicon.ico rel=icon type=image/x-icon />
    ${appsStyles}
    <style>body{margin:0;}a,button,div,img,input,form,h1,h2,h3,h4,h5,h6,h7,nav,label,li,ol,p,span,svg,ul{box-sizing:border-box;position:relative;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:stretch;align-items:stretch;-webkit-flex-shrink:0;flex-shrink:0;border:0 solid black;margin:0;padding:0;}</style>
  </head>
  <body>
    <div id=root>${html}</div>
    ${panelsData}
    <script src=${vendor}></script>
    ${appsScripts}
    <script src=${panels}></script>
  </body>
</html>`;
}