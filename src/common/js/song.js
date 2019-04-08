export default class Song {
  constructor({id, singer, name, album, image, url}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    image: musicData.al.picUrl,
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  })
}

function filterSinger(singer) { // 处理歌手
  let ret = []
  if (!singer) return
  singer.forEach((s) => {
    ret.push(s.name)
  })

  return ret.join('/')
}
