import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const Layout: React.FC<LayoutProps> = ({ children, className, ...props }) => {
  const baseClassName = 'flex max-w-[1152px] w-full';

  return (
    <main className="flex w-full justify-center bg-slate-900">
      <div className={twMerge(baseClassName, className)} {...props}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
