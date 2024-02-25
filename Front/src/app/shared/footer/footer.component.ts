import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public image!:string;
  routerUrl !: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  isRoute(route: string){
    // // console.log('route ',route);
    // // console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}
