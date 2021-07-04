const puppeteer = require('puppeteer');

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

  // 10 seconds
  const viewTime = 10000;
  await page.waitForTimeout(viewTime);
  await browser.close();
})();