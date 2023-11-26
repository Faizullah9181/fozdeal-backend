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

        const {
            MID,
            ORDERID,
            RESPCODE,
            RESPMSG,
            STATUS,
            TXNAMOUNT,
            issandboxmode,
            transaction_number,
            transaction_status,
            website_ref_no,
            checksumhash
        } = this.data;
        const url =
            'http://localhost:5173/payment?MID=' +
            MID +
            '&ORDERID=' +
            ORDERID +
            '&RESPCODE=' +
            RESPCODE +
            '&RESPMSG=' +
            RESPMSG +
            '&STATUS=' +
            STATUS +
            '&TXNAMOUNT=' +
            TXNAMOUNT +
            '&issandboxmode=' +
            issandboxmode +
            '&transaction_number=' +
            transaction_number +
            '&transaction_status=' +
            transaction_status +
            '&website_ref_no=' +
            website_ref_no +
            '&checksumhash=' +
            checksumhash;

        return this.res.redirect(301, url);
    }
}
