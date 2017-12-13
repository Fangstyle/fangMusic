import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {}, // 歌单
  topList: {},
  searchHistory: loadSearch()
}
export default state
