export default class HealthCheck {
    constructor(app) {
        this.app = app;
    }

    async find() {
        const { product, store, category } = this.app.get('sequelizeClient').models;

        const [products, stores, categories] = await Promise.all([
            product.count(),
            store.count(),
            category.count()
        ]);
        return {
            uptime: process.uptime(),
            readonly: this.app.get('readonly'),
            documents: {
                products,
                stores,
                categories,
            }
        }
    }
}