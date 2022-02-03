export class User {
  constructor(
    public _id: string,
    public username: string,
    public gender: string,
    public email: string,
    public birthday: Date,
    public password: string,
    public roles: string,
    public image: string,
    public subscrition: number,
    public borrowPersonalData: number
  ) {}
}

export interface UserResponse {
  user: User;
  token: string;
}
