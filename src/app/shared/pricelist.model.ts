export class PricelistModel {
    AVTNR: string;
    GILTDAT: number;
    LEVEAN: any; //double
    ARTNR: string;    //Primary Key
    ARTLEVAR: number; //Not Primary Key
    EANKOD: string;
    UHGRP: string;
    ARTNMN1: string;
    ARTNMN2: string;
    ARTFABR: string;
    ARTLEVT: number;
    ARTLEVFP: number;
    ARTTRPFP: number;
    ARTPALFP: number;
    ARTMOMSK: string;
    ARTPRIS: any; //double
    ARTPRISP: number;
    ARTUTLEH: string;
    URLLINK: string;
    KLASS: string;
	KATEGORI: string;
}

export class PricelistEditModel {
    Pricelist: PricelistModel;
    Selected: boolean;
}
