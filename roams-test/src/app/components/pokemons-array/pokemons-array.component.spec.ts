import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsArrayComponent } from './pokemons-array.component';

describe('PokemonsArrayComponent', () => {
  let component: PokemonsArrayComponent;
  let fixture: ComponentFixture<PokemonsArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsArrayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
