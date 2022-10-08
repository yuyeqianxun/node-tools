const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // 访问页面
  await page.goto('https://image.baidu.com');
  // 聚焦input
  await page.focus("#kw");
  // 输入关键字
  await page.keyboard.sendCharacter("saber 1920*1080");
  // 点击搜索
  await page.click(".s_newBtn");
  page.on('load',async function() {
    const result = await page.evaluate(async ()=>{
      const images = document.querySelectorAll(".main_img")
    })
  })
  await browser.close();
})();