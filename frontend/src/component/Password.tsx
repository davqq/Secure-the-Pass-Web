import { useState } from 'react';
import eyeOpen from '../assets/eyeClose.svg';
import eyeClosed from '../assets/eyeOpen.svg';
import Input, { InputProps } from './Input';

interface PasswordProps extends InputProps {}

const Password: React.FC<PasswordProps> = ({
  value,
  onchange,
  id,
  name,
  className = '',
  placeholder,
  required,
  autoComplete,
  children,
  ...props
}) => {
  const [seePassword, setSeePassword] = useState(false);

  const togglePasswordVisibilty = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div className="relative w-full">
      <Input
        type={seePassword ? 'text' : 'password'}
        required={required}
        setValue={onchange}
        value={value}
        id={id}
        className={className}
        name={name}
        autoComplete={autoComplete}
        placeholder="•••••••"
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
        <button
          type="button"
          onClick={togglePasswordVisibilty}
          className="rounded-full bg-gray-700 p-1 hover:bg-gray-600 active:bg-gray-500"
        >
          <img
            src={seePassword ? eyeClosed : eyeOpen}
            height={20}
            width={20}
            alt="see password"
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Password;
