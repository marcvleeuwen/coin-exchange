import {Module} from '@nestjs/common';
import {AppGateway} from './app.gateway';
import {CoinsService} from './coins/coins.service';
import {ConfigModule} from '@nestjs/config';
import {MetaDataController} from './meta-data/meta-data.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [MetaDataController],
    providers: [AppGateway, CoinsService],
})
export class AppModule {
}
