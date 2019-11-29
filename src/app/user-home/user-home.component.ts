import { Component, OnInit } from '@angular/core';
import { Posts, HttpserviceService } from '../httpservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  posts:Posts[]
  id:string
  posts1:Posts[]
  constructor(private httpClient:HttpserviceService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.httpClient.getPosts().subscribe(response=>{this.posts=response})
    this.id=this.route.snapshot.paramMap.get("userid")
    this.httpClient.getCandidate().subscribe(response=>{response.forEach(item=>{
      if(this.id==item.id)
      {
        this.posts1=item.selectedPosts
      }
    })})
  }
  apply(postid){
    this.httpClient.applyPosts(postid,this.id).subscribe(response=>{alert("Applied")})
  }
}
