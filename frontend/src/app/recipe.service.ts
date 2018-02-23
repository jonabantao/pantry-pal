import { Injectable } from '@angular/core';
import { mashapeKey } from './api';
import { Recipe } from './data/recipes';
// import { RECIPES } from './data/recipes';
import { Ingredients, INGREDIENTS } from './data/ingredients';
// import { INGREDIENTS } from './ingredients/ingredients.component';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'X-Mashape-Key': mashapeKey
     })
};

@Injectable()
export class RecipeService {

  constructor(
    private http: HttpClient
  ) { }

  //// getIngredients for local file

  // getIngredients(userid): Observable<string[]>{
  //   return of(INGREDIENTS)
  // }

  //// getIngredients and updateIngredients for backend

  getIngredients(userid): Observable<string[]> {
    return this.http.get<string[]>(`api/users/${userid}`);
  }

  updateIngredients(userid, ingredients): Observable<string[]> {
    return this.http.patch<string[]>(`api/users/${userid}`, { ingredients });
  }


  getRecipes(ingredients): Observable<Recipe[]> {
    const ingredientsString = ingredients.join(',');
    const ingredientsURI = encodeURIComponent(ingredientsString);
    return this.http.get<Recipe[]>(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredientsURI}&limitLicense=false&number=5&ranking=2`, httpOptions);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information?includeNutrition=false`, httpOptions);
  }

}
