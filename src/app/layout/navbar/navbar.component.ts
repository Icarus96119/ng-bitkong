import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bitkong-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isSpeakerOn = false;
  backgroundAudio = null;
  isLoad = false;

  constructor() {
    this.loadAudio().then();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.switchSpeaker()
    }, 1000);
  }

  async loadAudio() {
    this.backgroundAudio = new Audio();
    this.backgroundAudio.src = '/themes/rubids/game/bitkong/assets/sound/background.mp3';
    await this.backgroundAudio.load();
    this.backgroundAudio.volume = 0.05;
    this.isLoad = true;
  }

  playAudio() {
    if (this.isLoad) {
      this.backgroundAudio.play();
    }
  }

  stopAudio() {
    this.backgroundAudio.pause();
  }

  switchSpeaker() {
    this.isSpeakerOn = !this.isSpeakerOn;
    this.isSpeakerOn ? this.playAudio() : this.stopAudio();
  }

}
