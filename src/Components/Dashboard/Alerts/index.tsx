const Alerts = ({ message }: { message: string }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alerts;
