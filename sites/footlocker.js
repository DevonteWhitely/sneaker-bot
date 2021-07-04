const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config({path:__dirname+'/../.env'});


const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: 'b14314e19cc3be8a93f44422960544a3' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);

const email = process.env.EMAIL;
const pass = process.env.PASS;
const shoeSize = process.env.SHOE_SIZE;

console.log(`Email: ${email}, Password: ${pass}, Shoe Size: ${shoeSize}`);

const footLockerSize = shoeSize * 10;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();
  // Base url: "https://www.footlocker.com/product/" + shoe-name/ + product# + .html
  const url = "https://www.footlocker.com/product/nike-air-force-1-07-le-mens/W2288111.html";
  await page.goto(url);

  await page.solveRecaptchas();

  // Get name of shoe
  const nameElement = await page.waitForSelector('.ProductName-primary');
  const shoeName = await nameElement.evaluate(el => el.textContent);
  console.log("\nName of shoe: ");
  console.log(shoeName);

  // Get list of sizes
  const sizes = await page.evaluate(() => {
    let label = document.querySelectorAll(".c-form-label-content");
    let list = [...label];
    return list.map(size => size.innerText);
  });
  console.log("\nList of sizes: ");
  console.log(sizes);

  // Click shoe size 10.5
  await page.waitForTimeout(4000);
  const sizeButton = await page.$("#ProductDetails_radio_size_" + footLockerSize);
  await sizeButton.evaluate((e) => e.click());
//   await page.screenshot({ path: "size.png" });

  // Add item to cart
  await page.waitForTimeout(4000);
  await page.click('[class="Button Button ProductDetails-form__action"]',{clickCount:1});

//   30 seconds
  const viewTime = 30000;
  await page.waitForTimeout(viewTime);
  await browser.close();
})();
