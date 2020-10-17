import {OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {CoinsService} from './coins/coins.service';
import {RawTickData, TickData} from './coins/models/tick-data.model';
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
        this.coinService.init();

        this.coinService.ccStreamer.on('message', (data: string) => {
            this.handleTickData(data);
        });
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): void {
        this.server.emit('msgToClient', text);
    }

    handleTickData(data: string): void {
        const dataObject = JSON.parse(data);
        if (dataObject["TYPE"] == CC_TYPES.TICKER) {
            const rawData: RawTickData = <RawTickData>JSON.parse(data);
            const normalizedData: TickData = MapperUtils.normalizeTickData(rawData);
            // this.logger.log(normalizedData.amount);
            this.server.emit('coinsChanged', normalizedData);
        }
    }
}
