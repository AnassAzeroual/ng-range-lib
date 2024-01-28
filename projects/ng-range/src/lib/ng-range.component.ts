import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-ng-range',
  template: `
  <div class="current-value-indicator">{{ currentValue }}</div>
    <div #canvasParent (mousedown)="onMouseDown($event)" (mousemove)="onMouseMove($event)" (mouseup)="onMouseUp($event)" (mouseleave)="onMouseLeave($event)">
      <canvas #rulerCanvas></canvas>
    </div>
  `,
  styles: [
    `
      div {
        position: relative;
        width: auto;
        height: 100px;
        border-radius: 5px;
        overflow: hidden;
      }

      .current-value-indicator {
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: #333;
      }

      canvas {
        cursor: grab;
      }
    `,
  ],
})
export class NgRangeComponent implements AfterViewInit {
  currentValue = 0;
  @ViewChild('rulerCanvas', { static: true }) rulerCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasParent', { static: true }) canvasParent!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;
  private minValue = 0;
  private maxValue = 100;
  private stepSize = 10;

  private isDragging = false;
  private dragStartX = 0;

  ngAfterViewInit(): void {
    this.context = this.rulerCanvas.nativeElement.getContext('2d')!;
    this.drawRuler();
  }

  drawRuler() {
    this.rulerCanvas.nativeElement.width = this.maxValue * 3;
    this.rulerCanvas.nativeElement.height = 50;

    // Clear the canvas
    this.context.clearRect(0, 0, this.rulerCanvas.nativeElement.width, this.rulerCanvas.nativeElement.height);

    // Draw ruler ticks and labels
    const numTicks = (this.maxValue - this.minValue) / this.stepSize;
    const tickSpacing = this.rulerCanvas.nativeElement.width / numTicks;

    this.context.fillStyle = '#333';
    this.context.font = '12px Arial';

    for (let i = 0; i <= numTicks; i++) {
      const tickX = i * tickSpacing;
      this.context.fillRect(tickX, 10, 2, 15);

      const label = this.minValue + i * this.stepSize;
      this.context.fillText(label.toString(), tickX - 10, 40);
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.canvasParent.nativeElement.style.cursor = 'grabbing';
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const offsetX = this.dragStartX - event.clientX;
      this.canvasParent.nativeElement.scrollLeft += offsetX;

      // Calculate and update the current value based on the scroll position
      const totalWidth = this.rulerCanvas.nativeElement.width - this.canvasParent.nativeElement.clientWidth;
      const scrollPercentage = (this.canvasParent.nativeElement.scrollLeft / totalWidth) || 0;
      this.currentValue = Math.round(this.minValue + scrollPercentage * (this.maxValue - this.minValue));

      this.dragStartX = event.clientX;
    }
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    this.canvasParent.nativeElement.style.cursor = 'grab';
  }

  onMouseLeave(event: MouseEvent) {
    this.isDragging = false;
    this.canvasParent.nativeElement.style.cursor = 'auto';
  }
}
