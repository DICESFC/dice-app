//バーコード番号のcsvから商品情報を取得するやつです。YahooのAPIを使用。
//大分きたないけど許して

const axios = require("axios");
const fs = require("fs");
const csv = require("csv");

require("dotenv").config();

const clientID = process.env.CLIENT_ID;

fs.createReadStream(__dirname + "/data.csv").pipe(
  csv.parse(async (err, data) => {
    const cols = data.shift();
    const codeCol = cols.findIndex((c) => c === "CODE");
    const nameCol = cols.findIndex((c) => c === "TITLE");
    const codes = data.map((row) => row[codeCol]);

    const result = [];

    for (let i = 0; i < codes.length; i++) {
      const code = codes[i];

      try {
        productInfo = {};

        const url = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${clientID}&jan_code=${code}`;

        const res = await axios.get(url);
        const hits = res.data.hits;

        //一番名前が短いプロダクトを検索
        let shortestNameProduct = {};
        let minNameLength = Infinity;
        for (const hit of hits) {
          if (hit.name.length < minNameLength) {
            minNameLength = hit.name.length;
            shortestNameProduct = hit;
          }
        }

        const productName = shortestNameProduct.name
          ? shortestNameProduct.name
              //かっこ文字列削除
              //正規表現かけない。。。
              .replace(/\([^\(\)]*\)/, "")
              .replace(/ *\【[^】]*\】 */g, "")
              .replace(/ *\「[^」]*\」 */g, "")
              .replace(/ *\＜[^＞]*\＞ */g, "")
              .replace(/ *\（[^）]*\） */g, "")
              //余計な文字列削除
              .replace("ボードゲーム", "")
              .replace("日本語版", "")
              .replace("送料無料!", "")
              .replace("送料無料！", "")
              .replace("送料無料", "")
              .trim()
          : cols[i][nameCol];

        const resultObj = { code, name: productName };
        console.log(resultObj);

        result.push(resultObj);

        //2秒待つ
      } catch (e) {
        console.log("error:", code);
        result.push({ code, name: data[i][nameCol] });
      }

      console.log(result);
      await new Promise((resolve) => setTimeout(resolve, 2100));
    }

    fs.writeFile(
      __dirname + "/result.json",
      JSON.stringify(result, null, "    "),
      (e) => {
        console.log(e);
      }
    );

    console.log("info-getter done");
  })
);
