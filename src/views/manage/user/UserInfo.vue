<script setup>
import { ref } from "vue";
import { userInfoUpdateService } from "@/api/user.js";
import { userAvatarUpdateService } from '@/api/user.js'
import { ElMessage } from "element-plus";
import { Plus, Upload, Picture } from "@element-plus/icons-vue";
import { useTokenStore } from "@/stores/token.js";
import useUserInfoStore from "@/stores/userInfo.js";
import avatar from "@/assets/default.png";

const tokenStore = useTokenStore();
const userInfoStore = useUserInfoStore();
const userInfo = ref({ ...userInfoStore.info });
const imgUrl = ref(userInfoStore.info.userPic); //用户头像地址

const rules = {
  nickname: [
    { required: true, message: "请输入用户昵称", trigger: "blur" },
    {
      pattern: /^\S{2,10}$/,
      message: "昵称必须是2-10位的非空字符串",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请输入用户邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
};

// 修改用户信息
const updateUserInfo = async () => {
  // 调用接口
  let result = await userInfoUpdateService(userInfo.value);
  ElMessage.success(result.msg ? result.msg : "修改成功");

  // 修改pinia中的个人信息
  userInfoStore.setInfo(userInfo.value);
};

// 图片上传成功的回调函数
const uploadSuccess = (result)=>{
    imgUrl.value = result.data;
}

// 修改用户头像
const updateAvatar = async ()=>{
    // 调用接口
    let result = await userAvatarUpdateService(imgUrl.value);
    ElMessage.success(result.msg ? result.msg:'修改成功')

    // 修改pinia中的数据
    userInfoStore.info.userPic = imgUrl.value
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="10">
        <el-form
          :model="userInfo"
          :rules="rules"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo"
              >提交修改</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-col class="avatar-box" :span="5">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="true"
          action="/api/upload"
          name="file"
          :headers="{ Authorization: tokenStore.token }"
          :on-success="uploadSuccess"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else :src="avatar" width="105" />
        </el-upload>
        <br />
        <el-button :icon="Upload" size="middle" link @click="updateAvatar">
          上传新头像
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-uploader {
    :deep() {
      .avatar {
        width: 105px;
        height: 105px;
        display: block;
        border-radius: 50%;
      }

      .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }

      .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 105px;
        height: 105px;
        text-align: center;
      }
    }
  }
  .el-button {
    font-size: medium;
  }
}
</style>
