const puppeteer = require('puppeteer');
require('dotenv').config({path:__dirname+'/../.env'});

const email = process.env.EMAIL;
const pass = process.env.PASS;
const shoeSize = process.env.SHOE_SIZE;

console.log(`\nEmail: ${email}, Password: ${pass}, Shoe Size: ${shoeSize}\n`);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();

  // Base size is for size 5
  const BaseSize = 550;
  var ShoeSize = shoeSize - 5;    
  ShoeSize = ShoeSize * 20;
  const RawSize = ShoeSize + BaseSize;

  const name = "stan-smith-shoes";
  const model = "FX5502";

  const url = "https://www.adidas.com/us/" + name + "/" + model + ".html?forceSelSize=" + model + "_" + RawSize;
  console.log(url);
  await page.goto(url);

  // Get list of all sizes
  const sizes = await page.evaluate(() => {
    let label = document.querySelectorAll('[class="gl-label size___TqqSo"] > span');
    let list = [...label];
    return list.map(size => size.innerText);
  });
  console.log("\nList of sizes: ");
  console.log(sizes);

  // Add to cart
  // await page.click('[class="gl-cta gl-cta--primary gl-cta--full-width"]', {clickCount:1});

  // 10 seconds
  const viewTime = 10000;
  await page.waitForTimeout(viewTime);
  await browser.close();
})();