import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GameInfoService } from '../../core/services/game-info.service';
import { GameApiService } from '../../core/services/game-api.service';
import { heroHallColumns, heroHallPeriodTypes } from '../../core/data/hero-hall-types';

@Component({
  selector: 'bitkong-hero-hall',
  templateUrl: './hero-hall.component.html',
  styleUrls: ['./hero-hall.component.scss']
})
export class HeroHallComponent implements OnInit {

  @Input() selfClass: string;

  currentPeriodType = this.gameInfoService.currentPeriodType;
  heroLog = this.gameInfoService.heroLog;

  heroHallColumns = heroHallColumns;
  heroHallPeriodTypes = heroHallPeriodTypes;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private gameInfoService: GameInfoService,
    private gameApiService: GameApiService
  ) { }

  ngOnInit(): void {
    this.gameInfoService.heroLog$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(heroLog => {
      this.heroLog = heroLog;
    });
    this.gameInfoService.currentPeriodType$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(async (currentPeriodType) => {
      this.currentPeriodType = currentPeriodType;
      await this.goHeroStatistics(this.currentPeriodType);
    });
  }

  periodChange(item) {
    this.gameInfoService.setCurrentPeriodType(item);
  }

  async goHeroStatistics(item) {
    const payload = {
      periodType: item
    };
    const heroLog = await this.gameApiService.getHeroLog(payload).toPromise();
    this.gameInfoService.setHeroLog(heroLog);
  }

}
