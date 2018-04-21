import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';

import { PricelistService } from './../../shared/pricelist.service';
import { PricelistEditModel } from './../../shared/pricelist.model';
import { SearchFilterPipe } from './../../pipes/searchFilter.pipe';
import { OrderByPipe } from './../../pipes/orderBy.pipe';

@Component({
  selector: 'app-pricelist-edit-all',
  templateUrl: './pricelist-edit-all.component.html',
  styleUrls: ['./pricelist-edit-all.component.css']
})

export class PricelistEditAllComponent implements OnInit {

  renderedPricelist: PricelistEditModel[] = [];
  selectedPricelistRecords: any = [];
  selectedAllPricelistRecords: boolean = false;
  filterString = '';
  totalCount: number = 0;
  pageName: string = 'pricelist-edit-all';
  updatedRecordCount: number = 0;
  optionSelected: string = '';
  options: string[] = ['KLASS', 'KATEGORI'];
  updateString = '';
  isDesc: boolean = false;
  column: string = 'Klass';
  direction: number;
  statusMessage: string = 'Loading data. Please wait ';
  tokenExpiryTime: any;

  constructor(private pricelistService: PricelistService, private toastr: ToastrService,
    private slimLoadingBarService: SlimLoadingBarService) {
  }
  
  ngOnInit() {
    this.tokenExpiryTime = localStorage.getItem('tokenExpiryTime');
    this.getPricelistRecords();
    console.log('UPDATE RECORDS BASED ON KATEGORI PAGE LOADED.\n' + 'AccessToken is  ' +localStorage.getItem('accessToken'));
  }

  getPricelistRecords() {
    this.selectedPricelistRecords = [];
    this.renderedPricelist = [];
    this.selectedAllPricelistRecords = false;
    this.pricelistService.getPriceListAll().subscribe(data => {
      //console.log(data);
      data.forEach(element => {
        this.renderedPricelist.push({ Pricelist: element, Selected: false });
      });
    }, err => {
      this.statusMessage = 'Problem with the service. Please try later ';
    });
    this.column = 'Klass';  //To show fa fa-sort icon
  }

  selectAll() {
    var sf = new SearchFilterPipe();
    this.selectedPricelistRecords = [];
    this.renderedPricelist.forEach(element => {
      if (this.selectedAllPricelistRecords) {
        const index = sf.transform(this.renderedPricelist, this.filterString, this.pageName).findIndex(item => item.Pricelist.ARTLEVAR === element.Pricelist.ARTLEVAR)
        if (index > -1) {
          this.selectedPricelistRecords.push(element.Pricelist);
        }
      } else {
        this.selectedPricelistRecords = [];
      }
      element.Selected = this.selectedAllPricelistRecords;
    });
  }

  onIndividualCheckboxClick(pricelist, isChecked) {
    if (this.selectedPricelistRecords.length > 0 && !isChecked) {
      var index = this.selectedPricelistRecords.findIndex(item => item.ARTLEVAR === pricelist.ARTLEVAR)
      this.selectedPricelistRecords.splice(index, 1);
    }
    else if (isChecked) {
      this.selectedPricelistRecords.push(pricelist);
    }
  }

  loadingBarStart() {
    this.slimLoadingBarService.start();
  }

  loadingBarStop() {
    this.slimLoadingBarService.stop();
  }

  loadingBarComplete() {
    this.slimLoadingBarService.complete();
  }

  updateSelectedRecords() {
    // console.log('updatestring is'+ this.updateString + '.................');
    if (this.updateString != '') {
      this.updateSelectedColumn();
    }
    else {
      this.loadingBarStart();
      this.pricelistService.putPricelists(this.selectedPricelistRecords).subscribe(data => {
        this.updatedRecordCount = this.selectedPricelistRecords.length;
        this.filterString = '';
        this.getPricelistRecords();  //refresh pricelist       
      }, err => {
        this.filterString = '';
        this.loadingBarStop();
        this.loadingBarComplete();
        this.getPricelistRecords();  //refresh pricelist
        this.toastr.error('Update error, please contact administrator!');
        this.updatedRecordCount = 0;
      },
        () => {
          if (this.updatedRecordCount == 1) {
            this.toastr.success(this.updatedRecordCount + ' record updated successfully!');
            this.loadingBarComplete();
          }
          if (this.updatedRecordCount > 1) {
            this.toastr.success(this.updatedRecordCount + ' records updated successfully!');
            this.loadingBarComplete();
          }
          this.updatedRecordCount = 0;
          this.optionSelected = '';
        });
    }
  }

  updateSelectedColumn() {
    this.loadingBarStart();
    this.pricelistService.putPricelistColumn(this.selectedPricelistRecords, this.optionSelected, this.updateString).subscribe(data => {
      this.updatedRecordCount = this.selectedPricelistRecords.length;
      this.updateString = '';
      this.filterString = '';
      this.optionSelected = '';
      this.getPricelistRecords();  //refresh pricelist        
    }, err => {
      this.updateString = '';
      this.filterString = '';
      this.optionSelected = '';
      this.loadingBarStop();
      this.getPricelistRecords();  //refresh pricelist
      this.toastr.error('Update error, please contact administrator!');
      this.updatedRecordCount = 0;
    }, () => {
      this.optionSelected = '';
      if (this.updatedRecordCount == 1) {
        this.toastr.success(this.updatedRecordCount + ' record updated successfully!');
        this.loadingBarComplete();
      }
      if (this.updatedRecordCount > 1) {
        this.toastr.success(this.updatedRecordCount + ' records updated successfully!');
        this.loadingBarComplete();
      }
      this.updatedRecordCount = 0;
    });
  }

  onOptionsSelected(event) {
    this.optionSelected = event;
  }

  sort(property: string) {
    this.isDesc = !this.isDesc; //change the sort direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
