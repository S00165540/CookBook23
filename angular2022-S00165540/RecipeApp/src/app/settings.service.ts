import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public snippet!: Object;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getData()
      .subscribe(data => {
        console.log(data);
        this.snippet = data;
      });
  }
}
