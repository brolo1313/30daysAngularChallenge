import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-drum',
  imports: [],
  templateUrl: './drum.component.html',
  styleUrl: './drum.component.scss'
})
export class DrumComponent implements OnInit {
  public drumsList = [
    {
      key: 'A',
      name: 'joke-drums',
      audio: new Audio('assets/audio/joke-drums.mp3'),
      isDisabled: false
    },
    {
      key: 'S',
      name: 'snare-drum',
      audio: new Audio('assets/audio/snare-drum.mp3'),
      isDisabled: false
    },
    {
      key: 'D',
      name: 'tom-hot',
      audio: new Audio('assets/audio/tom-hot.mp3'),
      isDisabled: false
    },
    {
      key: 'F',
      name: 'bell-ring',
      audio: new Audio('assets/audio/bell-ring.mp3'),
      isDisabled: false
    },
    {
      key: 'G',
      name: '',
      audio: new Audio('bad-path/assets/audio/bell-ring.mp3'),
      isDisabled: false
    }
  ]


  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const drum = this.drumsList.find(drum => drum.key === event.key.toUpperCase());
    if (drum && !drum.isDisabled) {
      console.log(event.code, event.keyCode, event);
      drum.audio.play();
    }

  }

  ngOnInit() {
    this.drumsList.forEach(drum => {
      drum.audio.oncanplaythrough = () => {
        console.log(`Audio for ${drum.name} is ready to play.`);
      };

      drum.audio.onerror = (error) => {
        console.error(`Error loading audio for ${drum.name}:`, error);
        drum.isDisabled = true;
      };

      drum.audio.load();

    });
  }
}
