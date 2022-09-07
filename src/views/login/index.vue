<template>
  <div class="">
    <!-- 头部导航 -->
    <van-nav-bar title="登陆" class="nav-bar" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label> <span class="toutiao toutiao-shouji"></span></template
      ></van-field>
      <van-field
        v-model="code"
        type="code"
        name="密码"
        placeholder="请输入验证码"
        :rules="pwdRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span
        ></template>
        <template #button>
          <van-button
            class="btn"
            size="small"
            type="default"
            round
            v-if="isShow"
            @click="sendCode"
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="1000 * 10"
            format="ss秒"
            @finish="isShow = true"
          ></van-count-down>
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 头部导航 -->
  </div>
</template>

<script>
// 导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { mobileRules, pwdRules } from './rule'
import { Login, sendCodeApi } from '@/api'
import { mapMutations } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      pwdRules,
      isShow: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['SET_TOKEN']),
    Loading() {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.Loading()
      try {
        const { data } = await Login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.Loading()
      try {
        await sendCodeApi(this.mobile)
        this.isShow = false
        this.$toast.success('成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 400)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
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
// .nav-bar {
//   background-color: #3395fc;
//   /deep/ .van-nav-bar__title { 老版本样式穿透写法
//     color: aliceblue;
//   }
// }
.nav-bar {
  background-color: #3395fc;
  :deep(.van-nav-bar__title) {
    color: aliceblue;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  background-color: #eee;
  color: #a58594;
  height: 0.64rem;
}
</style>
