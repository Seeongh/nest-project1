import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class KakaoLogin {
  check: boolean;
  accessToken: string;
  //private http: HttpServer;
  constructor() {
    this.check = false;
   // this.http = new HttpServer();
    this.accessToken = '';
  }
  loginCheck(): void {
    this.check = !this.check;
    return;
  }
  async login(url: string, headers: any): Promise<any> {
   // return await this.http.post(url, '', { headers }).toPromise();
  }
  setToken(token: string): boolean {
    this.accessToken = token;
    console.log('token',token);
    return true;
  }
  
}