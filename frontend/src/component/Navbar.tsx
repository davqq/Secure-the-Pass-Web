import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from './Button';
import Input from './Input';

interface NavbarProps {
  loading: boolean;
}

const Navbar = ({ loading }: NavbarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleNew = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/accounts/new');
  };

  return (
    <div className="gap-2 border-b border-gray-600 px-8 py-4">
      <form
        id="search-form"
        role="search"
        className="relative flex w-full gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          id="q"
          aria-label="Search accounts"
          placeholder="Search"
          type="search"
          name="q"
          className="pl-7"
          value={searchParams.get('q') || ''}
          onChange={(e) => setSearchParams({ q: e.target.value })}
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 transform">
          <div
            className={`h-4 w-4 bg-searchspinner ${loading ? 'animate-spin' : 'animate-none'}`}
          />
        </div>
        <Button
          onClick={handleNew}
          color="blue"
          form="search-form"
          className="px-4"
        >
          New
        </Button>
      </form>
    </div>
  );
};

export default Navbar;
