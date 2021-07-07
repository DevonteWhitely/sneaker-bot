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
  
  const url = "https://www.nike.com/t/air-vapormax-2021-fk-mens-shoe-NpTfFz/DH4084-003";

  await page.goto(url);

  const listOfSizes = await page.evaluate(async() => {
    let sizes = Array.from(document.querySelectorAll(".css-xf3ahq"));
    let sizeList = [...sizes];
    return sizeList.map(shoeSize => shoeSize.innerText);
  });

  console.log("Sizes: ");
  console.log(listOfSizes);

  // Click shoe size
  const sizeButton = await page.$("#skuAndSize__26149642"); // 26149642 -> Size 10
  await sizeButton.evaluate((e) => e.click());

  // Add to bag
  const addToCart = await page.$('[class="ncss-btn-primary-dark btn-lg add-to-cart-btn"]');
  await addToCart.evaluate((a) => a.click());
  console.log("Shoes added to cart...");

  // 30 seconds
  const viewTime = 30000;
  await page.waitForTimeout(viewTime);
  await browser.close();
})();