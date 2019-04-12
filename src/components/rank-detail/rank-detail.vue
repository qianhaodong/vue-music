<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
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
        songs: [],
        rank: true
      }
    },
    computed: {
      title() {
        return this.rankList.name
      },
      bgImage() {
        /* if (this.songs.length) { // 获取第一个歌曲的图片做背景
          return this.songs[0].image
        }
        return '' */

        return this.rankList.coverImg
      },
      ...mapGetters([
        'rankList'
      ])
    },
    created() {
      this._getRankDetail()
    },
    methods: {
      _getRankDetail() {
        if (!this.rankList.id) {
          this.$router.push('/rank')
          return
        }
        getDiscDetail(this.rankList.id).then((res) => {
          if (res.code === ERR_OK) {
            // console.dir(res.result.tracks)
            this.songs = this._normalizeRankDetail(res.result.tracks)
            // console.dir(this.songs)
          }
        })
      },
      _normalizeRankDetail(list) {
        let ret = []
        list.forEach((item) => {
          if (item.id && item.name) {
            ret.push(createDiscSong(item))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>


