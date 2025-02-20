interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Url: string;
  Password: string;
  Notes: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Favorite: boolean;
}

export default Account;
