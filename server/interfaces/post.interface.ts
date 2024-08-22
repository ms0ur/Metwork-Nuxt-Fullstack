export default interface IPost {
  id_?: string;
  userID: string;
  media?: [string];
  comments: [string];
  likes: [string];
  reposts: [string];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
