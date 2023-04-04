import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
recipe!: Recipe;


  message: string = "";

  currentRecipe : Recipe | undefined;
  showRecipeForm:boolean = false;


  constructor(private recipeService: RecipeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
this.route.queryParams.subscribe(params => {
const recipeId = params['id'];
    this.recipeService.getRecipe(recipeId).subscribe(recipe => {
      this.recipe = recipe;
  });
    
  });
}
}