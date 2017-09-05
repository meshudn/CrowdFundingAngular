import { TestBed, inject } from '@angular/core/testing';

import { PostDetailsService } from './post-details.service';

describe('PostDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostDetailsService]
    });
  });

  it('should be created', inject([PostDetailsService], (service: PostDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
