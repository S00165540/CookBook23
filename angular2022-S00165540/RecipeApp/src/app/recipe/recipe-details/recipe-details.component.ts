import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipe.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

@Input() recipe: any;
public recipeId: any;
recipeList: Recipe[] = [];
  message: any;
  isFavorite!: boolean;

  constructor(private router:Router, private http:HttpClient, private route:ActivatedRoute,private service:RecipeService) { }

  ngOnInit() : void  {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(id).subscribe(recipe => {
      this.recipe = recipe;
      })
    }
    toggleFavorite(recipe:Recipe) {  
      this.isFavorite = !this.isFavorite;
      this.http.put<Recipe>(`/recipes/${recipe._id}`, { isFavorite: recipe.isFavorite }).subscribe();
    }
}
