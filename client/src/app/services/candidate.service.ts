import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CandidateService{
    constructor(public _http:Http){

    }

    getCandidates(){
        return this._http.get('/api/v1/candidates');
    }

    saveCandidate(candidate){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/candidate', JSON.stringify(candidate), {headers:headers})
            .map(res => res.json());
    }

    updateCandidate(candidate){
         var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/candidate/'+candidate._id, JSON.stringify(candidate), {headers:headers});
    }

    removeCandidate(id){
        return this._http.delete('/api/v1/candidate/'+id);  
    }

}