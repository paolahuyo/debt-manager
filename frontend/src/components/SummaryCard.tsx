interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: 'blue' | 'red' | 'green';
}

export default function SummaryCard({
  title,
  value,
  icon,
  color = 'blue'
}: SummaryCardProps): JSX.Element {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    green: 'bg-green-50 text-green-600 border-green-200'
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg shadow-md p-6 border`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}
