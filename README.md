# 我的餐廳清單

一個餐廳清單專案，提供瀏覽及搜尋餐廳詳細資訊，如：餐廳類別、餐廳地址、餐廳電話等

## 功能說明

提供個人帳密註冊、登入，並支援使用Facebook登入
可以管理個人所有餐廳, 並有排序功能
可搜尋餐廳名稱
點選各餐廳卡片，可瀏覽餐廳詳細資料
可以新增餐廳
可以修改餐廳資料
可以刪除餐廳


## 安裝與執行

```
> git clone https://github.com/WeiChun1/restaurant-list.git
```

3. 安裝套件

```
> cd restaurant-list
> npm install
```

4. 設定環境變數: 在專案資料夾下的.env.example檔案名稱修改為.env，並填入你的MongoDB連線字串及FACEBOOK應用程式資料
```
MONGODB_URI = "<你的連線字串>"
FACEBOOK_ID = "<Facebook應用程式編號>"
FACEBOOK_SECRET = "<Facebook應用程式密鑰>"

```

5. 設定種子資料: 在終端機執行底下指令，匯入種子資料到資料庫裡
```
> npm run seed

```

6. 執行程式

```
> npm run start
```


## 開發環境與套件

*  bcryptjs: 2.4.3,
*  body-parser": 1.20.2
*  connect-flash": "^0.1.1
*  express": 4.17.1
*  express-handlebars": 4.0.2
*  express-session": 1.17.1
*  method-override": 3.0.0
*  mongoose: 5.9.7
*  passport: 0.4.1
*  passport-facebook": 3.0.0
*  passport-local": 1.0.0

