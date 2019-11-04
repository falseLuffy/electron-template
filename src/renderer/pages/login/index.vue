<template>
  <div class="login-container" :style="{'backgroundImage': 'url(' + loginBg + ')'}">
    <div class="login-head">
      <img :src="YuanHui">
      <span>示例项目</span>
    </div>
    <div class="login-title">白玉苍狗</div>
    <div class="login-form-container">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
               label-width="0px">
        <el-form-item prop="username">
          <el-autocomplete name="username" class="user_name"
                           :trigger-on-focus="false"
                           v-model="loginForm.username"  :fetch-suggestions="querySearch"
            placeholder="用户名"></el-autocomplete>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="isRemember">
          <el-checkbox v-model="isRemember" @change="rememberChange">记住用户名</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!loginEd" class="p1 loginIn-btn" type="primary" :loading="loading"
                     @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">
      <span>系统状态</span>
      <span @click="showPhone">联系我们</span>
      <span><a href="http://www.future-data.cn" target="_blank">关于我们</a></span>
      <span>Copyright © 2015-2020</span>
    </div>
  </div>
</template>

<script>
  import bg14 from './img/login_bg_14.png'
  import yuanHui from './img/yuanhui.png'
  import Cookies from 'js-cookie'

  import {login} from '@/Api/api'
  import axios from 'axios'
  export default {
    name: 'newlogin',
    data () {
      return {
        loginBg: bg14,
        YuanHui: yuanHui,
        loading: false,
        loginEd: false,
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{ required: true, message: '请输入用户名' }],
          password: [{ required: true, message: '请输入密码' }]
        },
        isRemember: false,
        loginNameList: []
      }
    },
    mounted () {
      const cookieNames = Cookies.get('LoginNameList')
      const rememberFlag = Cookies.get('RememberName')
      if (cookieNames) {
        this.loginNameList = JSON.parse(Cookies.get('LoginNameList'))
      }
      if (rememberFlag && rememberFlag === 'true') {
        this.isRemember = true
      }
    },
    methods: {
      rememberChange (val) {
        Cookies.set('RememberName', val)
        if (!val) {
          Cookies.set('LoginNameList', null)
          this.loginNameList = []
        }
      },
      querySearch (queryString, callback) {
        if (this.loginNameList === null || this.loginNameList.length === 0) {
          let data = []
          return callback(data)
        }
        const results = queryString ? this.loginNameList.filter(x => x.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0) : this.loginNameList
        callback(results)
      },
      rememberNewName (name) {
        if (this.loginNameList === null || this.loginNameList.length === 0) {
          this.loginNameList = [{ value: name }]
        } else {
          const matchName = this.loginNameList.filter(x => x.value.toLowerCase() === name.toLowerCase())
          if (matchName === null || matchName.length === 0) {
            this.loginNameList.push({ value: name })
          }
        }
        Cookies.set('LoginNameList', JSON.stringify(this.loginNameList))
      },
      showPhone () {
        this.$alert('运维人员：186 6689 9008', '标题名称', {
          confirmButtonText: '确定'
        })
      },
      handleLogin () {
        if (this.isRemember) {
          this.rememberNewName(this.loginForm.username)
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            const params = {
              loginName: this.loginForm.username,
              password: this.loginForm.password
            }
            login(params)
              .then((data) => {
                Cookies.set('systemKey', data.data.token)
                axios.defaults.headers.Authorization = data.data.token
                this.$router.push({ path: '/dataVisual' })
              })
              .catch(() => {
                this.$message({
                  type: 'warning',
                  message: '登录失败'
                })
              })
              .then(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-size: cover;

    input.el-input__inner {
      background-color: #053058;
      border-color: transparent;
      color: #fff;
      &:hover {
        border-color: #0091ff;
      }
    }
    .el-form-item.is-error .el-input__inner {
      border-color: #0091ff !important;
    }
    /*div.el-autocomplete-suggestion li {*/
      /*&:hover {*/
        /*background-color: #0091ff !important;*/
      /*}*/
    /*}*/
    span.el-checkbox__inner {
      border-color: #0091ff;
      background-color: transparent;
      color: #fff;
    }
    span.el-checkbox__label {
      color: #fff;
    }

    .login-head {
      position: absolute;
      padding-left: 4%;
      box-sizing: border-box;
      top: 5%;
      width: 100%;
      font-family: "Baidu";
      text-align: left;
      img {
        width: 80px;
      }
      span {
        display: inline-block;
        margin-left: 20px;
        font-size: 36px;
        vertical-align: middle;
        color: #E4F7FF;
      }
    }
    .login-title {
      position: absolute;
      width: 100%;
      top: 22%;
      font-family: "Baidu";
      font-size: 56px;
      text-align: center;
      color: #E4F7FF;
    }
    .login-form-container {
      position: absolute;
      top: 34%;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 40px 50px 20px;
      width: 24%;
      max-width: 450px;
      background-color: rgba(14, 81, 133, 0.84);
      box-shadow: 0px 2px 30px 0px
      rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      .user_name {
        width: 100%;
      }
      .loginIn-btn {
        width: 100%;
        background-color: #1890ff;
        border-radius: 3px;
      }
    }
    .login-footer {
      position: absolute;
      bottom: 5%;
      width: 100%;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: #fff;

      a {
        color: #fff;
        &:hover {
          color: #337ab7;
        }
      }
      span {
        cursor: pointer;
        &:hover {
          color: #337ab7;
        }
      }
    }
  }

  @media screen and (max-width:1680px){
    .login-container {
      .login-head {
        font-family: "Baidu";
        img {
          width: 60px;
        }
        span {
          font-size: 26px;
        }
      }
      .login-title {
        font-size: 41px;
      }
    }
  }
  @media screen and (min-width: 1680px) {
    .login-container {
      input.el-input__inner, button.loginIn-btn {
        height: 40px;
      }
      button.loginIn-btn {
        font-size: 18px;
      }
      .login-form-container {
        padding: 50px 60px 30px;
        .el-form-item {
          margin-bottom: 28px;
        }
      }
    }
  }
</style>
