import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService, RegisterDto, signInDto } from 'common';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('employee_info')
    employee_info(@Body() registerDto: RegisterDto) {
        return this.authService.employee_info(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get('load_department')
    load_department() {
        return this.authService.load_department();
    }
}
