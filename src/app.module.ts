import {Module} from '@nestjs/common';
import {AppGateway} from './app.gateway';
import {CoinsService} from './coins/coins.service';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [],
    providers: [AppGateway, CoinsService],
})
export class AppModule {
}
