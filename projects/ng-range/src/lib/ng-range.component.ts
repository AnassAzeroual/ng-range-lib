import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-ng-range',
  template: `
    <div>
      <canvas #sliderCanvas
              (mousedown)="onMouseDown($event)"
              (touchstart)="onMouseDown($event)"
              width="300"
              height="30"></canvas>
    </div>
  `,
  styles: [
    `
    div {
      position: relative;
      width: 100%;
      height: 30px;
      background-color: #eee;
      border-radius: 5px;
      overflow: hidden;
    }

    canvas {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    `,
  ],
})
export class NgRangeComponent {
  @ViewChild('sliderCanvas', { static: true }) sliderCanvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;
  private minValue = 0;
  private maxValue = 100;
  private currentValue = 50;

  ngAfterViewInit(): void {
    this.context = this.sliderCanvas.nativeElement.getContext('2d')!;
    this.drawSlider();
  }

  drawSlider() {
    // Clear the canvas
    this.context.clearRect(0, 0, this.sliderCanvas.nativeElement.width, this.sliderCanvas.nativeElement.height);

    // Draw the slider track
    this.context.fillStyle = '#ddd';
    this.context.fillRect(0, 0, this.sliderCanvas.nativeElement.width, this.sliderCanvas.nativeElement.height);

    // Draw the roller at the current value
    const rollerPosition = (this.currentValue - this.minValue) / (this.maxValue - this.minValue) * this.sliderCanvas.nativeElement.width;
    this.context.fillStyle = '#3498db';
    this.context.beginPath();
    this.context.arc(rollerPosition, this.sliderCanvas.nativeElement.height / 2, 10, 0, 2 * Math.PI);
    this.context.fill();
  }

  onMouseDown(event: MouseEvent) {
    this.handleSliderMove(event);
    document.addEventListener('mousemove', this.handleSliderMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleSliderMove(event: MouseEvent) {
    const rect = this.sliderCanvas.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const newValue = (mouseX / this.sliderCanvas.nativeElement.width) * (this.maxValue - this.minValue) + this.minValue;
    this.currentValue = Math.max(this.minValue, Math.min(this.maxValue, newValue));
    this.drawSlider();
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleSliderMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
  }
}
