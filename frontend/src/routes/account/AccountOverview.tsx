import { useEffect, useRef, useState } from 'react';
import { Account } from '../../types/Account';
import Navbar from '../../component/Navbar';
import AccountList from '../../component/AccountList';
import Layout from '../../layouts/Layout';
import accountService from '../../services/accountService';
import { Outlet, useSearchParams } from 'react-router-dom';
import formatUpdatedAt from '../../utils/formattedDate';

const AccountsOverview = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery] = useSearchParams();
  const controllerRef = useRef<AbortController | null>();

  useEffect(() => {
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    accountService
      .getAccounts(searchQuery.get('q') || '', controller)
      .then((data) => {
        setAccounts(data);
        setLoading(false);
      });
  }, [searchQuery]);

  const groupedAccounts = accounts.reduce<{ [key: string]: Account[] }>(
    (groups, account) => {
      const groupLabel = formatUpdatedAt(account.UpdatedAt.toString());
      if (!groups[groupLabel]) groups[groupLabel] = [];
      groups[groupLabel].push(account);
      return groups;
    },
    {}
  );

  return (
    <Layout>
      <div className="flex w-full max-w-sm flex-col border-r border-gray-700">
        <Navbar loading={loading} />
        <AccountList groupedAccounts={groupedAccounts} />
      </div>
      <div className="mx-10 mt-20 w-full">
        <Outlet />
      </div>
    </Layout>
  );
};

export default AccountsOverview;
