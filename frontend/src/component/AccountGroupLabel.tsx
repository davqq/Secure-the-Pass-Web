interface AccountGroupLabelProps {
  label: string;
}

const AccountGroupLabel = ({ label }: AccountGroupLabelProps) => {
  return <div className="mt-2 text-xs font-bold text-gray-400">{label}</div>;
};

export default AccountGroupLabel;
