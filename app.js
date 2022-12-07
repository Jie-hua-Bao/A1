//設定express 模板，存在express的變數中
const express = require("express");
//啟動express 並存放在app變數中
const app = express();
//預設連線埠號
const port = 3000;
//設定express-handlebars，存在exphbs的變數中
const exphbs = require("express-handlebars");
const restaurantlist = require("./restaurant.json");
//設置模板引擎，使用express-handlebars，預設布局main
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//設定view engine裡的檔案為handlebars
app.set("view engine", "handlebars");
//設置靜態文件
app.use(express.static('public'))
//設定路由器
app.get("/", (req, res) => {
  res.render('index');
});
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
