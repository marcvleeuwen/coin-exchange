import {Injectable} from '@nestjs/common';
import * as WebSocket from 'ws';
import {SubRequest} from './models/sub-request.model';
import {CC_ACTIONS, CC_TYPES} from './constants/crypto-compare.constant';

@Injectable()
export class CoinsService {
    public readonly ccStreamer = new WebSocket(`${process.env.CC_URL}?api_key=${process.env.CC_API_KEY}`);

    // TODO: Hook constant up to a DB to enable realtime changes
    private coins: Array<string> = process.env.DEFAULT_BASE.split(',');
    private currencies: Array<string> = process.env.DEFAULT_QUOTE.split(',');
    private exchanges: Array<string> = process.env.DEFAULT_EXCHANGE.split(',');

    private static formatRequest(action: CC_ACTIONS, channel: CC_TYPES, coins: Array<string>, currencies: Array<string>, exchanges: Array<string>): SubRequest {

        const subs: Array<string> = [];
        coins.forEach((coin: string) => {
            currencies.forEach((currency: string) => {
                exchanges.forEach((exchange: string) => {
                    subs.push(`${channel}~${exchange}~${coin.toUpperCase()}~${currency.toUpperCase()}`);
                });
            });
        });

        return {action, subs};
    }

    public init(): void {
        this.ccStreamer.on('open', () => {
            this.createStream(this.ccStreamer, CC_ACTIONS.SUB_ADD, CC_TYPES.TICKER);
        });
    }

    public createStream(webSocket: WebSocket, action: CC_ACTIONS, channel: CC_TYPES): void {
        if (!webSocket.readyState == WebSocket.open) {
            webSocket.close;
        }
        const subRequest: SubRequest = CoinsService.formatRequest(action, channel, this.coins, this.currencies, this.exchanges);
        webSocket.send(JSON.stringify(subRequest));
    }

    // TODO: add ability to change coins on the fly - Requires DB
    // public onCoinsChange(coins: Array<string>): void {
    //     this.coins = [...this.coins, ...coins];
    //     this.createStream(this.ccStreamer, CC_ACTIONS.SUB_ADD, CC_TYPES.TICKER);
    // }
    //
    // TODO: add ability to change currencies on the fly - Requires DB
    // public onCurrenciesChange(currencies: Array<string>): void {
    //     this.currencies = [...this.currencies, ...currencies];
    //     this.createStream(this.ccStreamer, CC_ACTIONS.SUB_ADD, CC_TYPES.TICKER);
    // }
    //
    // TODO: add ability to change exchanges on the fly - Requires DB
    // public onExchangesChange(exchanges: Array<string>): void {
    //     this.exchanges = [...this.exchanges, ...exchanges];
    //     this.createStream(this.ccStreamer, CC_ACTIONS.SUB_ADD, CC_TYPES.TICKER);
    // }
}
