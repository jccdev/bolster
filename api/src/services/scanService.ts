import puppeteer from 'puppeteer';
import { ScanDb } from '../queries/types/scanDb';
import { ScanQueries } from '../queries/scanQueries';
import { SslInfo } from './types/sslInfo';

export class ScanService {
  constructor(private scanQueries = new ScanQueries()) {}

  async getAll(take?: number, skip?: number): Promise<ScanDb[]> {
    const dbRes = await this.scanQueries.select(take, skip);
    return dbRes;
  }

  async scan(url: string): Promise<ScanDb> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0); // should set this to something better

    // get page info
    const httpRes = await page.goto(url);
    const htmlContent = await page.content();

    // fetch redirection info
    const redirectChain = httpRes.request().redirectChain();
    const destination_url = redirectChain.at(-1)?.url() ?? url;

    // naive natural language
    const naturalLanguageContent = await page.$eval(
      '*',
      (el) => (el as any).innerText
    );

    // todo setup ASN info

    // ssl info
    const securityDetails = await httpRes.securityDetails();
    const sslInfo: SslInfo = {
      issuer: securityDetails.issuer(),
      validFrom: securityDetails.validFrom(),
      validTo: securityDetails.validTo(),
      protocol: securityDetails.protocol(),
      subjectName: securityDetails.subjectName(),
      subjectAlternativeNames: securityDetails.subjectAlternativeNames(),
    };

    const snapshot = await page.screenshot();
    await browser.close();

    const dbRes = await this.scanQueries.insert({
      source_url: url,
      destination_url: destination_url,
      snapshot: snapshot.toString('base64'), // todo store in S3
      ip_address: httpRes.remoteAddress()?.ip,
      ssl_info: JSON.stringify(sslInfo),
      html_content: htmlContent, // todo store in S3
      natural_language_content: naturalLanguageContent, // todo store in S3
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted: false,
    });

    return dbRes;
  }
}
