import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const recipeRoutes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'recipes/:id',component: RecipeDetailsComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
