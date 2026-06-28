<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 登录表单数据
const formData = ref({
  username: '',
  password: '',
  rememberMe: false
})

// 表单验证
const errors = ref({
  username: '',
  password: ''
})

// 验证表单
const validateForm = (): boolean => {
  errors.value = { username: '', password: '' }
  let isValid = true

  if (!formData.value.username.trim()) {
    errors.value.username = '请输入用户名'
    isValid = false
  }

  if (!formData.value.password) {
    errors.value.password = '请输入密码'
    isValid = false
  } else if (formData.value.password.length < 6) {
    errors.value.password = '密码长度不能少于6位'
    isValid = false
  }

  return isValid
}

// 登录提交
const handleLogin = () => {
  if (!validateForm()) return
  
  alert('登录成功！')
  router.push('/home')
}

// 切换密码可见性
const showPassword = ref(false)

// 模拟注册链接
const goToRegister = () => {
  alert('注册功能开发中')
}

// 模拟忘记密码
const goToForgotPassword = () => {
  alert('找回密码功能开发中')
}
</script>

<template>
  <div class="login-page">
    <!-- 左侧装饰区域 -->
    <div class="login-hero">
      <div class="hero-content">
        <div class="logo-section">
          <div class="logo-icon">橙</div>
          <span class="logo-text">校园集市</span>
        </div>
        <h1 class="hero-title">欢迎来到校园集市</h1>
        <p class="hero-desc">一个安全、便捷的校园二手交易平台</p>
      </div>
      <div class="hero-decoration">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>

    <!-- 右侧登录表单 -->
    <div class="login-form-wrapper">
      <div class="login-form">
        <h2 class="form-title">登录</h2>
        
        <!-- 用户名输入 -->
        <div class="form-group">
          <label class="form-label">用户名</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input
              v-model="formData.username"
              type="text"
              class="form-input"
              placeholder="请输入用户名"
              :class="{ error: errors.username }"
            />
          </div>
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
          <label class="form-label">密码</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="请输入密码"
              :class="{ error: errors.password }"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁️' : '🙈' }}
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <!-- 记住我和忘记密码 -->
        <div class="form-options">
          <label class="remember-checkbox">
            <input v-model="formData.rememberMe" type="checkbox" />
            <span>记住我</span>
          </label>
          <button type="button" class="forgot-link" @click="goToForgotPassword">
            忘记密码？
          </button>
        </div>

        <!-- 登录按钮 -->
        <button class="login-btn" @click="handleLogin">
          登 录
        </button>

        <!-- 注册链接 -->
        <div class="register-section">
          <span>还没有账号？</span>
          <button type="button" class="register-link" @click="goToRegister">
            立即注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 登录页面整体布局 */
.login-page {
  display: flex;
  min-height: 100vh;
}

/* 左侧英雄区域 */
.login-hero {
  flex: 1;
  background: linear-gradient(135deg, var(--primary-orange) 0%, var(--dark-orange) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 40px;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
}

.logo-icon {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 28px;
}

.logo-text {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 2px;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-desc {
  font-size: 16px;
  opacity: 0.9;
}

/* 装饰圆形 */
.hero-decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: -50px;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 50px;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 10%;
  right: -20px;
}

/* 右侧表单区域 */
.login-form-wrapper {
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
}

.login-form {
  width: 100%;
}

.form-title {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 32px;
  font-weight: 600;
}

/* 表单组 */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 0 14px;
  transition: border-color 0.2s;
}

.input-wrapper:focus-within {
  border-color: var(--primary-orange);
}

.input-icon {
  font-size: 16px;
  margin-right: 10px;
}

.form-input {
  flex: 1;
  padding: 12px 0;
  border: none;
  font-size: 14px;
  outline: none;
}

.form-input::placeholder {
  color: #999;
}

.form-input.error {
  color: #f5222d;
}

.toggle-password {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
}

.error-message {
  display: block;
  font-size: 12px;
  color: #f5222d;
  margin-top: 6px;
}

/* 表单选项 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.remember-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.remember-checkbox input {
  width: 16px;
  height: 16px;
  accent-color: var(--primary-orange);
}

.forgot-link {
  background: none;
  border: none;
  font-size: 14px;
  color: var(--primary-orange);
  cursor: pointer;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  background: var(--primary-orange);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 20px;
}

.login-btn:hover {
  background: var(--dark-orange);
}

/* 注册区域 */
.register-section {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.register-link {
  background: none;
  border: none;
  color: var(--primary-orange);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 4px;
}

.register-link:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }
  
  .login-hero {
    padding: 40px 20px;
    min-height: 300px;
  }
  
  .hero-title {
    font-size: 24px;
  }
  
  .login-form-wrapper {
    width: 100%;
    padding: 32px 24px;
  }
}
</style>
