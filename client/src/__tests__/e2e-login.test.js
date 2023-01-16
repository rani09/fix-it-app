const puppeteer = require('puppeteer');
jest.setTimeout(50000); // 50 seconds

describe('log ind', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
    page = await browser.newPage();
  });

  it('should load the login page', async () => {
    await page.goto('http://localhost:3000/login');
    const title = await page.title();
    expect(title).toBe('Log ind');
  });

  it('should allow the user to login', async () => {
    await page.goto('http://localhost:3000/login');
    await page.type('input[type=email]', 'rani07@live.com');
    await page.type('input[type=password]', 'rani1992');
    await page.click('input[type=submit]');
    await page.waitForNavigation();
    const title = await page.title();
    expect(title).toBe('Dashboard');
  });
  
  afterEach(async () => {
    await browser.close();
  });
});
