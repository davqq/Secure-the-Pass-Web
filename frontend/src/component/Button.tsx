import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  color: 'blue' | 'red' | 'neutral';
  value?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string | undefined;
  type?: 'button' | 'reset' | 'submit' | undefined;
  [key: string]: any;
  children: ReactNode;
}

const Button: React.FC<Props> = ({
  color,
  value,
  id,
  name,
  onClick,
  className = '',
  type,
  children,
  props,
}) => {
  let baseClassName =
    'py-2 px-6 rounded-md shadow-sm text-sm font-medium text-white ';

  if (color === 'blue') {
    baseClassName += 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700';
  } else if (color === 'red') {
    baseClassName += 'bg-red-500 hover:bg-red-600 active:bg-red-700';
  } else if (color === 'neutral') {
    baseClassName +=
      'bg-neutral-500 hover:bg-neutral-600  active:bg-neutral-700';
  }

  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      id={id}
      name={name}
      className={twMerge(baseClassName, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
