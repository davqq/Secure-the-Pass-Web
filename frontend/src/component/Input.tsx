import { twMerge } from 'tailwind-merge';

export interface InputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  id,
  name,
  className = '',
  placeholder,
  required,
  autoComplete,
  children,
  ...props
}) => {
  const baseClassName =
    'block w-full appearance-none rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm';

  return (
    <input
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className={twMerge(baseClassName, className)}
      required={required}
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
