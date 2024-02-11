import axios from "axios";
import { useTokenStore } from "@/stores/token.js";
import { ElMessage } from "element-plus";

// 配置axios基本属性
axios.defaults.baseURL = "/api"; // 公共前缀
axios.defaults.timeout = 10000; // 响应超时

// 数据上传数据类型
axios.upType = {
  // 表单类型
  form: 0,
  // json类型
  json: 1,
  // 文件类型
  file: 3,
  // 文件流类型
  stream: 4,
};

// HTTP状态码
axios.httpcode = {
  //操作成功
  SUCCESS: 0,
  //暂未登录或TOKEN已经过期
  UNAUTHORIZED: 401,
  //没有相关权限
  FORBIDDEN: 403,
  //访问页面未找到
  NOT_FOUND: 404,
  //服务器错误
  SERVER_ERROR: 500,
};

export default (router) => {
  // 添加响应拦截器
  axios.interceptors.response.use(
    (result) => {
      // 判断业务状态码
      if ("code" in result.data) {
        // let store = userStore();
        const data = result.data;
        switch (data.code) {
          case axios.httpcode.SUCCESS:
            return Promise.resolve(data);
          case axios.httpcode.UNAUTHORIZED:
            ElMessage.error("请先登录");
            router.push("/login");
          case axios.httpcode.FORBIDDEN:
            router.push("/status/403");
            return Promise.reject(data);
          case axios.httpcode.NOT_FOUND:
            router.push("/status/404");
            return Promise.reject(data);
          case axios.httpcode.SERVER_ERROR:
            router.push("/status/500");
            return Promise.reject(data);
          default:
            ElMessage.error(data.message ? data.message : "服务异常");
            return Promise.reject(result);
        }
      }
    },
    (error) => {
      // 判断是否登录
      if (error.response.status === 401) {
        ElMessage.error("请先登录");
        router.push("/login");
      } else if (
        error.code === "ECONNABORTED" ||
        error.code === "ERR_NETWORK"
      ) {
        ElMessage.error("连接服务器失败");
      } else {
        ElMessage.error("服务异常");
      }

      return Promise.reject(error); // 异步的状态转化成失败的状态
    }
  );

  // 添加请求拦截器
  axios.interceptors.request.use(
    (config) => {
      const tokenStore = useTokenStore(); // 获取token

      // 将token添加到请求头中
      if (tokenStore.token) {
        config.headers.Authorization = tokenStore.token;
      }

      // 序列化提交方式的参数
      if (config.upType === axios.upType.json) {
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
      } else if (config.upType === axios.upType.file) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else if (config.upType === axios.upType.stream) {
        config.headers["Content-Type"] = "application/octet-stream";
      } else {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
        // if (config.data) {
        //   config.data = qs.stringify(config.data, { arrayFormat: "repeat" });
        // }
      }

      return config;
    },

    // 请求错误的回调
    (error) => {
      return Promise.reject(error);
    }
  );
};
