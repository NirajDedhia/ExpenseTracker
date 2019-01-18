import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../../services/dataStorage/data-storage.service';
import { ExpenseService } from '../../services/expense/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  title: string;
  expenses: any;
  category: string[];

  constructor(private router: Router, private dataStorage: DataStorageService, private expenseService: ExpenseService) {
    this.title = "Home Component";
    this.category = ["Travel","Grocery","Other","Total"];
    this.expenses = {
      "Travel":0,
      "Grocery":0,
      "Other":0,
      "Total":0
    }
  }

  ngOnInit() {
    this.getTotalExpenses();
  };

  getTotalExpenses() {
    var userId = "5c355a7efb6fc0600bdc135d";
    var cycle = "012019";
    this.expenseService.getTotalPerCategory(userId, cycle)
    .subscribe(res => {
      // console.log("Got response");
      this.formatResponse(res);
    }, err => {
      console.log("Found error");
    });
  };

  formatResponse(response) {
    var total = 0;
    for(var i=0;i<response.length;i++){
      this.expenses[response[i]["_id"]["category"]] = response[i]["amount"];
      total += response[i]["amount"];
    }
    this.expenses["Total"] =total;
  }
  
  goToListPage(categoryName) {
    // TODO: Go to List pag
    this.dataStorage.setUserId("5c355a7efb6fc0600bdc135d");
    this.router.navigate(['list/'+categoryName]);
  };

  addNewExpense() {
    this.dataStorage.changeMessage(null);
    this.router.navigate(['details']);
  }

}
