import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe';
import { RecipeService } from '../../recipe.service';
import { SettingsService } from 'src/app/settings.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-row',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() recipe!: Recipe;

  recipeName= '';
  recipes: Recipe[] = [];
  recipeList: Recipe[] = [];
  message: string = "";

  currentRecipe : Recipe | undefined;

  showRecipeForm:boolean = false;

  constructor(private recipeService: RecipeService, private router: Router) { }

 
  ngOnInit(): void {

  
    this.recipeService.getRecipes().subscribe({
      next: (value: Recipe[])=> this.recipeList = value,
      complete: () => console.log('recipe service finished'),
      error: (mess) => this.message = mess

    })
    
  }

  clicked (id:any): void {
    this.router.navigate(['/recipes', id]);
    
    
  }

  dismissAlert() {
    this.message = "";
  }
  openAddRecipe(): void {
    this.currentRecipe = undefined;
    this.showRecipeForm = true;

  }
  openEditRecipe(): void {
    this.showRecipeForm = true;
  }

  deleteRecipe() {
    console.log('deleting a recipe');
    if (this.currentRecipe) {
      this.recipeService.deleteRecipe(this.currentRecipe._id)
        .subscribe({
          next: recipe => {
            console.log(JSON.stringify(recipe) + 'has been deleted');
            this.message = "recipe has been deleted";
          },
          error: (err) => this.message = err
        });
    }

    this.ngOnInit();
    this.currentRecipe = undefined;

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
  isSelected(recipe: Recipe): boolean {
    if (!recipe || !this.currentRecipe) {
      return false;
    }
    else {
      return recipe._id === this.currentRecipe._id;
    }
  }


}