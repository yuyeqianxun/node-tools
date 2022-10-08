import chalk from 'chalk';

var site1 = chalk.red({ name : "Runoob", site : "www.runoob.com" })
var site2 = chalk.red({ name : "Google", site : "www.google.com" })
var site3 = chalk.red({ name : "Taobao", site : "www.taobao.com" })
const a = chalk.red("Runoob");
console.log(a);
console.table([site1, site2, site3], ["name","site"]);
