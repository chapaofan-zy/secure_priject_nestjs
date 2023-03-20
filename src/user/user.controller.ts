import { Controller, Post, Res, Body, Get, Req } from '@nestjs/common';
import { get_id } from 'src/utils/_id';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() param, @Res() res) {
    const { username, password } = param;
    const serviceLogin = await this.userService.login(res, username, password);
    res.send(serviceLogin);
  }

  @Post('register')
  async register(@Body() param, @Res() res) {
    const { username, password } = param;
    const result = await this.userService.addOne(res, {
      id: get_id(),
      username,
      password,
    });
    if (result === 'failed') {
      console.log('用户名重复！');
      res.send({ result: 'fail', content: '用户名重复！' });
      return;
    }
    res.send({ token: result, result: 'success' });
  }

  @Get()
  getTest(@Req() req) {
    return this.userService.test(req);
  }
}
