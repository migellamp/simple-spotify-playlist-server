const model = require("../model/index");

const getTitleOnly = (arr) => {
  return arr.map((val) => {
    return val.title.toLowerCase();
  });
};

exports.homePage = (_, res) => {
  res.render("../controller/helpers.ejs");
};

exports.showPlaylist = (req, res) => {
  const checkQuery = Object.keys(req.query);
  if (model.playlist.length === 0) {
    res.status(400).json({
      message: `Playlist masih kosong, tambahkan lagu terlebih dahulu!`,
    });
  }
  if (checkQuery.toString() === "sort") {
    if (Object.values(req.query).toString() === "dsc") {
      model.playlist.sort((a, b) => {
        return b.count - a.count;
      });
    } else if (Object.values(req.query).toString() === "asc") {
      model.playlist.sort((a, b) => {
        return a.count - b.count;
      });
    } else {
      res.status(400).json({
        message: `Query sort salah!`,
      });
    }
    res.status(201).json({
      message: {
        info: "Daftar Playlist - Sort by count",
        playlist: model.playlist,
      },
    });
  } else {
    res.status(201).json({
      message: {
        info: "Daftar Playlist",
        playlist: model.playlist,
      },
    });
  }
};

exports.playSong = (req, res) => {
  checkQuery = Object.keys(req.query);
  if (model.playlist.length === 0) {
    res.status(400).json({
      message: `Playlist masih kosong, tambahkan lagu terlebih dahulu!`,
    });
  }
  if (checkQuery.toString() === "id") {
    const selectedId = req.query.id - 1;
    if (model.playlist[selectedId]?.title === undefined) {
      res.status(400).json({
        message: `Id Lagu tidak ditemukan!`,
      });
    } else {
      model.playlist[selectedId].count++;
      res.status(201).json({
        message: {
          status: `Memutar lagu`,
          ...model.playlist[selectedId],
          count: model.playlist[selectedId].count,
        },
      });
    }
  } else if (checkQuery.toString() === "name") {
    const searchName = req.query.name.toLowerCase();
    const getTitle = getTitleOnly(model.playlist);
    if (getTitle.indexOf(searchName) === -1) {
      res.status(400).json({
        message: `Judul Lagu tidak ditemukan!`,
      });
    } else {
      model.playlist[getTitle.indexOf(searchName)].count++;
      res.status(201).json({
        message: {
          status: `Memutar lagu`,
          ...model.playlist[getTitle.indexOf(searchName)],
          count: model.playlist[getTitle.indexOf(searchName)].count,
        },
      });
    }
  } else {
    res.status(400).json({
      message: `Query pencarian salah!`,
    });
  }
};

exports.addSong = (req, res) => {
  const song = req.body.title;
  const { title, artist, url } = req.body;
  const getTitle = getTitleOnly(model.playlist);
  if (getTitle.indexOf(song?.toLowerCase()) != -1) {
    res.status(400).json({
      message: `Lagu ${song} sudah berada dalam playlist, masukkan lagu lainnya!!`,
    });
  } else {
    model.createSong(title, artist, url);
    res.status(201).json({
      message: `Berhasil memasukkan lagu ${song} ke dalam playlist!!`,
    });
  }
};
