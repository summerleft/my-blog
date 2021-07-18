import request from "../request";

export function register(params) {
  return request({
    url: "/register",
    method: "post",
    data: {
      username: params.username,
      password: params.password
    }
  })
}