import { Component, OnInit } from '@angular/core';
import { Candidates, HttpserviceService } from '../httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { userInfo } from 'os';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  candidate:Candidates
  list:Candidates[]
  id:string
  dxc:string
  skills:string=""
  id1:string
  constructor(private httpclient:HttpserviceService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get("bounce")
    this.id1=this.route.snapshot.paramMap.get("yulu")
    this.httpclient.getCandidate().subscribe(response=>{
    this.list=response
    this.list.forEach(item=>{
      if(this.id==item.id)
      {
        this.candidate=item
      }

    })
    this.candidate.skills.forEach(item=>{

      this.skills=this.skills+" "+item+" "
    })
    if(this.candidate.dxc==1)
    {
      this.dxc="DXC"
    }
    else
    {
      this.dxc="Freelancer"
    }
    })
  }

  accept(){
    this.httpclient.acceptPosts(this.id1,this.id).subscribe(response=>{
      console.log(response);
      this.accept_mail(response.projectname.toString());
     alert("accepted")

     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["viewposts"]);
  });
    })
  }

  decline(){
    this.httpclient.declinePosts(this.id1,this.id).subscribe(response=>{
      this.decline_mail(response.projectname)
      alert("decline")
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["viewposts"]);
    });
     })
  }
  accept_mail(a) {
      let user = {
        name: this.candidate.name,
        email: this.candidate.username,
        subject:"Application Accepted",
        Message:"",
    pname:a
      }
    user.Message=`<h3>Hi ${user.name},</h3><br><p>We are glad to inform you that you have been selected for the project:'${user.pname}'.<br>Congratulations!! :) :) :)</p>`;
      this.httpclient.sendEmail("http://localhost:3000/sendmail", user).subscribe(
        data => {
          let res:any = data;
          console.log(
            `Mail Sent`
          );
        },
        err => {
          console.log(err);
       }
      );
    }
    decline_mail(a) {
        let user = {
          name: this.candidate.name,
          email: this.candidate.username,
          subject:"Application Declined",
          Message:"",
      pname:a
        }
      user.Message=`<h3>Hi ${user.name},</h3><br><p>We are sorry to inform you that your name havs been dropped for the project:'${user.pname}'.<br><br>Stay tuned to our page for further project updates.</p>`;
        this.httpclient.sendEmail("http://localhost:3000/sendmail", user).subscribe(
          data => {
            let res:any = data;
            console.log(
              `Mail Sent`
            );
          },
          err => {
            console.log(err);
         }
        );
      }

}
