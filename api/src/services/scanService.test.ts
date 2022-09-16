import { assert } from 'chai';
import { ScanService } from './scanService';

describe('Scan Service Tests', function () {
  this.timeout(0);
  it('initial', async function () {
    const service = new ScanService();
    const url = 'https://www.google.com';
    const res = await service.scan(url);
    assert.isNotNull(res);
  });

  it('redirect test', async function () {
    const service = new ScanService();
    const url = 'https://shorturl.at/AD348';
    const res = await service.scan(url);
    assert.isNotNull(res);
  });
});
