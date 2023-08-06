interface UserActivities {
  id?: string;
  createdAt?: string;
  action: string;
  game_id: string | null;
  game_name: string | null;
  changing_info: string | null;
  actionId: string | null;
}
