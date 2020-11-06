import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs';

import {
  ConfirmGameRequest,
  ConfirmGameResponse,
  BitkongSetting,
  HashArrayRequest,
  HashArrayResponse,
  VerifyDataResponse,
  VerifyDataRequest, ResumeDataRequest, ResumeDataResponse
} from '../models/game';
import { HeroLog, PlayLog } from '../models/statistics';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  userId: string;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.userId = this.localStorage.get(environment.localStorage.userId);
  }

  getUserMoney(): Observable<number> {
    const url = `${environment.api}/get_game_money`;
    const payload = { userId: this.userId };
    return this.http.post<any>(url, payload);
  }

  getPlayCount(): Observable<number> {
    const url = `${environment.api}/get_play_count`;
    return this.http.get<any>(url);
  }

  getWageredMoney(): Observable<number> {
    const url = `${environment.api}/get_wagered_money`;
    return this.http.get<any>(url);
  }

  getPlayLog(payload: any): Observable<Array<PlayLog>> {
    const url = `${environment.api}/get_play_log`;
    return this.http.post<Array<PlayLog>>(url, payload);
  }

  getHeroLog(payload: any): Observable<Array<HeroLog>> {
    const url = `${environment.api}/get_hero_log`;
    return this.http.post<Array<HeroLog>>(url, payload);
  }

  setUserMoney(payload: any): Observable<any> {
    const url = `${environment.api}/set_game_money`;
    return this.http.post<any>(url, payload);
  }

  getGameSettings(): Observable<Array<BitkongSetting>> {
    const url = `${environment.api}/get_game_settings`;
    return this.http.get<Array<BitkongSetting>>(url);
  }

  makeHashArray(payload: HashArrayRequest): Observable<HashArrayResponse> {
    const url = `${environment.api}/make_hash_array`;
    return this.http.post<HashArrayResponse>(url, payload);
  }

  confirmGame(payload: ConfirmGameRequest): Observable<ConfirmGameResponse> {
    const url = `${environment.api}/confirm_game`;
    return this.http.post<ConfirmGameResponse>(url, payload);
  }

  getVerifyData(payload: VerifyDataRequest): Observable<VerifyDataResponse> {
    const url = `${environment.api}/get_verify_data`;
    return this.http.post<ConfirmGameResponse>(url, payload);
  }

  getResumeData(payload: ResumeDataRequest): Observable<ResumeDataResponse> {
    const url = `${environment.api}/get_resume_game_data`;
    return this.http.post<ResumeDataResponse>(url, payload);
  }
}
