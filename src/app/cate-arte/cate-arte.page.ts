import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import {NavController, NavParams} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
//import {} from 'googlemaps';
//import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  Geocoder,
  BaseArrayClass,
  GeocoderResult,
  Marker
} from '@ionic-native/google-maps';
import { LoadingController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-cate-arte',
  templateUrl: './cate-arte.page.html',
  styleUrls: ['./cate-arte.page.scss'],
})
export class CateArtePage implements OnInit {
content: object= null;
todos: Todo[];
@ViewChild('search_address') search_address: ElementRef;
map1: GoogleMap;

constructor(private activatedRoute: ActivatedRoute,
  public navCtrl: NavController, private todoService: TodoService) { }
 
ngOnInit() {
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  this.todoService.getTodo(id).subscribe(res => {
    this.content = res;
    // = res;
  });
}

add_event(){
this.navCtrl.navigateForward(['/tabs/calendar']);
}

loadMap1() {
  console.log(this.search_address);
  (this.search_address as any).value = '1600 Amphitheatre Parkway, Mountain View, CA 94043, United States';
  this.map1 = GoogleMaps.create('map_canvas1');
}

today = new Date().toISOString();
hourToday = new Date().getHours();
today3 = new Date().toDateString();


fecha1 = new Date();    
f = new Date(this.fecha1).toISOString().split('T')[0];

}





