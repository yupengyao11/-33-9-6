<!--  -->
<template>
  <div class="">
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="backFn"
      />
    </form>
    <!-- <SearchHistory />
    <SearchResult />
    <SearchSuggestion /> -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords=";[(keywords = $event), (isShowSearchResult = true)]"
    ></component>
  </div>
</template>

<script>
// 导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import SearchHistory from './componnents/SearchHistory.vue'
import SearchResult from './componnents/SearchResult.vue'
import SearchSuggestion from './componnents/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name: '',
  components: { SearchHistory, SearchResult, SearchSuggestion },
  props: {},
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    },
    backFn() {
      console.log(111)
      this.$router.push('/')
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="less">
.search {
  [role='button'] {
    color: aliceblue;
  }
}
</style>
