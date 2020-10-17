import {MapperUtils} from './mapper.util';
import {TickData} from '../models/tick-data.model';

describe('normalizeTickData', function () {
    it('should return a TickData object', () => {
        //  Prepare
        const expected: TickData = {
            type: '2',
            market: 'Bitstamp',
            amount:
                {
                    price: 368.5,
                    fromCurrency: 'ETH',
                    toCurrency: 'USD'
                },
            lastUpdate: 1602853775
        }
        //  Execute
        const result: TickData = MapperUtils.normalizeTickData(TestData.initialTickData);
        //  Assert
        expect(result).toEqual(expected)
    });
});

class TestData {
    public static initialTickData = {
        'TYPE': '2',
        'MARKET': 'Bitstamp',
        'FROMSYMBOL': 'ETH',
        'TOSYMBOL': 'USD',
        'FLAGS': 2,
        'PRICE': 368.5,
        'LASTUPDATE': 1602853775,
        'LASTVOLUME': 4.16563205,
        'LASTVOLUMETO': 1535.035410425,
        'LASTTRADEID': '125231851',
        'VOLUMEDAY': 33154.44323766,
        'VOLUMEDAYTO': 12214255.4753394,
        'VOLUME24HOUR': 46154.38192091,
        'VOLUME24HOURTO': 17117035.5092229,
        'VOLUMEHOUR': 577.87092053,
        'VOLUMEHOURTO': 213229.826213499
    }
}
