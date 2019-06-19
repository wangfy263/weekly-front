import axios from '@/libs/api.request'

export const saveReport = (data) => {
  return axios.request({
    url: 'save',
    method: 'post',
    data
  })
}

export const exportExcel = (data) => {
  return axios.request({
    url: 'export',
    method: 'post',
    data
  })
}

export const findProjects = (data) => {
  return axios.request({
    url: 'manageProject/find',
    method: 'post',
    data
  })
}

export const findByUserId = (data) => {
  return axios.request({
    url: '/manageProject/findByUserId',
    method: 'post',
    data
  })
}

export const saveProject = (data) => {
  return axios.request({
    url: '/manageProject/save',
    method: 'post',
    data
  })
}

export const updateProject = (data) => {
  return axios.request({
    url: '/manageProject/update',
    method: 'post',
    data
  })
}

export const deleteProject = (data) => {
  return axios.request({
    url: '/manageProject/delete',
    method: 'post',
    data
  })
}
