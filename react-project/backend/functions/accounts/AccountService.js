"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccounts = void 0;
function GetAccounts() {
    const account = [
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
exports.GetAccounts = GetAccounts;
