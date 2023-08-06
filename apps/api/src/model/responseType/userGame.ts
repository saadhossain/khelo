import { DocumentReference } from 'firebase-admin/firestore';

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
  userRef?: DocumentReference;
  storage_id: string;
}

export interface UserCloneGameStatus {
  status: 'Task complected';
  data: UserGame;
}
