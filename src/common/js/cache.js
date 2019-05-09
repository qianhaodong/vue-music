import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) { // 如果有该数据，则删除数组中的该值
    arr.splice(index, 1)
  }
  arr.unshift(val) // 向数组开头插入一条数据
  if (maxLen && arr.length > maxLen) {
    arr.pop() // 删除数组最后一个数据
  }
}

function deleteArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存搜索历史
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])

  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)

  storage.set(SEARCH_KEY, searches)
  return searches
}

// 获取本地存储的数据
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除一条搜索历史
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])

  deleteArray(searches, (item) => {
    return item === query
  })

  storage.set(SEARCH_KEY, searches)
  return searches
}

// 删除全部搜索历史
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 保存播放历史
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])

  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)

  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 保存收藏歌曲
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])

  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LENGTH)

  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])

  deleteArray(songs, (item) => {
    return item.id === song.id
  })

  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
