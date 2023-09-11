export const InputError = ({ error }) =>
  error ? <p className="text-red-500 text-sm">{error.message}</p> : null;
