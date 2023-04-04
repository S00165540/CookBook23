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
}
