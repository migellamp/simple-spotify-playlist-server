const playlist = [
  {
    id: 1,
    title: "K.",
    artists: ["Cigarettes After Sex"],
    url: "https://spotify.com/track/1111",
    count: 0,
  },
  {
    id: 2,
    title: "Each Time You Fallin in Love.",
    artists: ["Cigarettes After Sex"],
    url: "https://spotify.com/track/2222",
    count: 0,
  },
  {
    id: 3,
    title: "Sweet",
    artists: ["Cigarettes After Sex"],
    url: "https://spotify.com/track/3333",
    count: 0,
  },
];

const createSong = (title, artist, url) => {
  const song = {
    id: playlist.length + 1,
    title,
    artist,
    url,
    count: 0,
  };
  playlist.push(song);
};

module.exports = {
  playlist,
  createSong,
};
