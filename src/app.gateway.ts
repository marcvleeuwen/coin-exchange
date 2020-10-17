import {OnGatewayInit, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Server} from 'socket.io';
import {CoinsService} from './coins/coins.service';
import {RawTickData} from './coins/models/tick-data.model';
import {MapperUtils} from './coins/utils/mapper.util';
import {CC_TYPES} from './coins/constants/crypto-compare.constant';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {

    @WebSocketServer() server: Server;

    private logger: Logger = new Logger('AppGateway');

    constructor(private readonly coinService: CoinsService) {
    }

    afterInit(): any {
        this.logger.log('Gateway initialized!');
        // TODO: Make init function take in arguments
        this.coinService.init();

        this.coinService.ccStreamer.on('message', (data: string) => {
            this.handleDataResponse(data);

        });
    }

    handleDataResponse(data: string): void {
        const dataObject = JSON.parse(data);
        switch (dataObject['TYPE']) {
            case CC_TYPES.TICKER:
                this.server.emit(
                    'coinsChanged',
                    MapperUtils.normalizeTickData(<RawTickData>JSON.parse(data))
                );
                break;
            //  TODO: Add cases for meta responses
        }
    }
}
