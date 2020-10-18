import {Controller, Get, Res} from '@nestjs/common';

@Controller('app')
export class AppController {
    @Get()
    sendApplication(@Res() res) {
        res.sendFile('index.html');
    }
}
