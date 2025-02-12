import AccountListItem from './AccountListItem';
import { Account } from '../types/Account';
import AccountGroupLabel from './AccountGroupLabel';

interface AccountListProps {
  groupedAccounts: { [key: string]: Account[] };
}

const AccountList = ({ groupedAccounts }: AccountListProps) => {
  if (!groupedAccounts || Object.entries(groupedAccounts).length === 0) {
    return <p className="text-white">No accounts yet</p>;
  }

  return (
    <nav className="my-1 mr-1.5 flex-1 overflow-auto px-8 pt-4">
      {Object.entries(groupedAccounts).map(([groupLabel, accounts]) => (
        <li className="list-none" key={groupLabel}>
          <AccountGroupLabel label={groupLabel} />
          <ul>
            {accounts.map((account) => (
              <AccountListItem account={account} key={account.Guid} />
            ))}
          </ul>
        </li>
      ))}
    </nav>
  );
};

export default AccountList;
