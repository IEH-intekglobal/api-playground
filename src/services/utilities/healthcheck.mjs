export default function healthCheck(app) {
    return async (ctx) => {
        const { product, store, category } = app.get('sequelizeClient').models;
        const [products, stores, categories] = await Promise.all([
            product.count(),
            store.count(),
            category.count()
        ]);
        ctx.body = {
            uptime: process.uptime(),
            readonly: app.get('readonly'),
            documents: {
                products,
                stores,
                categories,
            }
        }
    }
};