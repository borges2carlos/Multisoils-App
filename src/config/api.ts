import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://www.multisoils.com.br/api',
});

api.interceptors.request.use((config) => {
    return AsyncStorage.getItem("@MultiSoilsZ").then(data => {
      const dataToken = JSON.parse(data)

      if (dataToken && dataToken.state && dataToken.state.token)
        config.headers.Authorization = `Bearer ${dataToken.state.token}`;

      return Promise.resolve(config)
    })
      .catch(() => {
        return Promise.resolve(config)
      })
  },
  error => {
    return Promise.reject(error)
  },
)

export const { isAxiosError } = axios;

export default api;
