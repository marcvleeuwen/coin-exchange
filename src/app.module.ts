import {Module} from '@nestjs/common';
import {AppGateway} from './app.gateway';
import {CoinsService} from './coins/coins.service';
import {ConfigModule} from '@nestjs/config';
import {MetaDataController} from './meta-data/meta-data.controller';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import { AppController } from './app.controller';

@Module({
    imports: [ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'static'),
        }),],
    controllers: [MetaDataController, AppController],
    providers: [AppGateway, CoinsService],
})
export class AppModule {
}
