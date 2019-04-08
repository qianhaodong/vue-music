<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import { mapMutations } from 'vuex'
  import PinYin from 'js-pinyin'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.list.artists)
          }
        })
      },
      _normalizeSinger(list) { // 格式化歌手列表
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.id,
              name: item.name,
              picUrl: item.picUrl
            }))
          }
          // 处理歌手名字所在区域
          PinYin.setOptions({checkPolyphone: false, charCase: 0});
          const key = PinYin.getFullChars(item.name).substr(0, 1)
          // console.log(key)
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }

          map[key].items.push(new Singer({
            id: item.id,
            name: item.name,
            picUrl: item.picUrl
          }))
        })
        // 为了得到有序列表，需要处理 map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) { // match方法 -- 检索给定的字符串，如果没有找到任何匹配的文本， match() 将返回 null
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => { // 升序处理
        // charCodeAt()方法 -- 可返回指定位置的字符的 Unicode 编码，0为第一个字符，1为第二个，以此类推
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // console.log(hot.concat(ret))
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
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