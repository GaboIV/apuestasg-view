import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasVerificadasComponent } from './tareas-verificadas.component';

describe('TareasVerificadasComponent', () => {
  let component: TareasVerificadasComponent;
  let fixture: ComponentFixture<TareasVerificadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasVerificadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasVerificadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
