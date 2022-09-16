import puppeteer from 'puppeteer';
import {ScanDb} from "../queries/types/scanDb";
import {ScanQueries} from "../queries/scanQueries";

export class ScanService {

    constructor(private scanQueries = new ScanQueries()) {
    }

    async getAll(take?: number, skip?: number): Promise<ScanDb[]> {
        const dbRes = await this.scanQueries.select(take, skip);
        return dbRes;
    }

    async scan(url: string): Promise<ScanDb> {
        const browser = await puppeteer.launch({args: ['--no-sandbox']});

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0); // should set this to something better

        // get page info
        const httpRes = await page.goto(url);

        // fetch redirection info
        const redirectChain = httpRes.request().redirectChain();
        const destination_url = redirectChain.at(-1)?.url() ?? url;

        const snapshot = await page.screenshot();
        await browser.close();

        const dbRes = await this.scanQueries.insert({
            source_url: url,
            destination_url: destination_url,
            snapshot: snapshot.toString('base64'),
            ip_address: httpRes.remoteAddress()?.ip,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted: false,
        })

        return dbRes;
    }
}
