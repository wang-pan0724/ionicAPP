import { Component, OnInit,Input, Output, EventEmitter,HostListener,ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @ViewChild('modal') modal:ElementRef;
  @Output() public modelChange = new EventEmitter();
  @Input() value;
  @Input() min: number;
  @Input() max: number;
  public offsetXStart:number;
  public sliderWidth:number;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    console.log(this.modal)
    this.sliderWidth = this.modal.nativeElement.offsetWidth;
    this.offsetXStart = (window.innerWidth - this.modal.nativeElement.offsetWidth)/2;
    this.setStyle();
  }

  setStyle(){
    var width = (this.value-this.min)/(this.max -this.min)*this.sliderWidth + '';
    this.modal.nativeElement.querySelector('.slider-view').style.width = Number.parseInt(width)+'px';
  }

  movePercent(event){
    let clientx = event.changedTouches[0].clientX-this.offsetXStart
    if(clientx >= this.sliderWidth){
      this.modal.nativeElement.querySelector('.slider-view').style.width = this.sliderWidth+'px';
      this.value = this.max;
    }else if(0>=clientx){
      this.modal.nativeElement.querySelector('.slider-view').style.width = 0+'px';
      this.value = this.min;
    }else{
      let clientxPercent = clientx/this.sliderWidth;
      this.modal.nativeElement.querySelector('.slider-view').style.width = clientx+'px';
      this.value = ((this.max -this.min)*clientxPercent+this.min).toFixed(2);
    }

    this.modelChange.emit(this.value)
  }

  // 点击事件
  @HostListener('touchstart', ['$event']) OnTouchStart(event) {
    this.movePercent(event)
  }
  // 监听移动事件事件
  @HostListener('touchmove', ['$event']) OnTouchMove(event) {
    this.movePercent(event)
  }

  // 监听离开事件
  @HostListener('touchend', ['$event']) OnTouchEnd(event) {
    this.movePercent(event)
  }

}
