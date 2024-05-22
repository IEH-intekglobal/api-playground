import { serveStatic } from "@feathersjs/koa";
import { renderMD } from "./render.mjs";

export default function () {
    const app = this;

    const staticMiddleware = serveStatic('markdown', {
        index: 'index.md',
        root: 'markdown',
        extensions: ['md']
    });
    
    app.use(async (ctx, next) => {
        await staticMiddleware(ctx, next);

        if (ctx.body) {
            const fstream = ctx.body;
            ctx.type = 'html';
            ctx.body = markdownPage(fstream);
        }
    });
}

function markdownPage(content) {
    return renderMD`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="none">
    <title>Best Buy - API Playground</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/skeleton.css">
    <link rel="stylesheet" href="/css/custom.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="twelve column">     
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;
}