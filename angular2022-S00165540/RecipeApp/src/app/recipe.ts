export interface Recipe {
  [x: string]: any;
    _id: any,
    recipeName: string,
image: { url:String},
    serves: string,
    ingredients: { ingredientList: string, nutrition: string},
    method: {stepOne:string,stepTwo: string, stepThree:string},
    cookTime:string,
    prepTime: string,
    mealType: string,
    creadtedBy:string,
    isFavorite:boolean
}
export class Banner {
  constructor(
      public adClient: string,
      public adSlot: number,
      public adFormat: string,
      public fullWidthResponsive: boolean) {
          this.adClient = adClient;
          this.adSlot = adSlot;
          this.adFormat = adFormat || 'auto';
          this.fullWidthResponsive = fullWidthResponsive || true;
  }
}
