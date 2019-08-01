import { TestBed, inject } from '@angular/core/testing';

import { SelectMatchListService } from './select-match-list.service';

describe('SelectMatchListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectMatchListService]
    });
  });

  it('should be created', inject([SelectMatchListService], (service: SelectMatchListService) => {
    expect(service).toBeTruthy();
  }));
});
