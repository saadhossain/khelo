import { Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';
@Controller('upload-new-game')
export class UtilsController {
  constructor(private utilsService: UtilsService) {}

  @Get()
  async uploadNewGame() {
    return this.utilsService.uploadGameToFirestore('tower');
  }
  @Get('clone')
  async uploadNewBundlingGame() {
    return this.utilsService.uploadBundlingGameToFirestore(
      'pac',
      'pacman',
      'pacman',
    );
  }
}
