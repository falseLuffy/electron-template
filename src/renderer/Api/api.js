import axios from 'axios'
import queryString from 'querystring'

export function getLaysuitType (params) {
  let url = '/api/suit/getSuitTypeDistribute'
  return axios.get(url + '?' + queryString.stringify(params))
}

export function getRegion (params) {
  const url = '/api/suit/getSuitAreaDistribute'
  return axios.get(url + '?' + queryString.stringify(params))
}

export function login ({loginName, password}) {
  let url = '/api/auth/token'
  return axios.post(url, {loginName, password})
}
