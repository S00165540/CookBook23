import { formatCurrency } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from 'src/app/recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @Output() recipeFormClose = new EventEmitter<Recipe>();
  @Input() recipe!: Recipe;
  recipeForm: FormGroup = new FormGroup({});


 
  message: string = "";

  currentRecipe!: Recipe;

  showRecipeForm:boolean = false;

  constructor(private route:Router, private recipeService:RecipeService) { }

    ngOnInit(): void {
      this.recipeForm = new FormGroup({
        recipeName: new FormControl ('', [Validators.required]),
        serves: new FormControl (''),
        ingredients: new FormGroup({
          ingredientList: new FormControl('', [Validators.required]),
          nutrition: new FormControl(''),
        }),
        method: new FormGroup({
    stepOne: new FormControl('', [Validators.required]),
    stepTwo: new FormControl(''),
    stepThree: new FormControl(''),
        }),
        cookTime:new FormControl(''),
          prepTime:new FormControl(''),
          image:new FormGroup({
  url:new  FormControl(''),
          }),
          mealType: new FormControl('', [Validators.required]),
         
      })
    }
  
    clicked (recipe:Recipe): void {
      this.currentRecipe = recipe
    }
  
    dismissAlert() {
      this.message = "";
    }
    openAddRecipe(): void {
      this.currentRecipe;
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
      this.currentRecipe;
  
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
  
  
    
  
    addNewRecipe(recipe: Recipe): void {
      console.log('adding new recipe ' + JSON.stringify(recipe));
      this.recipeService.addRecipe({ ...recipe })
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
  
    onSubmit(){
      console.log('forms submitted with ');
    console.table(this.recipeForm.value);
  this.addNewRecipe(this.recipeForm?.value);

  this.route.navigate(['/profile']);
    }
    
    
    
  goBack() {
    this.route.navigate(['/profile']);
  }
    closeForm() {
      this.recipeFormClose.emit(undefined)
    }
  
    get recipeName() {
      return this.recipeForm?.get('recipeName');
    }
    get mealType() {
      return this.recipeForm?.get('mealType');
    }
    get serves() {
      return this.recipeForm?.get('serves');
    }
  
    get stepOne() {
      return this.recipeForm?.get('stepOne');
    }
    get ingredientList() {
      return this.recipeForm?.get('ingredientList');
    }
  
  }