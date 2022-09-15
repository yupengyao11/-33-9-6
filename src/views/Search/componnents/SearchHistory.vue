<!--  -->
<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon
          name="delete-o"
          v-if="!isEdit"
          @click="isEdit = true"
        ></van-icon>
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除 </span>
          <span @click="isEdit = false"> 完成</span>
        </div>
      </template>
    </van-cell>

    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEdit"
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((i) => item !== i)
            )
          "
        ></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data() {
    return {
      isEdit: false
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(['histories'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
<style scoped lang="less"></style>
