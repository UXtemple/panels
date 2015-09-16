import koa from 'koa';
import sendfile from 'koa-sendfile';
import serve from 'koa-static';

let app = koa();
app.use(serve('./playground'));
app.use(catchAll);
app.listen(80);

function *catchAll(next) {
  yield* sendfile.call(this, './playground/index.html');

  if (!this.status) {
    this.throw(404);
  }
}

console.log('panels catch-all dev server is ready at http://localhost');
