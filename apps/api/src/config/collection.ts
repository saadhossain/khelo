export class FirebaseCollection {
  public static readonly games = 'games';
  public static readonly templates = 'templates';
  public static readonly gameImages = 'gameImages';
  public static readonly users = 'users';
  public static readonly play = 'plays';
  public static readonly like = 'likes';
  public static readonly share = 'shares';
  public static readonly comment = 'comments';
  public static readonly activities = 'activities';
  public static readonly gameAssets = 'gameAssets'
  public static readonly assets = 'assets'

  getGamesCollections() {
    return [
      FirebaseCollection.play,
      FirebaseCollection.like,
      FirebaseCollection.share,
      FirebaseCollection.comment,
    ];
  }
}
