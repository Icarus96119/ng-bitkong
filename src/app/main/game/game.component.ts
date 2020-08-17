import { Component, OnInit } from '@angular/core';
import { GameLevel, GameStatus } from '../../core/models/game';

@Component({
  selector: 'bitkong-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  GameStatus = GameStatus;
  GameLevel = GameLevel;

  steps = new Array(10);
  stepItems = new Array(3);

  gameLevels = [GameLevel.Easy, GameLevel.Medium, GameLevel.Hard];
  currentGameLevel = GameLevel.Easy;
  currentGameStatus =  GameStatus.Zero;
  currentStep = 0;
  currentGameEarningAmount = 0;

  ngOnInit(): void {
  }

  playDemo() {
    this.currentGameStatus = GameStatus.Demo;
  }

  playReal() {
    this.currentGameStatus = GameStatus.Real;
  }

  playEnd() {
    this.currentGameStatus = GameStatus.Zero;
    this.currentStep = 0;
    this.currentGameEarningAmount = 0;
  }

  playBetting(step, index) {
    if (this.currentGameStatus === GameStatus.Zero || this.currentStep !== step) {
      return;
    }
    if (index == 0) {
      this.currentStep++;
      this.currentGameEarningAmount += 1200
    }
  }

  selectLevel(level) {
    this.currentGameLevel = level;
  }

}
