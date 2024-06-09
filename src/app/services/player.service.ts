import {inject, Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private storage = inject(StorageService);


  insertPlayer(player: string) {
    return this.storage.players.put({name: player, lastPlayed: Date.now()});
  }

  deletePlayer(id: string) {
    return this.storage.players.delete(id);
  }

  selectPlayers() {
    return this.storage.players.toCollection().toArray();
  }

  updatePlayer(player: string) {
    return this.storage.players.put({name: player, lastPlayed: Date.now()});
  }

}
