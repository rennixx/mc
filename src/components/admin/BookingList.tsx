import { useState, useMemo, useEffect } from 'react';
import { Search, Download, Trash2, Edit, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllBookings, updateBookingStatus, deleteBooking, type BookingStatus, type ServiceType } from '../../services/bookingStorage';

interface BookingListProps {
  onEdit?: (booking: any) => void;
  onView?: (booking: any) => void;
}

export const BookingList = ({ onEdit, onView }: BookingListProps) => {
  const [bookings, setBookings] = useState(getAllBookings());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [serviceFilter, setServiceFilter] = useState<ServiceType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Auto-refresh when bookings change
  useEffect(() => {
    const handleUpdate = () => setBookings(getAllBookings());
    window.addEventListener('bookingsUpdated', handleUpdate);
    return () => window.removeEventListener('bookingsUpdated', handleUpdate);
  }, []);

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.phone.includes(searchQuery) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesService = serviceFilter === 'all' || booking.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [bookings, searchQuery, statusFilter, serviceFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    updateBookingStatus(id, newStatus);
    setBookings(getAllBookings()); // Refresh list
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id);
      setBookings(getAllBookings()); // Refresh list
    }
  };

  const handleExport = () => {
    const headers = ['ID', 'Date', 'Time', 'Name', 'Email', 'Phone', 'Service', 'Status', 'Group Size'];
    const rows = filteredBookings.map(b => [
      b.id,
      b.date,
      b.time,
      b.name,
      b.email,
      b.phone,
      b.service,
      b.status,
      b.groupSize.toString()
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const serviceOptions: { value: ServiceType | 'all'; label: string }[] = [
    { value: 'all', label: 'All Services' },
    { value: 'safari', label: 'Safari' },
    { value: 'academy', label: 'Academy' },
    { value: 'private', label: 'Private' },
    { value: 'event', label: 'Event' },
  ];

  const statusOptions: { value: BookingStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="admin-glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone or booking ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-cream-400/5 border border-cream-400/10 text-cream-100 placeholder-cream-400 rounded-lg focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as BookingStatus | 'all');
              setCurrentPage(1);
            }}
            className="px-4 py-3 bg-cream-400/5 border border-cream-400/10 text-cream-100 rounded-lg focus:outline-none focus:border-gold-400"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-forest-900">
                {option.label}
              </option>
            ))}
          </select>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => {
              setServiceFilter(e.target.value as ServiceType | 'all');
              setCurrentPage(1);
            }}
            className="px-4 py-3 bg-cream-400/5 border border-cream-400/10 text-cream-100 rounded-lg focus:outline-none focus:border-gold-400"
          >
            {serviceOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-forest-900">
                {option.label}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-3 bg-gold-400 hover:bg-gold-500 text-forest-900 font-semibold rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-cream-400 font-sans">
        Showing {paginatedBookings.length} of {filteredBookings.length} bookings
      </p>

      {/* Table */}
      <div className="admin-glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-400/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300 font-sans">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300 font-sans">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300 font-sans">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300 font-sans">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300 font-sans">Group</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300 font-sans">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300 font-sans">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-cream-400">
                    No bookings found
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-cream-400/5 hover:bg-cream-400/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gold-400">{booking.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-cream-100 font-sans">{booking.date}</div>
                      <div className="text-xs text-cream-400 font-sans">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-cream-100 font-sans font-medium">{booking.name}</div>
                      <div className="text-xs text-cream-400 font-sans">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-cream-200 font-sans capitalize">{booking.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-cream-200 font-sans">{booking.groupSize}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                        className="text-xs bg-transparent border-0 p-0 focus:ring-0 cursor-pointer"
                      >
                        <option value="pending" className="bg-forest-900">Pending</option>
                        <option value="confirmed" className="bg-forest-900">Confirmed</option>
                        <option value="completed" className="bg-forest-900">Completed</option>
                        <option value="cancelled" className="bg-forest-900">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(booking)}
                            className="p-2 text-cream-400 hover:text-cream-100 hover:bg-cream-400/10 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(booking)}
                            className="p-2 text-cream-400 hover:text-gold-400 hover:bg-cream-400/10 rounded-lg transition-colors"
                            title="Edit booking"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 text-cream-400 hover:text-red-400 hover:bg-cream-400/10 rounded-lg transition-colors"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-cream-400/10">
            <p className="text-sm text-cream-400 font-sans">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-cream-400 hover:text-cream-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cream-400/10 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-cream-300 font-sans">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-cream-400 hover:text-cream-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cream-400/10 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
