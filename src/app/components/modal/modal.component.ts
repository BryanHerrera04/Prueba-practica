import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { HouseInterface } from '../../models/house';
import { NgForm} from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose',{static: true}) btnClose: ElementRef;

  ngOnInit() {
  }

  onSaveHouse(houseForm: NgForm): void {
    if(houseForm.value.id == null){
      //new
      this.dataApi.addHouse(houseForm.value);
    } else {
      //Update
      this.dataApi.updateHouse(houseForm.value);
    }
    houseForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
