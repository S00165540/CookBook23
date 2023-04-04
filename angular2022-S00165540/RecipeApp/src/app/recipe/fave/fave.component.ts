import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-fave',
  templateUrl: './fave.component.html',
  styleUrls: ['./fave.component.css']
})
export class FaveComponent{
  @Input('isFavorite')
  isSelected!: boolean;
  @Output('change') click = new EventEmitter();

  onClick() { 
    this.isSelected = !this.isSelected;
    this.click.emit({ newValue: this.isSelected });
  }
}

export interface FavoriteChangedEventArgs {
  newValue: boolean
}