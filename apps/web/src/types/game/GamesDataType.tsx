export interface GamesDataType {
  id: string;
  game_name: string;
  img: string;
  gameUrl: string;
  category: string;
  likes: number;
  shares: number;
  comments: number;
  plays: number;
  createdAt: Date;
  private: boolean;
  user_id: string;
  isLiked?: boolean;
  isPlayed?: boolean;
  isShared?: boolean;
  userRef: string;
  storage_id?:string;
  assetId:string
}
