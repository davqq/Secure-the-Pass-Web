import { NavLink } from 'react-router-dom';
import { Account } from '../types/Account';

interface AccountListItemProps {
  account: Account;
}

const AccountListItem = ({ account }: AccountListItemProps) => (
  <li className="mb-1 mt-1">
    <NavLink
      to={`/accounts/${account.Guid}`}
      id="accountList"
      className="flex items-center justify-between gap-4 rounded-xl text-white no-underline hover:bg-gray-600"
    >
      <div className="m-2 flex min-h-[3em] w-full items-center justify-between">
        <div className="mr-3 flex flex-col overflow-hidden whitespace-nowrap">
          {account.Url && <span>{account.Url}</span>}
          <span className="text-xs text-gray-400">{account.Email}</span>
        </div>
        <span className="text-[#eeb004]">{account.Favorite && '★'}</span>
      </div>
    </NavLink>
  </li>
);

export default AccountListItem;
