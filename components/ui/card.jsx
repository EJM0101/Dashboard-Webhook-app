export function Card({ children }) {
  return <div className="bg-white shadow rounded-2xl p-4">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="text-base">{children}</div>;
}
