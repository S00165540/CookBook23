import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[], filterString: string, propName:string): any[] {
const resuly:any = [];
if(!value || filterString === '' || propName === ''){
  return value;
}
value.forEach((a:any)=> {
  if(a[propName].trim().toLowerCase().include(filterString.toLowerCase())) {
  resuly.push(a);
  }
});
return resuly;
  }

}
