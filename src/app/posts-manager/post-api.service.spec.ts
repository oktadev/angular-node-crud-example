import { TestBed, inject } from '@angular/core/testing';

import { PostAPIService } from './post-api.service';

describe('PostAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostAPIService]
    });
  });

  it('should be created', inject([PostAPIService], (service: PostAPIService) => {
    expect(service).toBeTruthy();
  }));
});
