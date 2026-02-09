import type { BookingStatus } from '../../services/bookingStorage';

interface StatusBadgeProps {
  status: BookingStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      className: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
      dot: 'bg-yellow-400',
    },
    confirmed: {
      label: 'Confirmed',
      className: 'bg-green-400/10 text-green-400 border-green-400/30',
      dot: 'bg-green-400',
    },
    completed: {
      label: 'Completed',
      className: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
      dot: 'bg-blue-400',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-red-400/10 text-red-400 border-red-400/30',
      dot: 'bg-red-400',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold font-sans border ${config.className}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></span>
      {config.label}
    </span>
  );
};
