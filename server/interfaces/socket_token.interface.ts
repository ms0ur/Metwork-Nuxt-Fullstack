export default interface ISocketToken {
  _id?: string;
  token: string;
  userID: string;
  issuedAt: Date;
}
