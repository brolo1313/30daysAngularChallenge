import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';

interface Drum {
  key: string;
  name: string;
  audio: HTMLAudioElement;
  isDisabled: boolean;
}

@Component({
  selector: 'app-drum',
  imports: [],
  templateUrl: './drum.component.html',
  styleUrl: './drum.component.scss'
})
export class DrumComponent implements OnInit {
  private lastPressedKey: string | null = '';
  public isLatinLayout: boolean = true;

  public textForLayoutException: string = 'Sorry, but this app only works with the Latin keyboard layout.';

  public drumsList: Drum[] = [
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
      audio: new Audio('assets/audio/bell-ring.mp3'),
      isDisabled: true
    }
  ]

  @ViewChildren('drumItems') drumItemsHtml!: QueryList<ElementRef>;

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    this.detectLayout(event);

    const drum = this.findInDrumsListBuKey(event.key);
    this.lastPressedKey = event.key.toUpperCase();

    if (drum && this.lastPressedKey && this.lastPressedKey === event.key.toUpperCase()) {
      drum?.audio.pause();
      drum.audio.currentTime = 0;
      this.lastPressedKey = null;
    } else {
      this.lastPressedKey = event.key.toUpperCase();
    }

    if (drum && !drum.isDisabled) {
      drum.audio.play();

      const drumItemElement = this.findHtmlElementByDrumKey(event)

      if (drumItemElement) {
        this.handleAddOrRemoveClass(drumItemElement, 'active', true);
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    const drumItemElement = this.findHtmlElementByDrumKey(event);

    if (drumItemElement) {
      this.handleAddOrRemoveClass(drumItemElement, 'active', false);
    }
  }

  ngOnInit() {
    this.initDrums();
  }

  public kickAndAddClass(event: MouseEvent) {
    const clickedDrum = (event.currentTarget as HTMLElement).lastChild?.textContent;
    const drum = this.findInDrumsListBuKey(clickedDrum!);

    this.lastPressedKey = clickedDrum!.toUpperCase();

    if (drum && this.lastPressedKey && this.lastPressedKey === clickedDrum!.toUpperCase()) {
      drum?.audio.pause();
      drum.audio.currentTime = 0;
      this.lastPressedKey = null;
    } else {
      this.lastPressedKey = clickedDrum!.toUpperCase();
    }

    if (drum && !drum.isDisabled) {
      drum.audio.play();

      const drumItemElement = this.findHtmlElementByDrumKey(event)

      if (drumItemElement) {
        this.handleAddOrRemoveClass(drumItemElement, 'active', true);
      }
    }
  }


  public kickAndRemoveClass(event: any) {
    const drumItemElement = this.findHtmlElementByDrumKey(event);

    if (drumItemElement) {
      this.handleAddOrRemoveClass(drumItemElement, 'active', false);
    }
  }

  private findInDrumsListBuKey(key: string) {
    return this.drumsList.find(drum => drum.key === key!.toUpperCase());
  }

  private findHtmlElementByDrumKey(event: KeyboardEvent | MouseEvent) {
    if ('key' in event) {
      return this.drumItemsHtml.toArray().find((item, index) => {
        return this.drumsList[index].key === event.key.toUpperCase();
      });
    } else {
      const clickedDrum = (event.currentTarget as HTMLElement).lastChild?.textContent;
      return this.drumItemsHtml.toArray().find((_, index) => {
        return this.drumsList[index].key === clickedDrum!.toUpperCase();
      });
    }
  }

  private handleAddOrRemoveClass(element: ElementRef, className: string, isAdd: boolean) {
    return isAdd
      ? element.nativeElement.classList.add(className)
      : element.nativeElement.classList.remove(className);
  }

  private detectLayout(event: KeyboardEvent): void {
    const pressedKey = event.key;
    if (/^[a-zA-Z]$/.test(pressedKey)) {
      this.isLatinLayout = true;
    } else if (/^[\u0400-\u04FF]$/.test(pressedKey)) { // checking Unicode for correct matching with Cyrillic 
      this.isLatinLayout = false;
    } else {
      return;
    }
  }

  private initDrums() {
    this.drumsList.forEach(drum => {
      drum.audio.oncanplaythrough = () => {
        console.log(`Audio for ${drum.name} is ready to play.`);
      };

      drum.audio.onerror = (error) => {
        console.error(`Error loading audio for ${drum.name}:`, error, drum.audio.src);
        drum.isDisabled = true;
      };

      drum.audio.load();
    });
  }
}
