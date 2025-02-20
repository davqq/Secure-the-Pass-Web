import { useState } from 'react';
import Account from '../types/Account';
import accountService from '../services/accountService';

const Favorite = (account: Account) => {
  const [favorite, setFavorite] = useState(account?.Favorite);

  return (
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
  );
};

export default Favorite;
