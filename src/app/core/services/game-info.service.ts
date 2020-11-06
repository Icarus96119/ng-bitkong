import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GameApiService } from './game-api.service';
import { BitkongSetting } from '../models/game';
import { HeroLog, PlayLog } from '../models/statistics';
import { HeroHallPeriodType } from '../models/heroHall';
import { statisticsTypes } from '../data/statistics-types';

@Injectable({
  providedIn: 'root'
})
export class GameInfoService {

  isLoading: boolean;
  gameMoney: number;
  playCount: number;
  wageredMoney: number;
  gameSettings: Array<BitkongSetting>;
  currentStatistic: any;
  currentPeriodType: HeroHallPeriodType;
  playLog: Array<PlayLog>;
  heroLog: Array<HeroLog>;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoading);
  gameMoney$: BehaviorSubject<number> = new BehaviorSubject<number>(this.gameMoney);
  playCount$: BehaviorSubject<number> = new BehaviorSubject<number>(this.playCount);
  wageredMoney$: BehaviorSubject<number> = new BehaviorSubject<number>(this.wageredMoney);
  currentStatistic$: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentStatistic);
  currentPeriodType$: BehaviorSubject<HeroHallPeriodType> = new BehaviorSubject<HeroHallPeriodType>(this.currentPeriodType);
  gameSettings$: BehaviorSubject<Array<BitkongSetting>> = new BehaviorSubject<Array<BitkongSetting>>(this.gameSettings);
  playLog$: BehaviorSubject<Array<PlayLog>> = new BehaviorSubject<Array<PlayLog>>(this.playLog);
  heroLog$: BehaviorSubject<Array<HeroLog>> = new BehaviorSubject<Array<HeroLog>>(this.heroLog);

  constructor(
    private gameApiService: GameApiService
  ) {}

  setGameMoney(amount) {
    this.gameMoney = amount;
    this.gameMoney$.next(this.gameMoney);
  }

  setCurrentStatistic(currentStatistic) {
    this.currentStatistic = currentStatistic;
    this.currentStatistic$.next(this.currentStatistic);
  }

  setCurrentPeriodType(currentPeriodType) {
    this.currentPeriodType = currentPeriodType;
    this.currentPeriodType$.next(this.currentPeriodType);
  }

  setGameSettings(settings) {
    this.gameSettings = settings;
    this.gameSettings$.next(this.gameSettings);
  }

  setPlayLog(playLog) {
    this.playLog = playLog;
    this.playLog$.next(this.playLog);
  }

  setHeroLog(heroLog) {
    this.heroLog = heroLog;
    this.heroLog$.next(this.heroLog);
  }

  setPlayCount(playCount, isAdd:boolean = null) {
    if (isAdd) {
      this.playCount += playCount;
    } else {
      this.playCount = playCount
    }
    this.playCount$.next(this.playCount);
  }

  setWageredMoney(wageredMoney, isAdd:boolean = null) {
    if (isAdd) {
      this.wageredMoney += wageredMoney;
    } else {
      this.wageredMoney = wageredMoney
    }
    this.wageredMoney$.next(this.wageredMoney);
  }
  
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
    this.isLoading$.next(this.isLoading);
  }

  async initAllInfo() {
    this.setIsLoading(true);
    this.setCurrentStatistic(statisticsTypes[0]);
    this.setCurrentPeriodType(HeroHallPeriodType.Daily);
    this.setPlayLog([]);
    this.setHeroLog([]);
    const gameMoney = await this.gameApiService.getUserMoney().toPromise();
    this.setGameMoney(gameMoney);
    const gameSettings = await this.gameApiService.getGameSettings().toPromise();
    this.setGameSettings(gameSettings);
    const playCount = await this.gameApiService.getPlayCount().toPromise();
    this.setPlayCount(playCount);
    const wageredMoney = await this.gameApiService.getWageredMoney().toPromise();
    this.setWageredMoney(wageredMoney);
    this.setIsLoading(false);
  }

}
