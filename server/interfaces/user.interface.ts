export default interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
  birthdate: Date;
  sex: string;
  city: string;
  country: string;
  description?: string;
  avatar?: string;
  createdAt?: Date;
  lastOnline?: Date;
  isPrivate?: boolean;
}
