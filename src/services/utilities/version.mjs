import packageInfo from '../../../package.json' with { type: 'json'};

export default (ctx) => {
    ctx.body = { version: packageInfo.version };
}