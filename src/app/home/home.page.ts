import { Component } from '@angular/core';
import { MealdbApiService } from 'src/service/mealdb-api.service';
import { MEALDB_Category, MEALDB_ListItem } from '../model/model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  meals: MEALDB_ListItem[] | null = null;
  currentMealCategory: String;
  mealCategory: Array<String> = Object.keys(MEALDB_Category).filter(key => isNaN(+key));

  constructor(private mealdb: MealdbApiService) {
    //console.log(this.mealCategory);
    this.currentMealCategory = this.mealCategory[0];
    //console.log(this.currentMealCategory);
    this.loadData(this.currentMealCategory);
  }

  loadData(category: String) {
    this.mealdb.getMealsByCategory(category)
    .subscribe((meals: MEALDB_ListItem[]) => {
      this.meals = meals;
    });
  }

  categorySelected(category) {
    var category_selected: String = category.detail.value;
    this.loadData(category_selected);
  }

}
