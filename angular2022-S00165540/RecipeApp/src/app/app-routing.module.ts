import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { CommunityComponent } from './community/community.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { ProfileComponent } from './recipe/profile/profile.component';
import { HomeComponent } from './recipe/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminComponent } from './admin/admin.component';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';
const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'community', component:CommunityComponent},
  {path: 'recipes/:id',component: RecipeDetailsComponent,canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path: 'recipe-form', component:RecipeFormComponent, canActivate:[AuthGuard]}


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
