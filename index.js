const express = require("express");
const controllers = require("./controller/index");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", controllers.homePage);
app.get("/playlist", controllers.showPlaylist);
app.get("/playlist/song", controllers.playSong);
app.post("/playlist", controllers.addSong);

app.listen(port);
