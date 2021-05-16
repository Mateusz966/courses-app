import { Module } from '@nestjs/common';
import { VimeoService } from './vimeo.service';

@Module({
  providers: [VimeoService],
  exports: [VimeoService]
})
export class VimeoModule {}
