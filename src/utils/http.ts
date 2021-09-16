import axios, { AxiosError } from 'axios'
import { EmqxMessage } from '@emqx/emqx-ui'
import router from '@/router/'

const option = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  },
  baseURL: '',
  timeout: 10000,
}

Object.assign(axios.defaults, option)

const handleError = (error: AxiosError) => {
  const { response } = error
  if (response?.data) {
    EmqxMessage.error(`${response.data}`)
  } else {
    EmqxMessage.error(error.toString())
  }
}

axios.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      router.push({ name: 'Login' })
    } else {
      handleError(error)
    }
    return Promise.reject(error)
  },
)

export default axios
