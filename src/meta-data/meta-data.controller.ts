import {Controller, Get} from '@nestjs/common';
import {TickMetaData} from '../coins/models/tick-meta-data.model';

@Controller('meta-data')
export class MetaDataController {

    @Get('tick')
    getTickMetaData(): TickMetaData {
        return {
            coins: String(process.env.DEFAULT_BASE || '').split(','),
            currencies: String(process.env.DEFAULT_QUOTE || '').split(','),
            exchanges: String(process.env.DEFAULT_EXCHANGE || '').split(',')
        }
    }
}
