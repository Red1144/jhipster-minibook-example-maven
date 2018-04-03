import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Preference } from './preference.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Preference>;

@Injectable()
export class PreferenceService {

    private resourceUrl =  SERVER_API_URL + 'api/preferences';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/preferences';

    constructor(private http: HttpClient) { }

    create(preference: Preference): Observable<EntityResponseType> {
        const copy = this.convert(preference);
        return this.http.post<Preference>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(preference: Preference): Observable<EntityResponseType> {
        const copy = this.convert(preference);
        return this.http.put<Preference>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Preference>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Preference[]>> {
        const options = createRequestOption(req);
        return this.http.get<Preference[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Preference[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Preference[]>> {
        const options = createRequestOption(req);
        return this.http.get<Preference[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Preference[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Preference = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Preference[]>): HttpResponse<Preference[]> {
        const jsonResponse: Preference[] = res.body;
        const body: Preference[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Preference.
     */
    private convertItemFromServer(preference: Preference): Preference {
        const copy: Preference = Object.assign({}, preference);
        return copy;
    }

    /**
     * Convert a Preference to a JSON which can be sent to the server.
     */
    private convert(preference: Preference): Preference {
        const copy: Preference = Object.assign({}, preference);
        return copy;
    }
}
