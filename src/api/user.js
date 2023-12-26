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