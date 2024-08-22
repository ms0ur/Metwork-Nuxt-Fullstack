export default interface Post {
  id: string;
  user: {
    id: string;
    username: string;
  };
  media: [string];
  comments: [string];
  likes: [string];
  reposts: [string];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
