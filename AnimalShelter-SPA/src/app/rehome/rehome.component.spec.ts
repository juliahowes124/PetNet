/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RehomeComponent } from './rehome.component';

describe('RehomeComponent', () => {
  let component: RehomeComponent;
  let fixture: ComponentFixture<RehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
