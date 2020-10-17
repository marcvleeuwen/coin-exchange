import {Monetary} from "./monetary.model";

export interface TickData {
    type: string;
    market: string;
    amount: Monetary;
    lastUpdate: number
}

export interface RawTickData {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: number;
    PRICE: number;
    LASTUPDATE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    LASTTRADEID: string;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;

}
