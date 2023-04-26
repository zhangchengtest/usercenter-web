<template>
    <div class="login">
        <form class="login-form">
            <div class="login-input">
                <label for="username">用户名</label>
                <input id="username" type="text" placeholder="请输入用户名" v-model="username" :style="{ minWidth: '300px' }" />
            </div>
            <div class="login-input">
                <label for="password">密码</label>
                <input id="password" type="password" placeholder="请输入密码"   v-model="password" :style="{ minWidth: '300px' }" />
            </div>
            <div class="login-actions">
                <button class="login-action" @click.prevent="forgotPassword()">忘记密码</button>
                <button class="login-action" @click.prevent="register()">注册</button>
            </div>
            <input type="hidden" v-model="redirectUrl" />
            <button class="login-button" @click.prevent="login()">登录</button>
            <div class="error" v-if="error">{{ error }}</div>
        </form>
    </div>
</template>
  
<script>
import { useRoute, useRouter } from 'vue-router'
export default {
    name: "Login",
    data() {
        return {
            redirectUrl: '',
            username: '',
            password: '',
            error: ''
        };
    },
    mounted() {
        this.redirectUrl = this.$route.query.redirectUrl
    },
    methods: {
        forgotPassword() {
            console.log("Clicked 'Forgot Password' button");
        },
        register() {
            console.log("Clicked 'Register' button");
        },
        getRedirectUrl() {
            return new URLSearchParams(window.location.search).get("redirectUrl");
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
    },
};
</script>
  
<style scoped>
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
    border-radius: 10px;
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
    padding: 10px 30px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
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
  