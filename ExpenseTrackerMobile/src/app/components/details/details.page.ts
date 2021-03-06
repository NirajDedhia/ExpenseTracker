import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { DataStorageService } from '../../services/dataStorage/data-storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  expense: any;
  newExpense: boolean;
  categories: any;

  constructor(private router: Router, private route:ActivatedRoute, private dataStorage: DataStorageService, private location: Location) {
    this.newExpense = false;
    this.categories = ["Travel","Grocery","Other"];
  }

  ngOnInit() {
    this.dataStorage.currentMessage.subscribe(message => this.expense=message)
    if(!this.expense){
      // this.router.navigate(['home']);
      this.newExpense = true;
      console.log("Empty Expense Object");
      this.expense = {
        "amount":null,
        "date":"",
        "category":"",
        "description":""
      };
    }
  };

  addExpense() {
    console.log("Add Expense");
    this.expense["userId"] = "5c355a7efb6fc0600bdc135d";
    this.expense["cycle"] = "012019";
    console.log("From Controller=>",this.expense);

    //this.location.back();
  };

  updateExpense() {
    console.log("Update Expense");
    this.location.back();
    // this.router.navigate(['list/'+this.expense.category]);
  };

}
