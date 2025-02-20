import { useEffect, useRef, useState } from 'react';
import Account from '../../types/Account';
import Navbar from '../../component/Navbar';
import AccountList from '../../component/AccountList';
import Layout from '../../layouts/Layout';
import accountService from '../../services/accountService';
import { Outlet, useMatch, useSearchParams } from 'react-router-dom';
import formatUpdatedAt from '../../utils/formattedDate';
import { useMediaQuery } from 'react-responsive';

const AccountsOverview = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery] = useSearchParams();
  const controllerRef = useRef<AbortController | null>();
  const isDetailPage = useMatch({
    path: '/accounts/:id',
    end: false,
  });
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
      {(!isDetailPage || !isMobile) && (
        <div className="flex w-full flex-col border-r border-gray-700 md:max-w-sm">
          <Navbar loading={loading} />
          <AccountList groupedAccounts={groupedAccounts} />
        </div>
      )}
      {(isDetailPage || !isMobile) && (
        <div className="mx-5 mt-10 w-full md:mx-10 md:mt-20">
          <Outlet />
        </div>
      )}
    </Layout>
  );
};

export default AccountsOverview;
