import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MEALDB_ListItem, MEALDB_Meal } from 'src/app/model/model';

const MEALDB_API = {
  ROOT: 'https://www.themealdb.com/api/json/v1/1/',
  get FILTER() { //obtenir une liste de repas par catégorie
    return this.ROOT+'filter.php'
  },

  get LOOKUP() {// obtenir les infos d'un repas par rapport à sont identifiant
    return this.ROOT+'lookup.php?i='
  }
};

@Injectable({
  providedIn: 'root'
})
export class MealdbApiService {

  constructor(private http: HttpClient) { }

  getMealsByCategory(category: String): Observable<MEALDB_ListItem[]> {
    return this.http.get(MEALDB_API.FILTER+'?c='+category)
    .pipe(
      map((res: any) => res.meals)
    )
  }

  getMealById(id: String): Observable<MEALDB_Meal> {
    return this.http
      .get(MEALDB_API.LOOKUP + id)
      .pipe(
        map((res: any) => res.meals[0]) // retourne un objet de type MEALDB_Meal
      )
  }
}
