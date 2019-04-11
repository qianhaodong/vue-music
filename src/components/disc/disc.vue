<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  import { getDiscDetail } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { createDiscSong } from 'common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDiscDetail()
    },
    computed: {
      title() {
        return this.disc.name
      },
      bgImage() {
        return this.disc.picUrl
      },
      ...mapGetters([
        'disc'
      ])
    },
    methods: {
      _getDiscDetail() {
        if (!this.disc.id) { // 当前页面刷新，回到上一级页面
          this.$router.push('/recommend')
          return
        }
        getDiscDetail(this.disc.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.result.tracks)
            // console.dir(this.songs)
          }
        })
      },
      _normalizeSongs(list) { // 处理数据
        let ret = []
        list.forEach((item) => {
          if (item.id && item.name) { // 判断歌曲存在
            ret.push(createDiscSong(item))
          }
        })
        return ret
      },
    },
    components: {
      MusicList
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
