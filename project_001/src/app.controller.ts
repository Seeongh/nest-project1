import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { from } from 'rxjs';
import { AppService, KakaoLogin } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/kakaoLogin')
  @Header('Content-Type', 'text/html')
  kakaoLogin(): string {
    return `
    <div>
      <hi> kakao login </hi>

      <form action="/kakaoLoginLogic" method = "GET">
        <input type ="submit" value = "kakao login"/>
      </form>   
    `;
  }

  @Get('/kakaoLoginLogic')
  @Header('Content-Type', 'text/html')
  kakaoLoginLogic(@Res() res): void {
    const _hostName = "https://kauth.kakao.com";
    const _restApiKey  = "829ec4de7d6ac5533b1d6b885f02f1f1";
    const _redirecturl = "http://localhost:3000/kakaoLoginLogicRedirection"; 

    const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirecturl}&response_type=code`;
    return res.redirect(url);
  }

  @Get('/kakaoLoginLogicRedirection')
  @Header('Content-Type', 'text/html')
  kakaoLoginLogicRedirection(@Query() qs, @Res() res): void {
    
    console.log(qs.code);
    const _restApiKey  = "829ec4de7d6ac5533b1d6b885f02f1f1";
    const _redirecturl = "http://kakaoLoginLogicRedirection:3000/kakaoLogin"; 

    const _hostName = `https://kauth.kakao.com/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirecturl}&response_type=code`;
    const _headers = {
      headers :{
        'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };

    // this.kakaoLogin
    //   .login(_hostName,_headers)
    //   .then((e) =>{

    //     console.log(`TOKEN: ${e.data['access_token']}`);
    //     this.kakaoLogin.setToken(e.data['access_token']);
    //     return res.send('good');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.send('error');
    //   });
  }
}
