import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { GameApiService } from '../../core/services/game-api.service';
import { GameInfoService } from '../../core/services/game-info.service';
import { ToastrService } from '../../core/services/toastr.service';
import { BitkongSetting, GameLevel, GamePlayResult, GameSoundType, GameType } from '../../core/models/game';
import { enumToOptions } from '../../core/utils/enum.util';
import { AlertService } from '../../ui-kit/alert/alert.service';

@Component({
  selector: 'bitkong-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  Math = Math;
  GameType = GameType;
  GamePlayResult = GamePlayResult;

  isLoading = this.gameInfoService.isLoading;
  gameMoney =  this.gameInfoService.gameMoney;
  gameSettings = this.gameInfoService.gameSettings;

  stepColumnCounts: Array<any>;
  stepLogs: Array<number>;
  isSuccessTable: Array<any>;
  isFailTable: Array<any>;
  waitingTable: Array<any>;

  currentGameSetting: BitkongSetting;
  currentGameLevel = GameLevel.Easy;
  currentGameType =  GameType.Zero;
  currentStep = 0;
  stepCounts = 1;
  currentGameEarningAmount = 0;
  isConfirmTicketOpened = false;
  basicBettingMoney: number;
  gameLevels = enumToOptions<GameLevel>(GameLevel);
  deltaAmount = 0;

  isFirst = true;
  isStart = false;
  isEnd = false;

  hashStr = null;
  nextHashStr = null;
  clientSeed = null;
  nextClientSeed = null;
  serverSeed = null;
  gameNumber = null;
  result = null;

  clickSound = null;
  lostSound = null;
  winSound = null;
  successSound = null;

  dialogTitle = null;
  dialogContent = null;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private gameInfoService: GameInfoService,
    private gameApiService: GameApiService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) {
    this.gameInfoService.initAllInfo().then();
    this.initSound().then();
  }

  ngOnInit(): void {
    this.gameInfoService.isLoading$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.gameInfoService.gameMoney$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(gameMoney => {
      this.gameMoney = gameMoney;
    });
    this.gameInfoService.gameSettings$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(gameSettings => {
      this.gameSettings = gameSettings;
      if (this.gameSettings) {
       this.baseSetting();
      }
    });
    this.checkResumeGame().then(() => {});
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async playSound(soundType: GameSoundType) {
    switch (soundType) {
      case GameSoundType.Click:
        this.clickSound.currentTime = 0;
        this.clickSound.play();
        break;
      case GameSoundType.Lost:
        this.lostSound.currentTime = 0;
        this.lostSound.play();
        break;
      case GameSoundType.Win:
        this.winSound.currentTime = 0;
        this.winSound.play();
        break;
      case GameSoundType.Success:
        this.successSound.currentTime = 0;
        this.successSound.play();
        break;
    }
  }

  async initSound() {
    this.clickSound = new Audio();
    this.clickSound.src = '/themes/rubids/game/bitkong/assets/sound/click.mp3';
    await this.clickSound.load();

    this.lostSound = new Audio();
    this.lostSound.src = '/themes/rubids/game/bitkong/assets/sound/lost.mp3';
    await this.lostSound.load();

    this.winSound = new Audio();
    this.winSound.src = '/themes/rubids/game/bitkong/assets/sound/win.mp3';
    await this.winSound.load();

    this.successSound = new Audio();
    this.successSound.src = '/themes/rubids/game/bitkong/assets/sound/success.mp3';
    await this.successSound.load();

    this.clickSound.volume = this.lostSound.volume = this.winSound.volume = this.successSound.volume = 1;
  }

  async play(gameType) {
    await this.playSound(GameSoundType.Click);
    this.currentGameType = gameType;
    if (this.currentGameType ===  GameType.Real && this.gameMoney < this.basicBettingMoney) {
      this.toastr.danger(`You don't have enough coin.`, 'Coin');
      return;
    }
    this.isStart = true;
    try {
      this.gameInfoService.setIsLoading(true);
      const payload = {
        userId: this.gameApiService.userId,
        isFirst: this.isFirst,
        isStart: this.isStart,
        level: this.currentGameLevel,
        gameType: this.currentGameType,
        basicBettingMoney: this.basicBettingMoney
      }
      const result = await this.gameApiService.makeHashArray(payload).toPromise();
      if (result.resume) {
        await this.resumeGame();
      } else {
        this.hashStr = result.currentData.hashStr;
        this.nextHashStr = result.nextData.hashStr;
        this.clientSeed = result.currentData.clientSeed;
        this.nextClientSeed = result.nextData.clientSeed;
        this.stepLogs[this.stepCounts] = 1;
        this.isFirst = false;
      }
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to play');
    } finally {
      this.isLoading = false;
    }
  }

  async checkResumeGame() {
    try {
      this.gameInfoService.setIsLoading(true);
      const payload = {
        userId: this.gameApiService.userId,
        isFirst: this.isFirst,
        isStart: this.isStart,
        level: this.currentGameLevel,
        gameType: this.currentGameType,
        basicBettingMoney: 0
      }
      const result = await this.gameApiService.makeHashArray(payload).toPromise();
      if (result.resume) {
        await this.resumeGame();
      }
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to play');
    } finally {
      this.isLoading = false;
    }
  }

  initTable() {
    return this.currentGameSetting.rules.map(() => Array<any>(this.stepColumnCounts).fill(0));
  }

  async confirm(step, selectedChild) {
    const amount = Math.ceil(this.basicBettingMoney * Math.pow(this.currentGameSetting.bettingRatio, step + 1));
    if (this.stepLogs[this.stepCounts - step]) {
      try {
        this.gameInfoService.setIsLoading(true);
        this.currentStep = step;
        const payload = {
          userId: Number(this.gameApiService.userId),
          step: step,
          selectedChild: selectedChild,
          amount: amount,
          level: this.currentGameLevel,
          hashStr: this.hashStr,
          gameType: this.currentGameType,
          basicBettingMoney: this.basicBettingMoney
        }
        const result = await this.gameApiService.confirmGame(payload).toPromise();
        switch (result.message) {
          case GamePlayResult.Pass:
            await this.playSound(GameSoundType.Win);
            this.isSuccessTable[step][selectedChild] = 1;
            this.isStart = true;
            this.stepLogs[this.stepCounts - step] = 0;
            this.stepLogs[this.stepCounts - step - 1] = 1;
            this.currentGameEarningAmount = amount;
            this.dialogTitle = GamePlayResult.Congratulation;
            this.dialogContent = this.currentGameEarningAmount;
            if (this.stepCounts === step) {
              await this.playEnd(this.currentGameEarningAmount, GamePlayResult.Success);
            }
            break;
          case GamePlayResult.Fail:
            await this.playSound(GameSoundType.Lost);
            this.dialogTitle = GamePlayResult.End;
            this.dialogContent = 0;
            await this.playEnd(0, GamePlayResult.End);
            this.stepLogs[this.stepCounts - step] = 0;
            this.isFailTable[step][selectedChild] = 1;
            break;
          case GamePlayResult.End:
            break;
          case GamePlayResult.Update:
            await this.playSound(GameSoundType.Win);
            this.isSuccessTable = this.initTable();
            const midResult = [...result.midResult];
            midResult.forEach((item, index) => {
              this.isSuccessTable[index][Number(item)] = 1;
            });
            this.currentGameEarningAmount = result.midAmount;
            this.isStart = true;
            this.stepLogs[this.stepCounts - step] = 0;
            this.stepLogs[this.stepCounts - result.midResult.length] = 1;
            this.currentStep = result.midResult.length - 1;
            this.dialogTitle = GamePlayResult.Congratulation;
            this.dialogContent = this.currentGameEarningAmount;
            break;
        }
      } catch (e) {
        this.toastr.error(e, 'Sorry, failed to play');
      } finally {
        this.isLoading = false;
      }
    }
  }

  async playEnd(amount: number, status: GamePlayResult = null) {
    if (amount > 0) {
      this.dialogTitle = GamePlayResult.Congratulation;
      this.dialogContent = amount;
      this.successSound.play();
    }

    if (amount === 0 && status === GamePlayResult.End) {
      this.dialogTitle = GamePlayResult.End;
      this.dialogContent = 0;
    }
    this.deltaAmount = amount - this.basicBettingMoney;

    await this.playSound(GameSoundType.Click);
    try {
      this.gameInfoService.setIsLoading(true);
      const payload = {
        userId: Number(this.gameApiService.userId),
        amount: amount,
        hashStr: this.hashStr,
        step: this.currentStep
      };
      const result = await this.gameApiService.getVerifyData(payload).toPromise();
      if (result.message === GamePlayResult.End) {
        this.serverSeed = result.serverSeed;
        this.gameNumber = result.gameNumber;
        this.result = result.result;
        if (result.tryAgain !== "") {
          this.isFailTable[result.step][result.tryAgain[result.step]] = 1;
        }
        await this.endOperation();
      } else if(result.message === GamePlayResult.Update) {
        this.isSuccessTable = this.initTable();
        const midResult = [...result.midResult];
        midResult.forEach((item, index) => {
          this.isSuccessTable[index][Number(item)] = 1;
        });
        this.currentGameEarningAmount = result.midAmount;
        this.isStart = true;
        if (this.currentStep === 0) {
          this.stepLogs[this.stepCounts] = 0;
        } else {
          this.stepLogs[this.stepCounts - this.currentStep - 1] = 0;
        }
        this.stepLogs[this.stepCounts - result.midResult.length] = 1;
        this.currentStep = result.midResult.length - 1;
      }
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to play');
    } finally {
      this.isLoading = false;
    }
  }

  async endOperation() {
    await this.updateGameMoney();
    this.isSuccessTable = this.initTable();
    const buffer = this.result;
    if (this.currentGameLevel === GameLevel.Easy) {
      for (let i = 0; i < buffer.length; i++) {
        for (let j = 0; j < this.currentGameSetting.columnCount; j++) {
          if (j !== Number(buffer[i])) {
            this.isSuccessTable[i][j] = 1;
          }
        }
      }
    } else {
      for (let i = 0; i < buffer.length; i++) {
        this.isSuccessTable[i][Number(buffer[i])] = 1;
      }
    }

    this.stepLogs.fill(0);

    this.waitingTable = this.initTable();
    this.isStart = false;
    this.isEnd = true;
    this.alertService.showDialog(this.dialogTitle, this.dialogContent)
      .pipe(filter(s => s))
      .subscribe(async () => {
        this.baseSetting();
      });
  }

  async updateGameMoney() {
    this.gameInfoService.setPlayCount(1, true);
    if (this.currentGameType !== GameType.Real) {
      return;
    }
    try {
      this.gameInfoService.setIsLoading(true);
      const payload = {
        userId: Number(this.gameApiService.userId),
        deltaAmount: this.deltaAmount
      };
      const result = await this.gameApiService.setUserMoney(payload).toPromise();
      this.gameInfoService.setGameMoney(result);
      this.gameInfoService.setWageredMoney(this.basicBettingMoney, true);
      this.gameInfoService.setCurrentStatistic(this.gameInfoService.currentStatistic);
      this.gameInfoService.setCurrentPeriodType(this.gameInfoService.currentPeriodType);
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to play');
    } finally {
      this.isLoading = false;
    }
  }

  baseSetting() {
    this.currentGameSetting = this.gameSettings.find(setting => setting.difficulty === this.currentGameLevel);
    this.stepCounts = this.currentGameSetting.rules.length - 1;
    this.stepColumnCounts = new Array<any>(this.currentGameSetting.columnCount);
    this.stepLogs = new Array<number>(this.currentGameSetting.rules.length).fill(0);
    if (!this.basicBettingMoney) {
      this.basicBettingMoney = Number(this.currentGameSetting.minMoney);
    }
    this.currentStep = 0;
    this.currentGameEarningAmount = 0;
    this.deltaAmount = 0;
    this.isEnd = false;
    this.isSuccessTable = this.initTable();
    this.isFailTable = this.initTable();
    this.waitingTable = this.initTable();
  }

  selectLevel(level) {
    this.currentGameLevel = level;
    this.baseSetting();
  }

  openConfirmTicket() {
    this.isConfirmTicketOpened = !this.isConfirmTicketOpened;
  }

  async resumeGame() {
    try {
      this.gameInfoService.setIsLoading(true);
      const payload = {
        userId: Number(this.gameApiService.userId),
      };
      const result = await this.gameApiService.getResumeData(payload).toPromise();
      this.currentGameLevel = result.current.gameSetting.level;
      if (result.isNew) {
        this.baseSetting();
        return;
      }
      this.baseSetting();
      this.isFirst = false;
      this.isStart = true;
      this.hashStr = result.current.gameSetting.hashStr;
      this.nextHashStr = result.next.hashStr;
      this.clientSeed = result.current.gameSetting.clientSeed;
      this.nextClientSeed = result.next.hashStr;
      this.currentGameType = result.current.gameType;
      this.stepLogs[this.stepCounts - result.current.step] = 1;
      this.currentGameEarningAmount = result.current.amount;
      this.currentStep = result.current.step - 1;
      this.isSuccessTable = this.initTable();
      this.isFailTable = this.initTable();
      this.waitingTable = this.initTable();
      if (result.current.stepLog) {
        for (let i = 0; i < result.current.stepLog.length; i++) {
          this.isSuccessTable[i][result.current.stepLog[i]] = 1;
        }
      }
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to play');
    } finally {
      this.isLoading = false;
    }
  }

  closeDialog() {
    this.alertService.closeDialog();
  }

}
