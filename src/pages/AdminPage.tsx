import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { AdminHeader } from '../components/layout/AdminHeader';
import { getBookingStats, initializeSampleData, getAllBookings } from '../services/bookingStorage';
import { BookingsPage, CalendarPage, NewBookingPage } from './admin';
import { FileText, Clock, CheckCircle2, Calendar, Users } from 'lucide-react';
import { StatusBadge } from '../components/admin';

// Initialize sample data on first load
if (typeof window !== 'undefined') {
  initializeSampleData();
}

export const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = getBookingStats();
  const recentBookings = getAllBookings().slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 to-forest-800 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<FileText className="w-6 h-6" />}
              label="Total Bookings"
              value={stats.total}
              color="gold"
            />
            <StatCard
              icon={<Clock className="w-6 h-6" />}
              label="Pending"
              value={stats.pending}
              color="yellow"
            />
            <StatCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              label="Confirmed"
              value={stats.confirmed}
              color="green"
            />
            <StatCard
              icon={<Calendar className="w-6 h-6" />}
              label="Today"
              value={stats.today}
              color="blue"
            />
          </div>

          {/* Nested Routes */}
          <Routes>
            <Route index element={
              <div className="space-y-6">
                {/* Welcome Section */}
                <div className="admin-glass-card p-6">
                  <h2 className="text-2xl font-serif font-bold text-cream-100 mb-2">
                    Welcome to Admin Dashboard
                  </h2>
                  <p className="text-cream-400 font-sans">
                    Manage your bookings efficiently
                  </p>
                </div>

                {/* Recent Bookings */}
                <div className="admin-glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-cream-100 font-sans">
                      Recent Bookings
                    </h3>
                    <button
                      onClick={() => window.location.href = '/admin/bookings'}
                      className="text-gold-400 hover:text-gold-300 font-sans text-sm"
                    >
                      View All →
                    </button>
                  </div>

                  {recentBookings.length === 0 ? (
                    <p className="text-cream-400 font-sans">No bookings yet</p>
                  ) : (
                    <div className="space-y-3">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-cream-400/5 rounded-lg border border-cream-400/10"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-cream-100 font-sans">
                              {booking.name}
                            </p>
                            <p className="text-xs text-cream-400 font-sans">
                              {booking.date} at {booking.time} • {booking.service}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-xs text-cream-400 font-sans">
                              <Users className="w-3 h-3" />
                              {booking.groupSize}
                            </div>
                            <StatusBadge status={booking.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            } />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="new" element={<NewBookingPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'gold' | 'yellow' | 'green' | 'blue';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    gold: 'bg-gold-400/10 text-gold-400 border-gold-400/20',
    yellow: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    green: 'bg-green-400/10 text-green-400 border-green-400/20',
    blue: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  };

  return (
    <div className={`admin-glass-card p-6 border ${colorClasses[color]} hover:scale-105 transition-transform`}>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-cream-400/5 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-cream-100">{value}</p>
          <p className="text-sm text-cream-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
