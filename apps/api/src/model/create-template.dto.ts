interface Game {
  gameUrl: string;
  img: string;
  game_name: string;
}

export class createTemplateDto {
  game_name: string;
  template_name: string;
  game: Game;
  userId: string;
}
