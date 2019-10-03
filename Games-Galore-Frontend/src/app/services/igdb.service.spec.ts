import { TestBed } from '@angular/core/testing';

import { IGDBService } from './igdb.service';

describe('IGDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IGDBService = TestBed.get(IGDBService);
    expect(service).toBeTruthy();
  });
});
