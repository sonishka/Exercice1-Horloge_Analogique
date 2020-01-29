import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, map, shareReplay, tap, distinctUntilChanged } from 'rxjs/operators';

const DEG_PAR_H = 360 / 12;
const DEG_PAR_MIN = 360 / 60;
const DEG_PAR_SEC = DEG_PAR_MIN;

@Component({
  selector: 'app-horloge',
  templateUrl: './horloge.component.html',
  styleUrls: ['./horloge.component.scss']
})
export class HorlogeComponent implements OnInit {

  destroy: Subject<void> = new Subject();
  Hdegres: Observable<number>;
  Mdegres: Observable<number>;
  Sdegres: Observable<number>;

  constructor() { }

  ngOnInit() {
   
    const date = interval(250).pipe( 
      takeUntil(this.destroy), 
      map(() => new Date()),
       shareReplay()
      );
   
    this.Hdegres = date.pipe(
      map(date => DEG_PAR_H * (date.getHours() % 12) - 90),
      distinctUntilChanged()
    );
    this.Mdegres = date.pipe(
      map(date => DEG_PAR_MIN * date.getMinutes() - 90),
      distinctUntilChanged()
    );
    this.Sdegres = date.pipe(
      map(date => DEG_PAR_SEC * date.getUTCSeconds() - 90),
      distinctUntilChanged()
    );
  }
  ngOnDestroy() {
    this.destroy.next();
  }
}