import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { HouseInterface } from '../../../models/house';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  private houses: HouseInterface[];

  ngOnInit() {
    this.getListHouses();
  }

  getListHouses() {
    this.dataApi.getAllHouses().subscribe( houses => {
      this.houses = houses; 
      });
  }

  onDeleteHouse(idHouse: string):void{
    const confirmacion =confirm('¿Estas seguro?')
    if(confirmacion){
      this.dataApi.deleteHouse(idHouse);
    }
  }
  onPreUpdateHouse(house: HouseInterface){
    console.log('house', house)
    this.dataApi.selectedHouse = Object.assign({},house);
  }

}
