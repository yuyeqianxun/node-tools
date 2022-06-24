const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // 指定视口宽度
  // await page.setViewport({
  //   width: 1920,
  //   height: 1080,
  //   deviceScaleFactor: 1,
  // });
  // 指定截图设备
  await page.emulate(iPhone);
  // 访问页面
  await page.goto('https://activity.acfun.cn/invite-share?userId=');
  // 开始截图
  await page.screenshot({ 
    path: 'acfun.png',
    fullPage: true,
    captureBeyondViewport: false
  });
  await browser.close();
})();