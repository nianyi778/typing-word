<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import Logo from "@/components/Logo.vue";
import Input from "@/components/Input.vue";
import BaseButton from "@/components/BaseButton.vue";


const username = ref("");
const password = ref("");
const error = ref("");
const userStore = useUserStore();

function handleLogin() {
  error.value = "";
  if (!username.value || !password.value) {
    error.value = "请输入用户名和密码";
    return;
  }
  // store 标记
  const found = userStore.login({ username: username.value, password: password.value });
  if (!found) {
    error.value = "用户名或密码错误";
    return;
  }

  // 登录成功逻辑
  window.location.href = "/";
}
</script>

<template>
  <div class="login-page">
    <Logo />
    <div class="login-panel">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin" style="width:100%">
        <Input v-model="username" placeholder="用户名" @keyup.enter="handleLogin" />
        <Input v-model="password" placeholder="密码" type="password" style="margin-top: 16px;" @keyup.enter="handleLogin" />
        <div v-if="error" class="error">{{ error }}</div>
        <div class="login-button">
          <BaseButton
            @click="handleLogin"
            :disabled="!username || !password"
          >
            登录
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/css/style.scss";

.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: -80px;
    top: -80px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #6366f1 0%, transparent 70%);
    opacity: 0.15;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    right: -100px;
    bottom: -100px;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
    opacity: 0.12;
    z-index: 0;
  }

  .logo {
    position: static;
    margin-bottom: 32px;
    z-index: 1;
  }

  .login-panel {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.10);
    padding: 40px 32px 32px 32px;
    min-width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    border: 1px solid #e0e7ef;
    backdrop-filter: blur(2px);

    h2 {
      margin-bottom: 28px;
      font-size: 26px;
      color: #334155;
      font-weight: 700;
      letter-spacing: 2px;
      text-shadow: 0 2px 8px rgba(99,102,241,0.08);
    }

    .error {
      color: #ef4444;
      margin-top: 12px;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 1px;
    }
    .login-button{
      margin-top: 24px;
    }
  }
}
</style>