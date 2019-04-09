import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

function findIndex(list, song) { // 获取当前歌曲在随机播放列表里面的索引
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 定义动作 -- 顺序播放
export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)

  // 播放模式判定
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 随机播放
export const randomPlay = function({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
