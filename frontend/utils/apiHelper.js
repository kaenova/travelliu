// Only use this on client side
import axios from 'axios'
import jsCookie from 'js-cookie';

const api = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
    withCredentials: true,
  })
  return api
}

const authApi = () => {
  const ax = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
    withCredentials: true,
  })
  ax.interceptors.response.use(res => { return res }, e => {
    // Redirect to login page
    if (e.response.status == 401) {
      window.location = "/login?must_login"
      jsCookie.remove('auth')
    }
    console.log(e)
    console.log(e.response)
  })

  return ax
}

export { authApi, api };