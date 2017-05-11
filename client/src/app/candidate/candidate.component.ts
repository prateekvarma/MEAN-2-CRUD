import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'candidate-tag',
  templateUrl: './candidate.component.html'
})

export class CandidateComponent implements OnInit {
  candidates: any[];
  constructor(private _candidateService:CandidateService){

  }

  ngOnInit(){
      this.candidates = [];
      this._candidateService.getCandidates()
      .map(res => res.json())
      .subscribe(candidates => this.candidates = candidates)
  }

  addCandidate($event, Cname, Cage, Ccountry){
      if($event.which === 1){
        var result;
        var newCandidate = {
          name: Cname.value,
          age: Cage.value,
          country: Ccountry.value,   
        };
        result = this._candidateService.saveCandidate(newCandidate);
        result.subscribe(x => {
            this.candidates.push(newCandidate)
            Cname.value = '';
            Cage.value = '';
            Ccountry.value = '';
        })
      }
  }

  setEditState(candidate, state){
    if(state){
      candidate.isEditMode = state;
    }
    else{
      delete candidate.isEditMode;
    }
}

updateCandidateName($event, candidate){
  if($event.which === 13){
    candidate.name = $event.target.value;
    var _candidate = {
      _id: candidate._id,
      name: candidate.name,
      age: candidate.age,
      country: candidate.country
    };
    this._candidateService.updateCandidate(_candidate)
    .map(res => res.json())
    .subscribe( data => {
      this.setEditState(candidate, false);
    });
       
    }
  }
  
  

updateCandidateAge($event, candidate){
  
  if($event.which === 13){

    candidate.age = $event.target.value;
    var _candidate = {
      _id: candidate._id,
      name: candidate.name,
      age: candidate.age,
      country: candidate.country
    };
    this._candidateService.updateCandidate(_candidate)
    .map(res => res.json())
    .subscribe( data => {
      this.setEditState(candidate, false);
    });
  }
  
}

updateCandidateCountry($event, candidate){
  
  if($event.which === 13){
    
    candidate.country = $event.target.value;
    var _candidate = {
      _id: candidate._id,
      name: candidate.name,
      age: candidate.age,
      country: candidate.country
    };
    this._candidateService.updateCandidate(_candidate)
    .map(res => res.json())
    .subscribe( data => {
      this.setEditState(candidate, false);
    });
  }
  
}

deleteCandidate(candidate){
  var candidates = this.candidates;

  this._candidateService.removeCandidate(candidate._id)
  .map(res => res.json())
  .subscribe(data => {
    if(data.n == 1){
      for(var i = 0; i < candidates.length; i++){
        if(candidates[i]._id == candidate._id){
          candidates.splice(i, 1);
        }
      }
    }
  })
}


  title = 'List of candidates';
}


