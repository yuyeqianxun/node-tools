const sharp = require("sharp");

const sharp1 = sharp('./bg.jpg');
// 调整大小
// sharp1
//   .metadata()
//   .then(function(metadata) {
//     return sharp1
//       .resize(Math.round(metadata.width / 2))
//       .jpeg()
//       .toFile('output.jpg');
//   })
//   .then(function(data) {
// 截图
//   });
// sharp1.
//   extract({ left: 1024, top: 512, width: 512, height: 512 })
//   .toFile('extract.jpg');
// 抠图
const sharp2 = sharp('./bg.png');
sharp2.
  trim()
  .toFile('trim.png');