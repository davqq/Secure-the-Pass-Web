import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Account } from '../../types/Account';
import eyeOpen from '@/assets/eyeClose.svg';
import eyeClosed from '@/assets/eyeOpen.svg';
import edit from '@/assets/edit.svg';
import accountService from '../../services/accountService';

const AccountDetails = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState(true);
  const controllerRef = useRef<AbortController | null>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);

    accountService.getAccount(accountId || '', controller).then((result) => {
      setAccount(result);
      setLoading(false);
      controllerRef.current = null;
    });
  }, [accountId]);

  if (!account || loading) {
    return (
      <div className="flex max-w-full animate-pulse flex-col flex-nowrap items-start justify-start">
        <div className="mt-4 flex items-center space-x-3">
          <div>
            <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-700"></div>
          </div>
        </div>

        <br />
        <div className="grid w-full grid-flow-col auto-rows-max grid-rows-3 rounded-xl border border-solid border-gray-600">
          <div className="overflow-auto border-b border-gray-600 p-2.5">
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-600"></div>
            <div className="h-2 w-32 rounded-full bg-gray-700"></div>
          </div>
          <div className="overflow-auto border-b border-gray-600 p-2.5">
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-600"></div>
            <div className="h-2 w-32 rounded-full bg-gray-700"></div>
          </div>
          <div className="overflow-auto p-2.5">
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-600"></div>
            <div className="h-2 w-32 rounded-full bg-gray-700"></div>
          </div>
        </div>

        <br />

        <div className="flex w-full items-center justify-center">
          <div className="h-2 w-32 rounded-full bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col flex-wrap items-start justify-start">
      <div className="flex w-full flex-wrap">
        <h1 className="m-4 text-3xl font-[700] text-white">{account?.Url}</h1>
        <Favorite {...account} />
        <button
          className="text-md ml-auto flex h-fit self-center rounded-md border border-transparent bg-blue-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-600"
          onClick={() => {
            navigate(`/accounts/${accountId}/edit`);
          }}
        >
          <img className="h-5 w-5 self-center" src={edit} alt="Logo" />

          <span className="ml-1.5">Edit</span>
        </button>
      </div>
      <br />
      <div className="grid w-full grid-flow-row rounded-xl border border-solid border-gray-600">
        {account?.Username && (
          <div className="overflow-auto border-b border-gray-600 p-2.5">
            <div className="text-sm text-headline">username</div>
            <div className="text-white">{account.Username}</div>
          </div>
        )}
        {account?.Email && (
          <div className="overflow-auto border-b border-gray-600 p-2.5">
            <div className="text-sm text-headline">email</div>
            <div className="text-white">{account.Email}</div>
          </div>
        )}
        {account?.Password && (
          <div className="overflow-auto p-2.5">
            <div className="text-sm text-headline">password</div>
            <div className="flex w-full justify-between">
              <div className="overflow-x-auto text-white">
                {showPassword
                  ? account.Password
                  : '•'.repeat(account.Password.length)}
              </div>
              <button
                className="ml-2 h-fit min-w-fit self-center text-white"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <img
                  className="h-5 w-5"
                  src={showPassword ? eyeClosed : eyeOpen}
                  alt="Logo"
                />
              </button>
            </div>
          </div>
        )}
      </div>
      {account.Url && (
        <div className="flex flex-col overflow-hidden p-2.5">
          <p className="text-sm text-headline">website</p>
          <p className="text-white">{account.Url}</p>
        </div>
      )}
      {account.Notes && (
        <div className="flex w-full flex-col overflow-hidden p-2.5">
          <p className="text-sm text-headline">notes</p>
          <p className="text-white">{account.Notes}</p>
        </div>
      )}
      <br />
      {account?.UpdatedAt && (
        <i className="flex w-full justify-center text-[#818181]">
          modified: {new Date(account.UpdatedAt).toLocaleString()}
        </i>
      )}
      {account?.CreatedAt && (
        <i className="flex w-full justify-center text-[#818181]">
          created: {new Date(account.CreatedAt).toLocaleString()}
        </i>
      )}
    </div>
  );
};

function Favorite(account: Account) {
  const [favorite, setFavorite] = useState(account?.Favorite);

  return (
    <div className="mt-1 flex items-center">
      <button
        name="favorite"
        className={`border-none p-0 text-[1.5rem] font-[400] ${
          favorite ? 'text-amber-300' : 'text-gray-400 hover:text-amber-300'
        }`}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={() => {
          accountService.editAccount({
            ...account,
            Favorite: !favorite,
          });

          setFavorite(!favorite);
        }}
      >
        {favorite ? '★' : '☆'}
      </button>
    </div>
  );
}

export default AccountDetails;
