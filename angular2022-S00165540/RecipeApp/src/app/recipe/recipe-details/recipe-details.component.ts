import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipe.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators'
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

  constructor(private router:Router,private route:ActivatedRoute,private service:RecipeService) { }

  ngOnInit() : void  {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(id).subscribe(recipe => {
      this.recipe = recipe;
      })
    }
}
