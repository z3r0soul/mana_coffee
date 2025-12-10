import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar, Coffee, LogOut, TrendingUp, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Menu from '../pages/Menu';
import AdminReservations from '../pages/Admin_reservations';

const LOGOUT_API_URL = "http://localhost:4000/api/auth/logout";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReservations: 0,
    totalMenuItems: 0,
  });

  useEffect(() => {
    setStats({
      totalUsers: 150,
      totalReservations: 45,
      totalMenuItems: 32,
    });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_API_URL, {}, {
        withCredentials: true,
      });
      alert("Sesión cerrada");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC]/30 via-[#E8DCC4]/20 to-[#D4C5A9]/30 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-mana-brown to-[#8B6F47] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                Panel de Administración
              </h1>
              <p className="text-[#FFFDD0] text-sm mt-1">
                Gestion del Restaurante
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all shadow-lg hover:shadow-xl border border-white/30"
            >
              <LogOut size={20} />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-2 flex flex-wrap gap-2 mb-8 border border-mana-brown/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'overview'
              ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white shadow-lg'
              : 'text-gray-700 hover:bg-mana-cream/50'
              }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'users'
              ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white shadow-lg'
              : 'text-gray-700 hover:bg-mana-cream/50'
              }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'reservations'
              ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white shadow-lg'
              : 'text-gray-700 hover:bg-mana-cream/50'
              }`}
          >
            Reservaciones
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'menu'
              ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white shadow-lg'
              : 'text-gray-700 hover:bg-mana-cream/50'
              }`}
          >
            Menú
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-3xl font-bold text-mana-brown mb-8 flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              Resumen General
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Card Usuarios */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-l-4 border-[#8B7355] hover:shadow-2xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-br from-[#D4C5A9]/40 to-[#C9B99A]/60 p-4 rounded-xl group-hover:scale-110 transition-transform">
                    <Users className="text-[#8B7355]" size={32} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Total Usuarios
                </h3>
                <p className="text-4xl font-bold text-mana-brown mt-2">
                  {stats.totalUsers}
                </p>
                <p className="text-xs text-gray-500 mt-2">↑ 12% vs mes anterior</p>
              </div>

              {/* Card Reservaciones */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-l-4 border-[#A0826D] hover:shadow-2xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-br from-[#E8DCC4]/40 to-[#D4C5A9]/60 p-4 rounded-xl group-hover:scale-110 transition-transform">
                    <Calendar className="text-[#A0826D]" size={32} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Reservaciones Activas
                </h3>
                <p className="text-4xl font-bold text-mana-brown mt-2">
                  {stats.totalReservations}
                </p>
                <p className="text-xs text-gray-500 mt-2">↑ 8% vs mes anterior</p>
              </div>

              {/* Card Menú */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-l-4 border-[#C9A875] hover:shadow-2xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-br from-[#FFFDD0]/40 to-[#F5E6C3]/60 p-4 rounded-xl group-hover:scale-110 transition-transform">
                    <Coffee className="text-[#C9A875]" size={32} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Items en Menú
                </h3>
                <p className="text-4xl font-bold text-mana-brown mt-2">
                  {stats.totalMenuItems}
                </p>
                <p className="text-xs text-gray-500 mt-2">3 nuevos esta semana</p>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-mana-brown/10">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-mana-brown" />
                <h3 className="text-2xl font-bold text-mana-brown">
                  Actividad Reciente
                </h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-[#8B7355] pl-6 py-3 bg-[#F5F5DC]/20 rounded-r-lg hover:bg-[#F5F5DC]/40 transition-colors">
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#8B7355] rounded-full"></span>
                    Nuevo usuario registrado
                  </p>
                  <p className="text-sm text-gray-600 ml-4 mt-1">Hace 2 horas</p>
                </div>

                <div className="border-l-4 border-[#A0826D] pl-6 py-3 bg-[#E8DCC4]/20 rounded-r-lg hover:bg-[#E8DCC4]/40 transition-colors">
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#A0826D] rounded-full"></span>
                    Nueva reservación confirmada
                  </p>
                  <p className="text-sm text-gray-600 ml-4 mt-1">Hace 5 horas</p>
                </div>

                <div className="border-l-4 border-[#C9A875] pl-6 py-3 bg-[#FFFDD0]/20 rounded-r-lg hover:bg-[#FFFDD0]/40 transition-colors">
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#C9A875] rounded-full"></span>
                    Menú actualizado
                  </p>
                  <p className="text-sm text-gray-600 ml-4 mt-1">Hace 1 día</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-mana-brown/10">
            <h2 className="text-3xl font-bold text-mana-brown mb-6 flex items-center gap-3">
              <Users className="w-8 h-8" />
              Gestión de Usuarios
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Aquí podrás ver y gestionar todos los usuarios registrados.
            </p>
            <div className="mt-6 p-4 bg-gradient-to-r from-[#FFFDD0]/30 to-[#F5E6C3]/30 rounded-xl border border-[#C9A875]/30">
              <p className="text-sm text-[#8B6F47] font-medium">
                🚧 Funcionalidad en desarrollo - Conectar con API de usuarios
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div>
            <h2 className="text-3xl font-bold text-mana-brown mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              Gestión de Reservaciones
            </h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-mana-brown/10">
              <AdminReservations />
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div>
            <h2 className="text-3xl font-bold text-mana-brown mb-6 flex items-center gap-3">
              <Coffee className="w-8 h-8" />
              Gestión del Menú
            </h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-mana-brown/10">
              <Menu />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;