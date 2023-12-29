import request from '../utils/request'

// 调用注册接口
export const userRegisterService = (registerData) => {
    // 借助URLSearchParams完成传参
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    
    return request.post('/users/register', params)
}

// 调用登录接口
export const userLoginService = (loginData) => {
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
    
    return request.post('/users/login', params)
}