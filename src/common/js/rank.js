export default class Rank {
  constructor({id, name, coverImg, songList}) {
    this.id = id
    this.name = name
    this.coverImg = coverImg
    this.songList = filterRank(songList)
  }
}

function filterRank(songList) { // 处理推荐歌曲
  let ret = []
  if (!songList) return
  songList.forEach((s) => {
    let temp = `${s.first}-${s.second}`
    ret.push(temp)
  })
  return ret
}

export function createRank(song) {
  return new Rank({
    id: song.id,
    name: song.name,
    coverImg: song.coverImgUrl,
    songList: song.tracks
  })
}
