<template>
  <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
          ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
  import { search } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { createDiscSong } from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { mapActions } from 'vuex'
  import NoResult from 'base/no-result/no-result'

  const limit = 30  // 加载数量
  export default {
    data() {
      return {
        offset: 0,  // 偏移数量
        result: [],
        pullup: true,  // 下拉刷新
        hasMore: true,  // 是否加载完标志位
        beforeScroll: true
      }
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      _search() {
        this.offset = 0
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, limit, this.offset * limit).then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.result.songs)
            this.result = this._normalizeSearch(res.result)
            this._checkMore(res.result)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.offset++
        search(this.query, limit, this.offset * limit).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._normalizeSearch(res.result))
            this._checkMore(res.result)
          }
        })
      },
      selectItem(item) {
        this.insertSong(item)
        this.$emit('select')
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      listScroll() {
        this.$emit('listScroll')
      },
      _checkMore(data) { // 上拉刷新结束条件
        if (data.songs && data.songCount) {
          const songs = data.songs
          const songCount = data.songCount
          if (!songs.length || ((this.offset + 1) * limit) >= songCount) {
            this.hasMore = false
          }
        } else if (!data.songCount) {
          this.hasMore = false
        }
      },
      _normalizeSearch(result) {
        let ret = []
        if (result.songs) {
          result.songs.forEach((item) => {
            if (item.id && item.name) {
              ret.push(createDiscSong(item))
            }
          })
        }
        return ret
      },
      getDisplayName(item) {
        return `${item.name}·${item.singer}`
      },
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query() { // 当搜索框字符变化时，触发请求
        this._search()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

