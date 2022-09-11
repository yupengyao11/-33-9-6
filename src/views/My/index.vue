<!--  -->
<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登陆状态结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row> </van-row>
        <van-row>
          <van-col span="1"></van-col>
          <van-col span="13">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                width="1.75rem"
                height="1.75rem"
                round
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="5"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
              ><van-button type="default" size="mini" round class="edit-btn"
                >编辑按钮
              </van-button></van-row
            >
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>0</template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>0</template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon>0</template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon>0</template></van-grid-item
            >
          </van-grid>
        </van-row>
      </div>
      <!-- 没有登陆状态结构 -->
      <div class="logout banner" v-else @click="loginFn">
        <van-image
          width="1.75rem"
          height="1.75rem"
          :src="require('../../assets/images/mobile.png')"
        />
        <span>登陆/注册</span>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="搜藏"
          ><template #icon>
            <span class="toutiao toutiao-shoucang"></span></template
        ></van-grid-item>
        <van-grid-item text="历史"
          ><template #icon>
            <span class="toutiao toutiao-lishi"></span></template
        ></van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-links value=">" />
        <van-cell title="小智同学" is-links value=">" />
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <van-button style="color: red" block v-if="isLogin" @click="btnFn">
        退出
      </van-button>
    </footer>
  </div>
</template>

<script>
// 导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { mapGetters } from 'vuex'
import { getUserInfoApi } from '@/api'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['isLogin'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    btnFn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否退出账号'
        })
        .then(() => {
          this.$store.commit('SET_TOKEN', {})
        })
    },
    loginFn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否前往登陆'
        })
        .then(() => {
          this.$router.push('/login')
        })
    },
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoApi()
        this.userInfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败请重新登陆')
        } else {
          throw error
        }
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUserInfo()
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
<style scoped lang="less">
.my {
  height: 100vh;
  background-color: #f6f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 20px;
    font-size: 35px;
    color: aliceblue;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: aliceblue;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.43rem;
    color: #666;
  }
  :deep(.grid) {
    color: aliceblue;
    font-size: 30px;
    .van-grid-item__content {
      background-color: inherit;
    }
    .van-grid-item__text {
      color: aliceblue;
    }
  }
}
</style>
