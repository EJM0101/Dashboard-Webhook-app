export function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
      {...props}
    >
      {children}
    </button>
  );
}
