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
