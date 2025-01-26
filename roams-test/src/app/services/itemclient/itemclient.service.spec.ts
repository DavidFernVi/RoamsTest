import { TestBed } from '@angular/core/testing';

import { ItemclientService } from './itemclient.service';

describe('ItemclientService', () => {
  let service: ItemclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
