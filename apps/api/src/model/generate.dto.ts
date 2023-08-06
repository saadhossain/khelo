export class Assets {
  image_name: string;
  image_file: string;
}

export class GameAssets {
  game_name: string;
  game_assets: Assets[];
}
export class GenerateGame {
  game_title: string;
  user_id: string;
  game_img_url?: string;
  game_name?: string;
  img?: string;
}
