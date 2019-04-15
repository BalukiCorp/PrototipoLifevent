import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import {NavController, AlertController, LoadingController} from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { formatDate } from '@angular/common';
import {ActivatedRoute} from 'node_modules/@angular/router';
import {Todo, TodoService} from '../services/todo.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit{
  contentCalendar: object= null;
  todoId = null;

  todo: Todo = {
   
   
    event_name: '',
    manager_name: '',
    category: '',
    hour: '',
    ubication: '',
    date: '', 
    description: '',
    final_date: '',
    final_hour: '',
    value: '',
    urlImage: '',
    //userUid:'',
  //  imageRef:'',
  };
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  viewTitle = '';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private route: ActivatedRoute, private loadingController: LoadingController, private todoService: TodoService,
    public navCtrl: NavController, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(){
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
   // this.resetEvent();
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }


  resetEvent(){
    this.todo = {
      event_name: '',
      description: '',
      date: new Date().toISOString(),
      final_date: new Date().toISOString(),
      category: '',
      hour: '',
      ubication: '',
      final_hour: '',
      value: '',
      urlImage: '',
      manager_name:'',
    };
  }

  addEvent(){
    let eventCopy = {
      title: this.todo.event_name,
      startTime: new Date(this.todo.date),
      endTime: new Date(this.todo.final_date),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(){
    this.calendar.currentDate = new Date();
  }

  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From' + start + '<br><br>To:' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  backClicked() {
    this.navCtrl.pop();
  }

}
