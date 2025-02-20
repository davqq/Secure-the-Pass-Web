import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccountForm from '../../component/AccountForm';
import Account from '../../types/Account';
import accountService from '../../services/accountService';

const AccountEdit = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account>();
  const navigate = useNavigate();

  useEffect(() => {
    accountService.getAccount(accountId || '').then((result) => {
      setAccount(result);
    });
  }, [accountId]);

  const editAccount = async (accountEdited: Account) => {
    await accountService.editAccount(accountEdited);
    navigate(`/accounts/${accountId}`);
  };

  const onCancel = () => {
    navigate(`/accounts/${accountId}`);
  };

  return (
    <AccountForm
      mode="edit"
      accountData={account}
      onSubmit={editAccount}
      onCancel={onCancel}
    />
  );
};

export default AccountEdit;
