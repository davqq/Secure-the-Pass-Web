import { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import { Account } from '../types/Account';
import Reload from '../assets/reload.svg';
import Password from './Password';
import accountService from '../services/accountService';

interface AccountFormProps {
  mode: 'edit' | 'add';
  accountData?: Account;
  onSubmit: (data: Account) => void;
  onCancel: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  mode,
  accountData,
  onSubmit,
  onCancel,
}) => {
  const [username, setUsername] = useState(accountData?.Username || '');
  const [url, setUrl] = useState(accountData?.Url || '');
  const [email, setEmail] = useState(accountData?.Email || '');
  const [password, setPassword] = useState(accountData?.Password || '');
  const [notes, setNotes] = useState(accountData?.Notes || '');

  useEffect(() => {
    if (accountData) {
      setUsername(accountData.Username || '');
      setUrl(accountData.Url || '');
      setEmail(accountData.Email || '');
      setPassword(accountData.Password || '');
      setNotes(accountData.Notes || '');
    }
  }, [accountData]);

  const generatePassword = async () => {
    const response = await accountService.generatePassword();
    setPassword(response);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      Guid: accountData?.Guid || '',
      Username: username,
      Email: email,
      Url: url,
      Password: password,
      Notes: notes,
      CreatedAt: accountData?.CreatedAt || new Date(),
      UpdatedAt: accountData?.UpdatedAt || new Date(),
      Favorite: accountData?.Favorite || false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl">
      <h1 className="mb-6 text-center text-3xl font-semibold text-white">
        {mode === 'edit' ? 'Edit Account' : 'New Account'}
      </h1>

      {/* URL */}
      <label className="mt-2 block text-sm font-medium text-white">Url</label>
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your URL"
      />

      {/* Username */}
      <label className="mt-4 block text-sm font-medium text-white">
        Username
      </label>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />

      {/* Email */}
      <label className="mt-4 block text-sm font-medium text-white">Email</label>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      {/* Password */}
      <label className="mt-4 block text-sm font-medium text-white">
        Password
      </label>
      <Password
        value={password}
        className="pr-16"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      >
        <button
          type="button"
          onClick={generatePassword}
          className="rounded-full bg-gray-700 p-1 hover:bg-gray-600 active:bg-gray-500"
        >
          <img src={Reload} height={20} width={20} alt="generate password" />
        </button>
      </Password>

      {/* Notes */}
      <label className="mt-4 block text-sm font-medium text-white">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Here you can write notes about your account"
        className="min-h-[100px] w-full rounded-md border border-gray-700 bg-gray-700 p-3 text-sm text-white focus:border-blue-500 focus:outline"
      />

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" color="neutral" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="blue" type="submit">
          {mode === 'edit' ? 'Save Changes' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
