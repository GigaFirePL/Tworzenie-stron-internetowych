import Koa from 'koa';
import Router from '@koa/router';

// Initialize Koa and Router
const app = new Koa();
const router = new Router();

// Define routes
router.get('/hello', (ctx) => {
    ctx.body = 'Hello, world';
});

router.get('/goodbye', (ctx) => {
    ctx.body = 'Goodbye, world';
});

// Use router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});