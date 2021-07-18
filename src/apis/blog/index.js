import request from "../request";
import { getToken } from "@/utils/storage";

/**
 * 发表文章
 * @param {object} params
 * @param {string} params.title
 * @param {string} params.content
 * @param {string} params.username
 * @returns code message data{id}
 */
export function publish(params) {
  return request({
    url: "/publish",
    method: "post",
    header: {
      "Content-Type": "application/json",
    },
    data: {
      title: params.title,
      content: params.content,
      username: params.username,
    }
  })
}

/**
 * 删除文章
 * @param {number} id
 * @returns code message
 */
export function remove(id) {
  return request({
    url: "/remove",
    method: "post",
    header: {
      "Content-Type": "application/json",
    },
    data: {
      id,
    }
  })
}

/**
 * 修改文章
 * @param {object} params 
 * @param {number} params.id
 * @param {string} params.title
 * @param {string} params.content
 * @returns code message
 */
export function update(params) {
  return request({
    url: "/update",
    method: "post",
    header: "JWT" + " " + getToken(),
    data: {
      id: params.id,
      title: params.title,
      content: params.content,
    }
  })
}

/**
 * 查询所有文章
 * @returns code message data{pk fields{id title content username created_time last_updated_time browsetimes}}
 */
export function all() {
  return request({
    url: "/all",
    method: "get",
  })
}

/**
 * 查询单篇文章
 * 
 */
export function detail(id) {
  return request({
    url: "/details/" + id,
    method: "get",
  })
}