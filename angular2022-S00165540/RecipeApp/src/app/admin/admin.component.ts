import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
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
  isSelected(recipe: Recipe): boolean {
    if (!recipe || !this.currentRecipe) {
      return false;
    }
    else {
      return recipe._id === this.currentRecipe._id;
    }
  }

}