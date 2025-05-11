import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sunrise';
  
  ngOnInit() {
    // Set boxed layout as default
    document.body.classList.add('boxed');
    document.body.classList.remove('wide-layout');
    document.body.classList.remove('frame');
  }
}
