import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {

  @Input() recipes: any;
  public recipeId: any;
  recipeList: Recipe[] = [];
    message: any;
  recipeName= '';

 

  currentRecipe : Recipe | undefined;
  showRecipeForm:boolean = false;

  constructor(private recipeService: RecipeService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

      const id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id).subscribe(recipe => {
      this.recipes = recipe;

    })
    
  }

  searchTitle(): void {
    this.recipeService.findByRecipeName(this.recipeName)
      .subscribe(
        data => {
          this.recipes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  


  
  clicked (recipe:Recipe): void {
    this.currentRecipe = recipe
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
        },
        error: (err) => this.message = err
      });



   this.ngOnInit();
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