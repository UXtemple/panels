import { panels, vendor } from '../assets';

const TYPE = process.env.NODE_ENV === 'production' ? 'min' : 'dev';

export default function render({apps = [], data, heapId, html, title}={}) {
  const appsStyles = apps.map(app => `<link href=//${app}/${app}.css rel=stylesheet />`).join('');
  const appsScripts = apps.map(app => `<script src=//${app}/${app}.${TYPE}.js></script>`).join('');
  const heap = heapId ? `
    <script type="text/javascript">
      window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var n=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(n?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(a,o);for(var r=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["clearEventProperties","identify","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=r(p[c])};
      heap.load("${heapId}");
    </script>
  ` : '';

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
    ${heap}
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
