import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = new Koa();
const router = new Router();

// Middleware
app.use(bodyParser());

// Helper function to render login page with username
function renderLoginPage(username = '') {
    const template = readFileSync(join(__dirname, 'login.html'), 'utf8');
    return template.replace('<%= username %>', username);
}

// Routes
router.get('/login', (ctx) => {
    const username = ctx.query.login || '';
    ctx.type = 'html';
    ctx.body = renderLoginPage(username);
});

router.post('/login', (ctx) => {
    const { username, password } = ctx.request.body;

    if (password.length < 8) {
        ctx.type = 'html';
        ctx.body = '<h1>To hasło jest zbyt krótkie</h1>';
        return;
    }

    ctx.type = 'html';
    if (username === 'admin' && password === 'adminadmin') {
        ctx.body = `<h1>Zalogowany! Witaj ${username}</h1>`;
    } else {
        ctx.body = '<h1>Nieprawidłowa nazwa użytkownika lub hasło</h1>';
    }
});

// Handle different HTTP methods with query parameters
router.get('/user', (ctx) => {
    const method = ctx.query.method || 'GET';
    const message = `Otrzymano żądanie ${method}`;
    ctx.type = 'html';
    ctx.body = `<h1>${message}</h1><a href="/login">Powrót</a>`;
});

router.put('/user', (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>Otrzymano żądanie PUT</h1><a href="/login">Powrót</a>';
});

router.delete('/user', (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>Otrzymano żądanie DELETE</h1><a href="/login">Powrót</a>';
});

// Use router
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/login`);
});