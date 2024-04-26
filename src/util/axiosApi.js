import axios from './axiosInstance';

export function makeRequest({
  url,
  method = 'get',
  params = {},
  data = {},
  headers = {},
  responseType = '',
}) {
  return axios({
    url,
    method,
    params,
    data,
    headers,
    responseType,
  });
}
