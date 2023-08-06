import { DocumentReference } from 'firebase-admin/firestore';

export class DefaultGame {
  id: string;
  game_name: string;
  img: string;
  gameUrl: string;
  category: string;
  likes: number;
  shares: number;
  plays: number;
  storage_id: string;
}
