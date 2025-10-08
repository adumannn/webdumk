const Tag = ({ label }: { label: string }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      {label}
    </span>
  );
};

export default Tag;
