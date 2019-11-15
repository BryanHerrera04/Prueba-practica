import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { HouseInterface } from '../../models/house';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-house',
  templateUrl: './details-house.component.html',
  styleUrls: ['./details-house.component.css']
})
export class DetailsHouseComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  public house: HouseInterface = {};

  ngOnInit() {
    const idHouse = this.route.snapshot.params['id'];
    this.getDetails(idHouse);
  }

  getDetails(idHouse: string):void{
    this.dataApi.getOneHouse(idHouse).subscribe( house =>{
      this.house = house;
    });
  }
}
