import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { AdsenseModule } from 'ng2-adsense/adsense.module';
import { HttpClient } from '@angular/common/http';

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
  public recipeName= '';

 searchKey:string = "";
 isFavorite: boolean = false;
  currentRecipe : Recipe | undefined;
  showRecipeForm:boolean = false;
  
  breakfastRecipes!: Recipe[] ;
  lunchRecipes!: Recipe[] ;
  dinnerRecipes!: Recipe[] ;

  favoriteRecipes: Recipe[] =  this.recipeList.filter(recipe => recipe.isFavorite);;
  constructor(private  recipeService: RecipeService, private https: HttpClient, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.recipeService.getRecipes().subscribe(
    //   recipes => {
    //     this.recipes = recipes;
    //     this.favoriteRecipes = recipes.filter(recipe => recipe.isFavorite); // Access the isFavorite property on the Recipe object
    //   },
    //   error => console.error(error)
    // );
    this.recipeService.findByMealType('breakfast')
    .subscribe((recipes: Recipe[]) => {
      this.breakfastRecipes = recipes;
    });
  this.recipeService.findByMealType('lunch')
    .subscribe((recipes: Recipe[]) => {
      this.lunchRecipes = recipes;
    });
  this.recipeService.findByMealType('dinner')
    .subscribe((recipes: Recipe[]) => {
      this.dinnerRecipes = recipes;
    });
    }
 


  searchTitle(recipeName:string): void {
    this.recipeService.findByRecipeName(recipeName).subscribe(
    (recipeList: Recipe[]) =>  {
      this.recipeList = recipeList;
    },

    (error: any) => console.log(error)
    );
  }

  clicked (id:any): void {
    this.router.navigate(['/recipes', id]);
    
  }
  
        // data => {
        //   this.recipes = data;
        //   console.log(data);
        // },
        // error => {
        //   console.log(error);
        // });


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