const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./result.json", "utf8"));

for (let i = 0; i < data.length; i++) {
  const name = data[i].name
    .replace(/\([^\(\)]*\)/, "")
    .replace(/ *\【[^】]*\】 */g, "")
    .replace(/ *\[[^]]*\] */g, "")
    .replace(/ *\「[^」]*\」 */g, "")
    .replace(/ *\＜[^＞]*\＞ */g, "")
    .replace(/ *\（[^）]*\） */g, "")
    .replace(/\[[^\]]*\]$/m, "")
    //余計な文字列削除
    .replace("中古", "")
    .replace("完全", "")
    .replace("新品", "")
    .replace("並行", "")
    .replace("輸入", "")
    .replace("アナログゲーム", "")
    .replace("テーブルゲーム", "")
    .replace("ボドゲ", "")
    .replace("ボードゲーム", "")
    .replace("カードゲーム", "")
    .replace("日本語版", "")
    .replace("送料無料!", "")
    .replace("送料無料！", "")
    .replace("送料無料", "")
    .trim();

  data[i].name = name;
}

fs.writeFile(
  __dirname + "/result-validation.json",
  JSON.stringify(data, null, "    "),
  (e) => {
    console.log(e);
  }
);
