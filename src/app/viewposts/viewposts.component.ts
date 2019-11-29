import { Component, OnInit } from '@angular/core';
import { Posts, HttpserviceService, Candidates } from '../httpservice.service';
//import { ConsoleReporter } from 'jasmine';
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'app-viewposts',
  templateUrl: './viewposts.component.html',
  styleUrls: ['./viewposts.component.css']
})
export class ViewpostsComponent implements OnInit {
  posts:Posts[]
  selected:Candidates[]
  projectName:string
  constructor(private httpclient:HttpserviceService,private payment:PaymentService) { }

  ngOnInit() {
    this.httpclient.getPosts().subscribe(response=>{this.posts=response})
  }
pay(id){

this.httpclient.getPosts1(id).subscribe(response=>{
this.selected=response.selectedCandidates;
console.log(this.selected.length)
let from= this.payment.payer;
let price=response.price*90445343385899;
if(price*this.selected.length>this.payment.checkBalance(from)){
this.selected.forEach(item=>{
  if(item.dxc==0)

  this.payment.makePayment(this.payment.payer,item.address,price)})
  this.close(id)
}
else{
  alert("No sufficient balance, Can't close project")
}
})

}
close(id){

this.httpclient.getPosts1(id).subscribe(response=>{
this.selected=response.selectedCandidates;
console.log(this.selected.length)
let from= this.payment.payer;
let price=response.price;
this.projectName=response.projectname;
if(price*this.selected.length<this.payment.checkBalance(from)){
this.selected.forEach(item=>{
  if(item.dxc==0)
 { this.payment.makePayment(this.payment.payer,item.address,price)
this.paymentMail(item.name,item.username,price,this.projectName,(price/1000000000000000000))}
else{
  this.creditMail(item.name,item.username,response.credits,response.projectname)
}
}

  )


  //this.close(id)
  this.httpclient.closePosts(id).subscribe(response=>{

    this.posts=this.posts.filter(u=>u.id!==id)
    }
    )
}
else{
  alert('No sufficient balance;')
}
})


}
paymentMail(n,e,p,pr,eth){
let user={
  name: n,
  email: e,
  subject: "Payment Received :)",
  Message: "",
}
user.Message=`<h3>Hi ${user.name},</h3><br><p>Payment of <strong>Rs.${p}(${eth} ETH)</strong> for the project-<strong>${pr}</strong> has been succesfully done :)<br>`
this.httpclient.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log(
          `Mail Sent`
        );
      },
      err => {
        console.log(err);
      }
    );
}
creditMail(n,e,p,pr){
  let user={
    name: n,
    email: e,
    subject: "Credits added :)",
    Message: "",
  }
  user.Message=`<h3>Hi ${user.name},</h3><br><p>Your account has been credited with ${p} credit points for the project ${pr}<br>`
  this.httpclient.sendEmail("http://localhost:3000/sendmail", user).subscribe(
        data => {
          let res: any = data;
          console.log(
            `Mail Sent`
          );
        },
        err => {
          console.log(err);
        }
      );
  }
  
}
