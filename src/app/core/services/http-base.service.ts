import { Injectable } from '@angular/core';

const API_URI: string = 'https://api.themoviedb.org/3';
const REQ_AUTH: string =
  '?api_key=2bc5c3fe56239fcb0a4bd569da6534c2&language=it&append_to_response=images&include_image_language=it,en,null';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  constructor() {}

  /**
   * Costruisce la richiesta completa per accedere alle API
   * @param endpoint endpoint a cui accedere
   * @param queryParams parametri aggiuntivi da passare
   * @returns stringa con la richiesta completa
   */
  buildApiRequest(endpoint: string, queryParams?: string) {
    return `${API_URI}/${endpoint}${REQ_AUTH}${queryParams ?? ''}`;
  }
}
