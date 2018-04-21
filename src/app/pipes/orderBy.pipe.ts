import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {
    transform(records: Array<any>, args?: any): any {
        if (records !== undefined) {
            // console.log(records);
            // console.log(args);
            return records.sort(function (a, b) {
                if(a.Pricelist.KLASS < b.Pricelist.KLASS){
                    return -1 * args.direction;
                }
                else if (a.Pricelist.KLASS > b.Pricelist.KLASS){
                    return 1 * args.direction;
                }
                else {
                    return 0;
                }
            });
        }
        //return records;
    }
}