export const before = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
};

export const after = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
};

export const around = {
    find: [responseTime],
}

async function responseTime(ctx, next) {
    const startTime = Date.now();
    await next();
    if (ctx.result) {
        ctx.result.responseTime = Date.now() - startTime;
    }
}