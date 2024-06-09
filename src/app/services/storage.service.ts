import { Injectable } from '@angular/core';
import Dexie, {Table} from "dexie";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  db: AppDb;

  constructor() {
    this.db = new AppDb()
  }

  get games() {
    return this.db.games;
  }

  get players() {
    return this.db.players;
  }

  get settings() {
    return this.db.settings;
  }

  get current() {
    return this.db.current;
  }
}

export interface Game {
  id: number;
  completed?: Date;
  winner?: string;
  roster: string[];
  rolls: Roll[];
  turnIndex: number
}

export interface Roll {
  id: number;
  dice1: number;
  dice2: number;
  total: number;
  player: string;
  timestamp: number;
}

export interface Player {
  name: string,
  lastPlayed: number
}

export interface Settings {
  id: string;
  value: any
}

export interface Current {
  id: string,
  value: any
}

export class AppDb extends Dexie {
  games!: Table<Game, number>;
  players!: Table<Player, string>;
  settings!: Table<Settings, string>
  current!: Table<Current, string>

  constructor() {
    super('CatanCompanion');
    this.version(1).stores({
      games: '++id, winner',
      players: '++name',
      settings: '++id',
      current: '++id'
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    this.settings.bulkAdd([
      {id: 'rollingDiceSoundEnabled', value: true},
      {id: 'robberLaughSoundEnabled', value: true},
      {id: 'hapticsEnabled', value: true},
      {id: 'showDiceTotal', value: true},
      {id: 'speechAvailable', value: false},
      {id: 'speechEnabled', value: false},
      {id: 'speechVoice', value: {name: 'Default', index: 0}}
    ]);
  }

}
