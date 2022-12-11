import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  @ViewChild('span1', {static: false}) inputRef : ElementRef;

  constructor(){
    setTimeout(() => {
      this.textAnimate();
    }, 1000);
  }

  textAnimate(){
    let text = this.inputRef.nativeElement.innerText;
    this.inputRef.nativeElement.innerText = ' ';
    let resultText = '';
    let i = 0;
      
    setInterval(() => {
      resultText = resultText + text[i];
      this.inputRef.nativeElement.innerText = resultText;
      if(i < text.length){
        i++;
      }
      else{
        this.inputRef.nativeElement.innerText = ' ';
        i=0;
        resultText = '';
      }
    },200);
  }
}
