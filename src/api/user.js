import Request from '../utils/request'

// 注册接口
export const userRegisterService = (registerData) => {
    return Request.postFile('/users/register', registerData)
}

// 登录接口
export const userLoginService = (loginData) => {
    return Request.request(Request.POST, '/users/login', loginData)
}

// 获取用户信息接口
export const userInfoService = () => {
    return Request.request(Request.GET, `/users/info`)
}

// 修改用户信息接口
export const userInfoUpdateService = (userInfo) => {
    return Request.requestJson(Request.PUT, `/users/info`, userInfo)
}

// 修改用户头像接口
export const userAvatarUpdateService = (avatar) => {
    return Request.request(Request.PATCH, `/users/1/avatar`, avatar)
}