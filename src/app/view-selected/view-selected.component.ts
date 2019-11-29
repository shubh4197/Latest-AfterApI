import { Component, OnInit } from '@angular/core';
import { HttpserviceService, Candidates } from '../httpservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-selected',
  templateUrl: './view-selected.component.html',
  styleUrls: ['./view-selected.component.css']
})
export class ViewSelectedComponent implements OnInit {
  id:string
  candidate:Candidates[]
  constructor(private httpclient:HttpserviceService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get("po")
    this.httpclient.getPosts1(this.id).subscribe(response=>{
      this.candidate=response.selectedCandidates
    })
  }

}
