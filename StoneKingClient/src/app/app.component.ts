import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StoneKingClient';

  myWorld:string[] = [
    'w', 'o', 'r', 'l', 'd'
  ]

  myStyle = {
    'color': '#' + Math.ceil(Math.random() * 200).toString(16) + Math.ceil(Math.random() * 200).toString(16) + Math.ceil(Math.random() * 200).toString(16)
  }

  amIExcited:number = Math.ceil(Math.random() * 3)

  constructor() {
    console.log('todo: make cool SK1 themed interface that can interact with API :D!')
  }

  ngOnInit() {

  }

}
