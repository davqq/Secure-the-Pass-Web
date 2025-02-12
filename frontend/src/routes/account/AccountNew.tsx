import AccountForm from '../../component/AccountForm';
import { Account } from '../../types/Account';
import accountService from '../../services/accountService';
import { useNavigate } from 'react-router-dom';

const AccountNew = () => {
  const navigate = useNavigate();

  const addAccount = (account: Account) =>
    accountService.addAccount(account).then(() => {
      navigate('/accounts');
    });

  return (
    <AccountForm
      mode="add"
      onSubmit={addAccount}
      onCancel={() => navigate('/accounts')}
    />
  );
};

export default AccountNew;
