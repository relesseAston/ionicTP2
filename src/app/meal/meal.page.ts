import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealdbApiService } from 'src/service/mealdb-api.service';
import { Observable } from 'rxjs';
import { MEALDB_Meal } from '../model/model';
import { tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  mealId : String;
  meal$: Observable<MEALDB_Meal>; //propriété contenant un objet observable
  ingredients: String[]; 
  mesures: String[];

  constructor(private route: ActivatedRoute, private mealdb: MealdbApiService, private sanitizer: DomSanitizer, private router: Router) {
    //récupération du paramètre d'url :is 
    this.mealId = this.route.snapshot.paramMap.get("id");
    this.meal$ = this.mealdb
      .getMealById(this.mealId)
      .pipe(
        tap((meal: MEALDB_Meal) => {
          console.log(meal);
          this.ingredients = this.getIngredientArray(meal);
          this.mesures = this.getMesureArray(meal);
          console.log(this.mesures);
        })
      )
   }

  ngOnInit() {
  }

  getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl {
    let id = meal.strYoutube.split('=')[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/"+id
    );
  }

  private getIngredientArray(meal: MEALDB_Meal): String[] {
    let result: String[]  = [];
    for (let i = 1;  i <=20; i++ ){
      let value: string = meal["strIngredient"+i];
      if(value != "") result.push(value);
    } 
    return result;
  }

  private getMesureArray(meal: MEALDB_Meal): String[] {
    let result: String[]  = [];
    for (let i = 1;  i <=20; i++ ){
      let value: string = meal['strMeasure'+i];
      if(value != "") result.push(value);
    } 
    return result;
  }

  backHome() {
    this.router.navigateByUrl('/home');
  }



}
