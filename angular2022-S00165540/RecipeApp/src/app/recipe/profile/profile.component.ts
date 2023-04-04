import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/internal/operators/map';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  recipeName= '';
  recipes: Recipe[] = [];
  recipeList: Recipe[] = [];
  message: string = "";

  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null)));
  showRecipeForm:boolean = false;
  
  currentRecipe : Recipe | undefined;
  constructor(public auth: AuthService,private router:Router,private recipeService: RecipeService) { }

  ngOnInit(): void {
    

    this.recipeService.getRecipes().subscribe({
      next: (value: Recipe[])=> this.recipeList = value,
      complete: () => console.log('recipe service finished'),
      error: (mess) => this.message = mess

    })
  }
  openAddRecipe(): void {
 this.router.navigate(['/recipe-form']);

  }
  openEditRecipe(): void {
    this.showRecipeForm = true;
  }
  dismissAlert() {
    this.message = "";
  }

  recipeFormClose(recipe?: any): void {
    this.showRecipeForm = false;
    console.table(recipe);
    if (recipe == null) {
      this.message = "form closed w/o saving"
      this.currentRecipe = undefined
    }
    else if (this.currentRecipe == null) {
      this.addNewRecipe(recipe);
    }
    else {
      this.updateRecipe(this.currentRecipe._id, recipe)
    }
  }
  updateRecipe(id: string, recipe: Recipe): void {
    console.log('updating');

    console.table(recipe);
    this.recipeService.updateRecipe(id, recipe)
      .subscribe({
        next: recipe => {
          console.log(JSON.stringify(recipe) + 'has been updated');
          this.message = "updated";

        },
        error: (err) => this.message = err
      });

    this.ngOnInit();
  }

  addNewRecipe(newRecipe: Recipe): void {
    console.log('adding new recipe ' + JSON.stringify(newRecipe));
    this.recipeService.addRecipe({ ...newRecipe })
      .subscribe({
        next: recipe => {
          console.log(JSON.stringify(recipe) + ' has been added');
          this.message = "new recipe has been added";
          this.ngOnInit();
        },
        error: (err) => this.message = err
      });

  }

}
