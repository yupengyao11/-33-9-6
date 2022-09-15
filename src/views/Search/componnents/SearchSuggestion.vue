<!--  -->
<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in gaoliangsuggestion"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestion[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

import { getSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestion: []
    }
  },
  // 监听属性 类似于data概念
  computed: {
    gaoliangsuggestion() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestion.map((str) => {
        return str.replace(
          reg,
          (mach) => `<span style="color:red">${mach}</span>`
        )
      })
    }
  },
  // 监控data中的数据变化
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  // 方法集合
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        //   this.suggestion = data.data.options.filter((item) => Boolean(item))
        this.suggestion = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getSuggestions()
  },
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
<style scoped lang="less"></style>
