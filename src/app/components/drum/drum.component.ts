import { Component } from '@angular/core';

@Component({
  selector: 'app-drum',
  imports: [],
  templateUrl: './drum.component.html',
  styleUrl: './drum.component.scss'
})
export class DrumComponent {
  public drumsList = [
    {
      key: 'A',
      name: 'joke-drums',
      audio: '/src/assets/audio/joke-drums.mp3'
    },
    {
      key: 'S',
      name: 'snare-drum',
      audio: '/src/assets/audio/snare-drum.mp3'
    },
    {
      key: 'D',
      name: 'tom-hot',
      audio: '/src/assets/audio/tom-hot.mp3'
    },
    {
      key: 'F',
      name: 'bell-ring',
      audio: '/src/assets/audio/bell-ring.mp3'
    }
  ]

  handler(event: KeyboardEvent) {
    console.log(event.key, event.keyCode);
  }
}
