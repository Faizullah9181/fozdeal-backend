import * as supertest from 'supertest';
import TestServer from './TestServer';
import { expect } from 'chai';
import 'mocha';

let server: any;
before(async () => {
    const { app } = await TestServer.initiate();
    server = app;
});

// eslint-disable-next-line no-undef
describe('Health Check API', () => {
    // eslint-disable-next-line no-undef
    it('--- description ---', async () => {
        let resp = await supertest(server).get('/v1/health');
        const result = resp.body;
        expect(resp.status).to.equal(200);
        expect(result).to.be.haveOwnProperty('data');
    });
});

after(async (done) => {
    done();
});
