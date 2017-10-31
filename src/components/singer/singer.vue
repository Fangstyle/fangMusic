<template>
  <div class="singer" ref="singer">
    <listview :data="singerList" ref="list"></listview>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default{
    created() {
      this._getSingerList()
    },
    data() {
      return {
        singerList: []
      }
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          this.singerList = this._normalizeSinger(res.data.list)
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))
        })
        let hot = []
        let ret = []
        console.log(map)
        for (let key in map) {
          let item = map[key]
          if (item.title.match(/[a-zA-Z]/)) {
            ret.push(item)
          }
          if (item.title === HOT_NAME) {
            hot.push(item)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components: {
      Listview
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
