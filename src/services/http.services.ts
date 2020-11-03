import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment as config } from '../environments/environment'

const BASE_URL = `http://${config.api.host}:${+config.api.port}`

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    constructor(
        private http: HttpClient
    ) { }

    get(id): Observable<any> {
        return this.http.get(`${BASE_URL}/${id}`)
    }

    post(id, data): Observable<any> {
        let body = { command: data }
        return this.http.post(`${BASE_URL}/${id}`, body, this.httpOptions)
    }

}