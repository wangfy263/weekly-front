import axios from '@/libs/api.request'

export const findStaff = (data = {}) => {
  return axios.request({
    url: '/findStaff',
    data,
    method: 'post'
  })
}

export const saveStaff = (data = {}) => {
  return axios.request({
    url: '/saveStaff',
    data,
    method: 'post'
  })
}

export const updStaff = (data = {}) => {
  return axios.request({
    url: '/updStaff',
    data,
    method: 'post'
  })
}

export const delStaff = (data = {}) => {
  return axios.request({
    url: '/delStaff',
    data,
    method: 'post'
  })
}

export const noticeSomeone = (data) => {
  return axios.request({
    url: '/noticeSomeone',
    data,
    method: 'post'
  })
}

export const findRoles = (data) => {
  return axios.request({
    url: '/findRoles',
    data,
    method: 'post'
  })
}
