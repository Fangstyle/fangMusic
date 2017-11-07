<template>
  <transition name="slide">
    <div class="singer-detail">
      详情页
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {createSong} from 'common/js/song'
  import {ERR_OK} from 'api/config'

  export default {
    created() {
      console.log('vuex-singer', this.singer)
      this._getSingerDetail()
    },
    data() {
      return {
        songList: []
      }
    },
    methods: {
      _getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songList = this._normalizeSongs(res.data.list)
            console.log(this.songList)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    computed: {
      ...mapGetters(['singer']
      )
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail
    position fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: $color-background
    z-index: 200

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
