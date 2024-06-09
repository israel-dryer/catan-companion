import {inject, Injectable} from '@angular/core';
import {Game, StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private storage = inject(StorageService);

  insertGame(game: Game) {
    return this.storage.games.put(game);
  }

  deleteGame(id: number) {
    return this.storage.games.delete(id);
  }

  updateGame(game: Game) {
    return this.storage.games.put(game)
  }

  selectGame(id: number) {
    return this.storage.games.get(id);
  }

  selectGames() {
    return this.storage.games.toCollection().toArray();
  }

}
