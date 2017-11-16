// actions 其实就是一个具体的业务逻辑，一个业务逻辑可以操作多个state的变化 而mutations 只能一条一条变化
import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_SEQUENCE_LIST, list)
}
