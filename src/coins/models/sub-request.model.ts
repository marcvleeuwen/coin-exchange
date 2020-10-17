import {CC_ACTIONS} from '../constants/crypto-compare.constant';

export interface SubRequest {
    action: CC_ACTIONS;
    subs: Array<string>;
}
