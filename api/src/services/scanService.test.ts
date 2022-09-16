import { assert } from 'chai';
import { ScanService } from './scanService';

describe('Scan Service Tests', function () {
  it('initial', async function () {
    const service = new ScanService();
    const url = 'https://www.google.com';
    const res = await service.scan(url);
    assert.isNotNull(res);
  });
});
