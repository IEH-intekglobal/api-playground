import config from '../../../package.json' with { type: 'json'};

export default {
    async find() { return { version: config.version } },
}