import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], args: string, page: string): any {
    if (!args) {
      return items;
    }

    return items.filter(function (item) {
      console.log(item);
      switch (page) {        
        case 'pricelist-edit':
          return (item.Pricelist.ARTLEVAR.toLowerCase().includes(args.toString()) || item.Pricelist.ARTNMN1.toLowerCase().includes(args.toLowerCase())
            || item.Pricelist.ARTNR.toString().includes(args.toString()));
        case 'pricelist-edit-all':
          return (item.Pricelist.KATEGORI.toLowerCase().includes(args.toString()));
      }
    })
  }
}