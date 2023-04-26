<template>
  <div>
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab === 'password' }" @click="activeTab = 'password'">密码登录</div>
      <div class="tab" :class="{ active: activeTab === 'code' }" @click="activeTab = 'code'">验证码登录</div>
    </div>
    <div class="login" v-show="activeTab === 'password'">
      <form class="login-form">
        <div class="login-input">
          <label for="username">用户名</label>
          <input id="username" type="text" placeholder="请输入用户名" v-model="username" :style="{ minWidth: '300px' }" />
        </div>
        <div class="login-input">
          <label for="password">密码</label>
          <input id="password" type="password" placeholder="请输入密码" v-model="password" :style="{ minWidth: '300px' }" />
        </div>
     
        <button class="login-button" @click.prevent="login()">登录</button>
        <div class="error" v-if="error">{{ error }}</div>
      </form>

    </div>
    <div class="login" v-show="activeTab === 'code'">
      <form class="login-form">
        <div class="login-input">
          <label for="mobile">手机号</label>
          <input id="mobile" type="text" placeholder="手机号" v-model="mobile" :style="{ minWidth: '300px' }" />
        </div>
        <div class="login-input">
          <label for="smsCaptcha">验证码</label>
          <input id="smsCaptcha" type="text" placeholder="请输入验证码" v-model="smsCaptcha" :style="{ minWidth: '300px' }" />
          <div class="btn btn-secondary" @click="sendCode" :class="{ disabled: !canSendCode }">{{ sendBtnText }}</div>
        </div>
      
        <button class="login-button" @click.prevent="loginPhone()">登录</button>
        <div class="error" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      activeTab: 'code',
      sendBtnText: '发送验证码',
      canSendCode: true,
      redirectUrl: '',
      username: '',
      password: '',
      mobile: '',
      smsCaptcha: '',
      error: ''
    }
  },
  mounted() {
        if(this.$route.query.redirectUrl){
          this.redirectUrl = this.$route.query.redirectUrl
        }else{
          this.redirectUrl = 'https://chengapi.yufu.pub/callback'
        }
       
    },
  methods: {
   
    sendCode() {
      // 如果不能发送验证码，直接返回
      if (!this.canSendCode) {
        return;
      }
      if (!this.mobile) {
                this.error = '手机号不能为空';
                return;
            }
      // TODO: 发送验证码的逻辑
      fetch('https://api.punengshuo.com/api/auth/sendSms', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ account: this.mobile})
                });

      // 开始倒计时
      this.countdown = 60;
      const intervalId = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(intervalId);
          this.sendBtnText = '发送验证码';
          this.canSendCode = true;
        } else {
          this.sendBtnText = `${this.countdown} 秒后重发`;
        }
      }, 1000);

      // 禁用发送按钮
      this.sendBtnText = `${this.countdown} 秒后重发`;
      this.canSendCode = false;
    },
    async login() {
            this.error = '';
            if (!this.username || !this.password) {
                this.error = '用户名或密码不能为空';
                return;
            }
            try {
                // 发送登录请求
                const res = await fetch('https://api.punengshuo.com/api/auth/loginThird', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ account: this.username, pwd: this.password, redirectUrl: this.redirectUrl })
                });
                if (!res.ok) {
                    this.error = '登录失败，请检查用户名和密码是否正确';
                    return;
                }
                // 登录成功，跳转到首页
                // 这里可以自定义跳转逻辑
                const result = await res.json()
                console.log(result)
                localStorage.setItem('usercenter-token', result.data.accessToken)
                if(result.data.redirectUrl && result.data.redirectUrl != ''){
                    window.location = result.data.redirectUrl
                }
               
            } catch (e) {
                console.log(e)
                this.error = '服务器错误，请稍后再试';
            }
        },
        async loginPhone() {
            this.error = '';
            if (!this.mobile || !this.smsCaptcha) {
                this.error = '手机号或验证码不能为空';
                return;
            }
            try {
                // 发送登录请求
                const res = await fetch('https://api.punengshuo.com/api/auth/loginPhone', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ account: this.mobile, smsCaptcha: this.smsCaptcha, redirectUrl: this.redirectUrl })
                });
                if (!res.ok) {
                    this.error = '登录失败，请检查手机号或验证码是否正确';
                    return;
                }
                // 登录成功，跳转到首页
                // 这里可以自定义跳转逻辑
                const result = await res.json()
                console.log(result)
                localStorage.setItem('usercenter-token', result.data.accessToken)
                if(result.data.redirectUrl && result.data.redirectUrl != ''){
                    window.location = result.data.redirectUrl
                }
               
            } catch (e) {
                console.log(e)
                this.error = '服务器错误，请稍后再试';
            }
        },
  }
}
</script>
  
<style>
.tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

}

.tab.active {
  background-color: #fff;
  border-bottom: 2px solid #007bff;
}

.login {
  display: none;
}

.login.active {
  display: block;
}


.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
}

.login-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
}

.login-input label {
  font-size: 14px;
  font-weight: bold;
}

.login-input input {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  padding: 5px;
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.login-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
}

.login-action {
  font-size: 12px;
  color: #007bff;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.login-action:hover {
  text-decoration: underline;
}

.login-button {
  margin-top: 20px;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btn-secondary {
  color: #333;
  position: relative;
  margin-top: -30px;
  margin-left: 220px;
  font-size: 16px;
  cursor: pointer;
}

.btn-secondary.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 576px) {
  .login-form {
    width: 100%;
  }

  .login-input input,
  .login-button {
    width: calc(100% - 20px);
    min-width: initial;
  }
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
  