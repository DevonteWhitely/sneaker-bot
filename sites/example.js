const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();
  
  const url = "https://devexpress.github.io/testcafe/example/";

  await page.goto(url);

  // await browser.waitForTarget(() => false);

  await page.type("#developer-name", "Devonte Whitely");
  await page.click("#reusing-js-code", {clickCount:1});
  await page.click("#macos",{clickCount:1});
  await page.screenshot({ path: "name.png" });
  

  // 10 seconds
  const viewTime = 10000;
  await page.waitForTimeout(viewTime);
  await browser.close();
})();
