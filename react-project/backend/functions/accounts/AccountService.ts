interface Account {
  Guid: string;
  name: string;
  email: string;
  password: string;
  url: string;
}

export function GetAccounts(): Account[] {
  const account: Account[] = [
    {
      Guid: "452b7495-b661-4990-9b7b-df42c7a4ba56",
      name: "test",
      email: "test@test.de",
      password: "123456789",
      url: "www.google.de",
    },
    {
      Guid: "452b7495-b661-4990-9b7b-df42c7a4ba51",
      name: "test 2",
      email: "test2@test.de",
      password: "987654321",
      url: "www.securethepass.com",
    },
  ];

  return account;
}
