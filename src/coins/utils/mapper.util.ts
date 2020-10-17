import {RawTickData, TickData} from '../models/tick-data.model';

export class MapperUtils {
    public static normalizeTickData(rawData: RawTickData): TickData {
        return {
            type: rawData.TYPE,
            market: rawData.MARKET,
            amount: {
                price: rawData.PRICE,
                toCurrency: rawData.TOSYMBOL,
                fromCurrency: rawData.FROMSYMBOL
            },
            lastUpdate: rawData.LASTUPDATE
        };
    }
}
