import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CssSelector } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from './recipe';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private dataUri = `${environment.apiUri}/recipes`;



  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.dataUri}`);
  }
  findByRecipeName(recipeName: any): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.dataUri}?recipeName=${recipeName}`);
  }
  

  getRecipes(): Observable<Recipe[]> {
    console.log("get recipes called");

    return this.http.get<Recipe[]>(`${this.dataUri}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

 getRecipeById(id:String): Observable<Recipe> {
  return this.http.get<Recipe>(`${this.dataUri}/${id}`)
  }

getRecipe(id: any): Observable<Recipe> {

    console.log("get recipe called" );
    return this.http.get<Recipe>(`${this.dataUri}/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )!;
  }
  


  deleteRecipe(id: string): Observable<unknown> {
    const url = `${this.dataUri}/${id}`;
    return this.http.delete(url)
    pipe(
      catchError(this.handleError)
    );
  }
 

  updateRecipe(id:string, recipe:Recipe): Observable<Recipe> {
    console.log('subto update' + id);
    let recipeURI: string = this.dataUri +  '/' + id;
    return this.http.put<Recipe>(recipeURI, recipe)
    .pipe(
      catchError(this.handleError)
    );

  }

  
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.dataUri,recipe)
   .pipe(
    catchError(this.handleError)
   );
  }

   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {

      console.error('An error occurred:', error.error);
    } else {

      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
      
  
  }
 

