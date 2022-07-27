import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

interface IsalesTaxArray{
  id: number,
  title: string,
  value: number
}
interface items{
  id: number,
  name: string,
  items: [{
    id: number,
    name: string,
    glcode: number,
    amount: number,
    salesTax: IsalesTaxArray
  }]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  totalAmmount: number = 0
  totalTaxes: number = 0

  itemsTitle = [
    'Category',
    'Items',
    'Gl Code',
    'Amount',
    'Sales Tax',
    'Total'
  ]

  localItems: items[] = [{ 
    id:1,
    name: 'Category 1',
    items:[{
      id: 1,
      name: 'item 1',
      glcode: 0,
      amount: 0,
      salesTax: {id:0, title: '', value: 0},
    }]

  }]

  salesTaxArray: IsalesTaxArray[]=[
    {id:1, title: 'No Tax', value: 0},
    {id:2, title: 'USA', value: 10},
    {id:3, title: 'Germany', value: 20},

  ]

  ngOnInit(){
  this.localItems[0].items[0].salesTax = this.salesTaxArray[0]
  }
  submitForm(myForm: NgForm){
    console.log(myForm)
  }

  addCategory(){
    this.localItems.push({
      id: -(new Date().getTime()),
      name: 'Category',
      items:[{
        id: -(new Date().getTime()),
        name: 'item',
        glcode: 0,
        amount: 0,
        salesTax: {id:0, title: '', value: 0},}]
    })
  }

  removeCategory(id: number){
    const idx = this.localItems.findIndex((item)=> item.id === id)
    if (idx !== -1){
      this.localItems.splice(idx, 1)
    }
  }

  addItemCategory(id: number){
    this.localItems.find((item)=>{
      if(item.id === id){
        item.items.push({
          id: -(new Date().getTime()),
          name: 'item',
          glcode: 0,
          amount: 0,
          salesTax: {id:0, title: '', value: 0},
        })
      }
    })
  }

  removeItemFromCategory(catId: number, itemId: number){
    this.localItems.find((item)=>{
      const idx = item['items'].findIndex((item)=> item.id === itemId)
      if(idx !== -1){
        item['items'].splice(idx, 1)
      }
    })
  }

  getTotalAmmount(isAmount: boolean){
    let total = 0

    this.localItems.forEach((item)=>{
      total = item.items.reduce((acc, curr)=>{
        if (isAmount){
          return  acc + +curr.amount
        }
        return acc + +curr.salesTax.value
      }, total)

    })
    if (isAmount) this.totalAmmount = total
    else this.totalTaxes = total

  }


}
