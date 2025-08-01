
import { message } from "antd";
import axios from "axios";
// Verificar se as variáveis de ambiente estão definidas
   const apiUrl = import.meta.env.VITE_URL_API;// || import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error("Url nao esta padrao");
}

// Função para obter o token do localStorage

const getStoreToken = () => localStorage.getItem('fireStoreToken');

export const apiStore = axios.create({
  baseURL: apiUrl,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiStore.interceptors.request.use(config => {
  const token = getStoreToken();
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

apiStore.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    const messageAPI = error.response?.data?.message;

    if (status === 401 && messageAPI === 'Token ausente') {
      message.info("Token inválido.");
    }

    if (error.message) {
      message.error("Token inválido ou expirado");
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);



// Função para definir o token no localStorage
// const getRefreshToken = () => localStorage.getItem('refreshToken');
// const setAuthToken = (token: string) => localStorage.setItem('authToken', token);

// // Função para renovar o token de acesso
// const refreshAccessToken = async () => {
//     try {
//         const refreshToken = getRefreshToken();
//         if (!refreshToken) {
//             throw new Error('No refresh token available');
//         }

//         const response = await axios.post(`${apiUrl}/refresh`, { refreshToken });
//         const { accessToken } = response.data;

//         setAuthToken(accessToken);
//         return accessToken;
//     } catch (error) {
//         console.error('Failed to refresh token:', error.response?.data?.message || error.message);
//         throw error;
//     }
// };

const getAuthToken = () => localStorage.getItem('authToken');
export const api = axios.create({
  baseURL: apiUrl,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adicionar interceptador para incluir o token nas requisições
api.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Adicionar interceptador para tratamento de resposta e renovação do token
api.interceptors.response.use(
  response => response,
  async error => {
    // CASO A API RETORNE 404 ELE VAI LIMPAR O TOKEN E RETONAR PARA A LOGIN
    if (error.response?.status === 401 && error.response?.data?.message === 'Token inválido') {//Token inválido
       message.info("token inválido.")
       window.location.href = '/login';
       }
           if (error.response?.status === 500 && error.response?.data?.message === 'Erro ao gerar ou enviar o link.') {//Token inválido
       message.info("token inválido.")
       window.location.href = '/login';
       }
       
   if(error.message){
      message.error("Token inválido ou expirado")
      // window.location.href = '/login';
   }
        // const originalRequest = error.config;
        // try {
        //   //Chamo ele mesmo e repasso o token
        //     const newAccessToken = await refreshAccessToken();
        //     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        //     return api(originalRequest); // Repetir a requisição original com o novo token
        // } catch (refreshError) {
        //     // Redirecionar para login ou exibir mensagem de erro
        //     message.error('Error refreshing access token:', refreshError.response?.data?.message || refreshError.message);
        //     // redirecionar para a página de login ou limpar os tokens
        //     window.location.href = '/login'; //  redirecionamento para a página de login
        // }
        // window.location.href = '/login'; 
   

    // console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
