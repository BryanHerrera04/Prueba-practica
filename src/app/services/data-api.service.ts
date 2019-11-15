import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HouseInterface } from '../models/house';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs:AngularFirestore) { 
    this.houseCollection = afs.collection<HouseInterface>('houses');
    this.houses = this.houseCollection.valueChanges();
  }
  private houseCollection: AngularFirestoreCollection<HouseInterface>;
  private houses: Observable<HouseInterface[]>;
  private houseDoc: AngularFirestoreDocument<HouseInterface>;
  private house: Observable<HouseInterface>;  
  public selectedHouse: HouseInterface ={
    id: null
  };


  getAllHouses(){
    return this.houses = this.houseCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action=>{
        const data = action.payload.doc.data() as HouseInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  getOneHouse(idHouse: string){
    this.houseDoc = this.afs.doc<HouseInterface>(`houses/${idHouse}`);
    return this.house = this.houseDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists == false ){
        return null;
      }else{
        const data = action.payload.data() as HouseInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  addHouse(house: HouseInterface): void {
    this.houseCollection.add(house);
  }
  updateHouse(house: HouseInterface): void{
    let idHouse = house.id;
    this.houseDoc = this.afs.doc<HouseInterface>(`houses/${idHouse}`);
    this.houseDoc.update(house);
  }
  deleteHouse(idHouse: string): void{
    this.houseDoc = this.afs.doc<HouseInterface>(`houses/${idHouse}`);
    this.houseDoc.delete();
  }
  
}
