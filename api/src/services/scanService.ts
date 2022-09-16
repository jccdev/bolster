import puppeteer from 'puppeteer';

export class ScanService {
    async scan(url: string) {
        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto(url);
        const res = await page.screenshot();
        await browser.close();
        return res;
    }
}
