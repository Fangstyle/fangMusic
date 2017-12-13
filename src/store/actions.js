// actions 其实就是一个具体的业务逻辑，一个业务逻辑可以操作多个state的变化 而mutations 只能一条一条变化
import * as types from './mutation-types'
import {shuffle} from 'common/js/util'
import {playMode} from 'common/js/config'
import {saveSearch} from 'common/js/cache'
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  console.log('mode', state.mode)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    console.log('ramdon', 1111)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    console.log('ramdon', 2222)
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_SEQUENCE_LIST, list)
}

export const randomPlay = function ({commit, state}, {list}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_MODE, playMode.random)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playList[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  console.log('songid', song.id)
  let fpIndex = findIndex(playList, song)
  console.log('fpIndex', fpIndex)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playList.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      // 因为插入的位置在 重复的歌曲前面所以 相当于后面的歌曲index全部加1 fpIndex 也就+1
      playList.splice(fpIndex + 1, 1)
    }
  }
  let currentSIndex = findIndex(sequenceList, currentSong)
  let fsIndex = findIndex(sequenceList, song)
  currentSIndex++
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  console.log('playList', playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
