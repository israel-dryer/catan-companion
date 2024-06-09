import {inject, Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  private storage = inject(StorageService);

  getCurrentItem(id: string) {
    return this.storage.current.get(id);
  }

  setCurrentItem(id: string, value: any) {
    return this.storage.current.put({id, value});
  }

  deleteCurrentItem(id: string) {
    return this.storage.current.delete(id);
  }

}
