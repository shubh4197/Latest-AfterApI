import { Component, OnInit } from '@angular/core';
import { Candidates, HttpserviceService } from '../httpservice.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service'
@Component({
  selector: 'app-user-applied-post',
  templateUrl: './user-applied-post.component.html',
  styleUrls: ['./user-applied-post.component.css']
})
export class UserAppliedPostComponent implements OnInit {
  id:string
  list:Candidates[]
  candidate:Candidates
  dxc:string
  skills:string=""
  balance:number=0;
  type:string;
  addr:string
  constructor(private httpclient:HttpserviceService,private route:ActivatedRoute,private payment:PaymentService) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get("use")
    this.httpclient.getCandidate().subscribe(response=>{
      this.list=response

      console.log(this.list)
      this.list.forEach(item=>{
        if(this.id==item.id)
        { this.candidate=item
          console.log(this.candidate.address)
          this.addr=(this.candidate.address);
        }
      })
      this.candidate.skills.forEach(item=>{

        this.skills=this.skills+" "+item+" "
      })
     if(this.candidate.dxc==1)
    {
      this.dxc="DXC"
      this.balance=this.candidate.creditsEarned
      this.type="DXC"
    }
  else{
    this.dxc="Freelancer"
    this.type="FREE"
    this.balance=this.payment.checkBalance(this.addr)
  }})

  }

}
