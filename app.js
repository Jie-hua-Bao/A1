//設定express 模板，存在express的變數中
const express = require("express");
//啟動express 並存放在app變數中
const app = express();
//預設連線埠號
const port = 3000;
//設定express-handlebars，存在exphbs的變數中
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
//設置模板引擎，使用express-handlebars，預設布局main
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//設定view engine裡的檔案為handlebars
app.set("view engine", "handlebars");
//設置靜態文件
app.use(express.static("public"));
//設定路由器
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});
//設定搜尋路由，搜尋符合餐廳名字或類別
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});
//設定動態路由，找出相對id的餐廳資訊
app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurant });
});
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
