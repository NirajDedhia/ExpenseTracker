import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataStorageService } from '../../services/dataStorage/data-storage.service';
import { ExpenseService } from '../../services/expense/expense.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  title: string;
  expenses: any[];
  dummyExpenses: any;

  constructor(private router: Router, private route:ActivatedRoute, private dataStorage: DataStorageService, private expenseService: ExpenseService) { 
    this.dummyExpenses = {
      "Travel": [{
        "id":"1111",
        "amount":74.5,
        "date":"01/13/2019",
        "category":"Travel"
      },
      {
        "id":"1112",
        "amount":56.4,
        "date":"01/18/2019",
        "category":"Travel"
      }],
      "Grocery": [{
        "id":"2222",
        "amount":14.5,
        "date":"01/16/2019",
        "category":"Grocery"
      }],
      "Other": [{
        "id":"3333",
        "amount":56.4,
        "date":"01/18/2019",
        "category":"Other"
      }]
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(!params['categoryName']){
        this.router.navigate(['home']);}
      else{
        this.title = params['categoryName'];
        this.getExpensesOf();
      }
    });
  };

  getExpensesOf() {
    var userId="5c355a7efb6fc0600bdc135d"
    var cycle="012019"
    // this.dataStorage.currentUserId.subscribe(userId => userId=userId)
    this.expenseService.getAllExpensesByCategory(userId, cycle, this.title)
    .subscribe(res => {
      console.log("Got response",res);
      this.formatResponse(res);
    }, err => {
      console.log("Found error");
      this.router.navigate(['home/']);

    });
  };

  formatResponse(response){
    this.expenses = response;
  };

  goToDetailsPage(expense) {
    this.dataStorage.changeMessage(expense);
    this.router.navigate(['details']);
  };

}
