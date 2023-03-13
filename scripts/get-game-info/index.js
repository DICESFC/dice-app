//atlasのidなどを含むcsvからボードゲーム情報を取得するやつです

const axios = require("axios");
const fs = require("fs");
const csv = require("csv");

require("dotenv").config();

const clientID = process.env.CLIENT_ID;

fs.createReadStream(__dirname + "/data.csv").pipe(
  csv.parse(async (err, data) => {
    const cols = data.shift();
    const codeCol = cols.findIndex((c) => c === "code");
    const nameCol = cols.findIndex((c) => c === "name");
    const atlasCol = cols.findIndex((c) => c === "atlas_url");

    const atlasIDs = data.map((row) => {
      return row[atlasCol].split("/")[4];
    });

    const result = [];

    for (let i = 0; i < atlasIDs.length; i++) {
      try {
        const atlasID = atlasIDs[i];
        const targetRow = data[i];

        if (atlasID) {
          const url = `https://api.boardgameatlas.com/api/search?ids=${atlasID}&client_id=${clientID}`;
          const res = await axios.get(url);
          const game = res.data.games[0];

          console.log(game.name);
          result.push({
            name: targetRow[nameCol],
            code: targetRow[codeCol],
            englishName: game.name,
            thumbnail: game.image_url,
            minPlayers: game.min_players,
            maxPlayers: game.max_players,
            minPlayTime: game.min_playtime,
            maxPlayTime: game.max_playtime,
            rating: game.average_user_rating,
            ratingCount: game.num_user_ratings,
            isExpansion: game.type === "expansion",
          });
        } else {
          console.log("No data:", targetRow[nameCol]);
          result.push({
            name: targetRow[nameCol],
            code: targetRow[codeCol],
          });
        }
      } catch (e) {
        console.log("Error:", targetRow[nameCol]);
        result.push({
          name: targetRow[nameCol],
          code: targetRow[codeCol],
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2100));
    }

    fs.writeFile(
      __dirname + "/result.json",
      JSON.stringify(result, null, "    "),
      (e) => {
        console.log(e);
      }
    );
  })
);
