interface LinkProps {
  children?: React.ReactNode;
  href: string;
}

const Link: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <a className="font-medium text-blue-600 hover:text-blue-500" href={href}>
      {children}
    </a>
  );
};

export default Link;
