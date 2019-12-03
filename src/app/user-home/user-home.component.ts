import { Component, OnInit } from '@angular/core';
import { Posts, HttpserviceService } from '../httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  posts:Posts[]
  id:string
  posts1:Posts[]
  dxc:number
  posts2:Posts[]

  constructor(private httpClient:HttpserviceService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
  
    this.httpClient.getPosts().subscribe(response=>{this.posts=response})
    this.id=this.route.snapshot.paramMap.get("userid")
    this.httpClient.getCandidate().subscribe(response=>{response.forEach(item=>{
      if(this.id==item.id)
      { this.dxc=item.dxc
        this.posts1=item.selectedPosts
        this.posts2=item.appliedPosts
      }
    })

    console.log(this.posts)
    var posts7=Object.assign([],this.posts)
    posts7.forEach(item=>{
      console.log(item.id)
       if(item.vacancy==0)
       {
         console.log("new")
         this.posts.splice(this.posts.indexOf(item),1)
       }
   }) 

    console.log(this.posts)
    var posts5=Object.assign([],this.posts)
    posts5.forEach(item=>{
      console.log(item.id)
       this.posts1.forEach(item1=>{
        if(item1.id==item.id)
         { console.log("ok")
           this.posts.splice(this.posts.indexOf(item),1)
       }
       })
   }) 

   console.log(this.posts)
   var posts6=Object.assign([],this.posts)
   posts6.forEach(item=>{
     console.log(item.id)
      this.posts2.forEach(item1=>{
       if(item1.id==item.id)
        { console.log("ok")
          this.posts.splice(this.posts.indexOf(item),1)
      }
      })
  }) 
  })
    
  }
  apply(postid){
    this.httpClient.applyPosts(postid,this.id).subscribe(response=>{
     alert("Applied Successfully")
     var posts4=Object.assign([],this.posts)
    posts4.forEach(item=>{
      console.log(item.id)
      if(item.id==postid)
      {
        this.posts.splice(this.posts.indexOf(item),1)
      }
   }) 
    })
  }
}
