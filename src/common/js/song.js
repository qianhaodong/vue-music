import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'

export default class Song {
  constructor({id, singer, name, album, duration, image, url}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() { // 歌词处理
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        if (res.code === ERR_OK) {
          this.lyric = res.lrc.lyric
          resolve(this.lyric)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) { // 创建歌手歌曲对象
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt / 1000,
    image: musicData.al.picUrl,
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  })
}

export function createDiscSong(musicData) { // 创建歌单歌曲对象
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.duration / 1000,
    image: musicData.album.picUrl || musicData.album.artist.img1v1Url,
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
