import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroService } from './hero.service';
import { EMPTY } from 'rxjs';
import { StoreModule } from '@ngrx/store';

describe('HeroService', () => {
  let service: HeroService;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, StoreModule.forRoot({})],
      declarations: [DashboardComponent]
    }).compileComponents();
    service = TestBed.inject(HeroService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  xit('should call getHeroes', () => {
    const spy = spyOn(service, 'getHeroes')
    // .and.callFake(() => {
    //   return EMPTY;
    // })
    component.ngOnInit()
    expect (component.heroes$.length).toBe(10)
  })
});
