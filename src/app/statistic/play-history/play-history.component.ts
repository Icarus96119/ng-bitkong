import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GameInfoService } from '../../core/services/game-info.service';
import { GameApiService } from '../../core/services/game-api.service';
import { statisticsTypes } from '../../core/data/statistics-types';

@Component({
  selector: 'bitkong-play-history',
  templateUrl: './play-history.component.html',
  styleUrls: ['./play-history.component.scss']
})
export class PlayHistoryComponent implements OnInit {

  @Input() selfClass: string;

  statisticsTypes = statisticsTypes;

  playCount = this.gameInfoService.playCount;
  wageredMoney = this.gameInfoService.wageredMoney;
  playLog = this.gameInfoService.playLog;
  currentStatistic = this.gameInfoService.currentStatistic;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private gameInfoService: GameInfoService,
    private gameApiService: GameApiService
  ) { }

  ngOnInit(): void {
    this.gameInfoService.playCount$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(playCount => {
      this.playCount = playCount;
    });
    this.gameInfoService.wageredMoney$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(wageredMoney => {
      this.wageredMoney = wageredMoney;
    });
    this.gameInfoService.playLog$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(playLog => {
      this.playLog = playLog;
    });
    this.gameInfoService.currentStatistic$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(async (currentStatistic) => {
      this.currentStatistic = currentStatistic;
      await this.goStatistics(this.currentStatistic);
    });
  }

  changeStatisticType(item) {
    this.gameInfoService.setCurrentStatistic(item);
  }

  async goStatistics(item) {
    const payload = {
      userId: this.gameApiService.userId,
      logType: this.currentStatistic.value
    };
    const playLog = await this.gameApiService.getPlayLog(payload).toPromise();
    this.gameInfoService.setPlayLog(playLog);
  }

}