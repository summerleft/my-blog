import request from "../request";

export function register(params) {
  return request({
    url: "/register",
    method: "post",
    header: {
      "Content-Type": "application/json",
    },
    data: {
      username: params.username,
      password: params.password
    }
  })
}

export function login(params) {
  return request({
    url: "/login",
    method: "post",
    header: {
      "Content-Type": "application/json",
    },
    data: {
      username: params.username,
      password: params.password
    }
  })
}