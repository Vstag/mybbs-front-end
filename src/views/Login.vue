<script setup>

</script>

<template>
  <div class="container" style="max-width: 550px">
        <h2 class="text-center text-custom pt-5 pb-5">用户登录</h2>
        <div class="bg-white p-4 shadow-sm rounded border">
            <form action="#" method="post" enctype="multipart/form-data">
                <input type="text" class="form-control mb-4" placeholder="用户名">
                <input type="password" class="form-control mb-4" placeholder="密码">
                <div class="button-group mb-4">
                    <input class="form-check-input" id="remember_me" type="checkbox" value="">
                    <label class="form-check-label" for="remember_me">记住我</label>
                </div>
                <input type="submit" class="btn btn-custom text-white w-100" value="登录">
            </form>
        </div>
        <div class="button-group m-2">
            <a class="link-custom text-decoration-none" href="#">注册</a>
            <a class="link-custom text-decoration-none float-end" href="#">忘记密码</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>