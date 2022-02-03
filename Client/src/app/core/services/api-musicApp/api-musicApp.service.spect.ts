import { TestBed, inject } from '@angular/core/testing';
import { ApiMusicAppService } from './api-musicApp.service';

describe('ApiMusicAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMusicAppService],
    });
  });
  it('should be created', inject(
    [ApiMusicAppService],
    (service: ApiMusicAppService) => {
      expect(service).toBeTruthy();
    }
  ));
});
