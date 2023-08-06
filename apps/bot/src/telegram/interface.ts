export interface UserGame {
  id: string;
  game_name: string;
  img: string;
  gameUrl: string;
  category: string;
  likes: number;
  shares: number;
  plays: number;
  createdAt?: Date;
  private?: boolean;
  isLiked: boolean;
  userRef?: string;
  storage_id: string;
}

export interface Session {
  Back: string;
  next: string;
  store: {
    generate?: {
      title?: string;
      imageURL?: string;
    };
    clone?: {
      title: string;
      game_id: string;
      game_name: string;
      img: string;
    };
    games: UserGame[];
  };
}
