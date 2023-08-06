import { GameCategory } from './enums/gameCategory.enum';
import {
  DocumentReference,
  FieldValue,
  getFirestore,
} from 'firebase-admin/firestore';

export class CreateGameDto {
  user_id: string;
  game_name: string;
  img: string;
  gameUrl: string;
  category: GameCategory;
  private: boolean;
}

export class User {
  id: string;
  name: string;
  email: string;
  img: string;
  sign_in_provider: string;
  createdAt: Date;
  identify: any;
}
export class Game {
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
  userRef: DocumentReference;
  storage_id: string;

  constructor(
    game_name: string,
    img: string,
    gameUrl: string,
    category: string,
    userRef: DocumentReference,
    storage_id?: string,
    
  ) {
    this.game_name = game_name;
    this.img = img;
    this.gameUrl = gameUrl;
    this.category = category;
    this.private = true;
    this.userRef = userRef;
    this.storage_id = storage_id;
  }
}

export class Like {
  id: string;
  game_Id: string;
  createdAt: Date;
  user_id: string;
}
export class Share {
  id: string;
  game_Id: string;
  createdAt: Date;
  user_id: string;
}

export class Comment {
  id: string;
  game_Id: string;
  comment: string;
  createdAt: Date;
  user_id: string;
}
export class Play {
  game_Id: string;
  user_id: string;
}

export class GameAction {
  createdAt?: string;
  game_Id: string;
  gameRef: DocumentReference;
  user_id: string;
  userRef: DocumentReference;
  comment?: string;

  constructor(
    userRef: DocumentReference,
    gameRef: DocumentReference,
    comment?: string,
  ) {
    this.gameRef = gameRef;
    this.userRef = userRef;
  }
}

export class GameAssets {
  data : {}
}
