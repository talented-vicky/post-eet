import axios from 'axios';
import { useAuthStore } from '../../core/store/auth.store';

const apiClient = axios.create({
    baseURL: 'http://localhost:5195/api'
})

// add interceptor once to prevent manually adding it during every get/post/put request
apiClient.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    if(token){
        if(!config.headers){
            config.headers = config.headers ?? {};
        }
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})


export default apiClient;