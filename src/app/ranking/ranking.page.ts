import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})


export class RankingPage implements OnInit {
  

  constructor() { }

  ngOnInit() {
    leaderboard();
  }

  

}

function leaderboard() {
  var leaderboard = document.getElementById('leaderboard');
  var tbody = leaderboard.querySelector('tbody');
  var tbodyHtml = '';

  var player1 = {name:"Thomas",date:"01/23/18",score:"201"};
  var player2 = {name:"Michael",date:"03/24/17",score:"943"};
  var player3 = {name:"Josue",date:"06/04/18",score:"790"};
  var player4 = {name:"Juan",date:"06/04/18",score:"85"};
  var player5 = {name:"Jose",date:"06/04/18",score:"76"};
  var player6 = {name:"Sevichai",date:"06/04/18",score:"99"};
  var player7 = {name:"Roberto",date:"06/04/18",score:"100"};
  var player8 = {name:"Jorge",date:"06/04/18",score:"73"};
  var player9 = {name:"Melissa",date:"06/04/18",score:"45"};
  var player10 = {name:"Valentina",date:"06/04/18",score:"10"};
  
  var players = [
    player1,
    player2,
    player3,
    player4,
    player5,
    player6,
    player7,
    player8,
    player9,
    player10
  ]; 
  
  players.sort(function(a,b) {
    return Number(b.score) - Number(a.score);
  });
  
  for (var player of players) {
    tbodyHtml += '<tr><td>' + player.name + '</td><td>' + player.score + '</td></tr>';
  }
  
  tbody.innerHTML = tbodyHtml;
  
}





