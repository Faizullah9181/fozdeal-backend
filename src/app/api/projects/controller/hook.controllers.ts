const { MasterController, RequestBuilder } = require('@orca/base-packages');

export default class HookController extends MasterController {
    static doc() {
        return {
            tags: ['Webhook'],
            description: 'Webhook',
            summary: 'A webhook'
        };
    }

    static validate() {
        return new RequestBuilder();
    }

    async controller() {
        console.log('WEBHOOK', JSON.stringify(this.data));
        return this.res.redirect(301, 'https://fozdeal-client.netlify.app/');
    }
}
