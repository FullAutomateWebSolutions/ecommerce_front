import api from "@/axios/axios";
import { FirebaseUserResponse, IUser } from "@/types/type";
import { message, notification } from "antd";
import { AxiosResponse } from "axios";

export class CLogin {
  public user: IUser | null = null;
  public userSing: FirebaseUserResponse | null = null;
  
  constructor() {
    this.user = null;
    this.userSing = null;
  }
  public getUser() {
    return this.user;
  }
    
  public getUserSing() {
    return this.userSing;
  }

  private setToken(token: string) {
    localStorage.setItem("authToken", token);
  }
  public async loginUserApi(
    username: string,
    password: string
  ): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.post(
        "/login",
        {
          email: username,
          senha: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        this.user = { email: username, token: response.data };
        this.setToken(response.data);
        await this.loginUser();
      }

      //@ts-ignore
      return response || null;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  private async verifyFirebaseToken(): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.post("/api/auth/firebase", {});
      // this.token = response.data.token;
      return response;
    } catch (error) {
      console.log("Erro ao verificar token Firebase:", error);
      return Promise.reject(error);
    }
  }
  public async sendResetLink(email: string): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.post(
        "/api/send-reset-link",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      message.error("Erro ao enviar link de redefinição de senha.");
      return Promise.reject(error);
    }
  }
  public async createdUser(
    username: string,
    password: string
  ): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.post("/api/create-user", {
        email: username,
        password: password,
      });
      this.sendValidateEmail(username);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async sendValidateEmail(
    email: string
  ): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.post(
        "/api/validate-email",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      notification.info({
        message: "E-mail de validação enviado com sucesso.",
      });
      return response;
    } catch (error) {
      message.error("Erro ao enviar link de redefinição de senha.");
      return Promise.reject(error);
    }
  }
  private async loginUser() {
    const getAuthToken = localStorage.getItem("authToken");
    if (getAuthToken) {
      await this.verifyFirebaseToken().then((response) => {
        this.userSing = response.data;
      });
    } else {
      console.log("Nenhum token de autenticação encontrado.");
    }
  }
  public logondUser() {
    this.user === null
    this.userSing === null
    localStorage.removeItem('login-storage'); 
    localStorage.removeItem('authToken'); 

  }


}

// export class CAdminUser {
//     public userAll: FirebaseUserResponse[] = [];
//   constructor() {
//     this.userAll =[]
//   }
// public getUserAll() {
//   return Array.isArray(this.userAll) ? this.userAll : [];
// }
  
// /**Private token */

// public async fetchAllUsers(): Promise<FirebaseUserResponse[]> {
//   try {
//     const response = await api.get("/api/users");
//     this.userAll = response.data;
//     return response.data;
//   } catch (error) {
//     message.error("Erro ao buscar lista de usuários.");
//     this.userAll = [];
//     return [];
//   }
// }
// }

export const clogin = new CLogin();
