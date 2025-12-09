import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar, Coffee, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    // Aquí puedes cargar estadísticas reales desde tu API
    // Por ahora usamos datos de ejemplo
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={20} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-2 flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              activeTab === 'overview'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              activeTab === 'users'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              activeTab === 'reservations'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Reservaciones
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              activeTab === 'menu'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Menú
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resumen General
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card Usuarios */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="text-blue-600" size={32} />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Usuarios
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalUsers}
                </p>
              </div>

              {/* Card Reservaciones */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Calendar className="text-green-600" size={32} />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Reservaciones Activas
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalReservations}
                </p>
              </div>

              {/* Card Menú */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Coffee className="text-amber-600" size={32} />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Items en Menú
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalMenuItems}
                </p>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Actividad Reciente
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">
                    Nuevo usuario registrado
                  </p>
                  <p className="text-sm text-gray-500">Hace 2 horas</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">
                    Nueva reservación confirmada
                  </p>
                  <p className="text-sm text-gray-500">Hace 5 horas</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">
                    Menú actualizado
                  </p>
                  <p className="text-sm text-gray-500">Hace 1 día</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Gestión de Usuarios
            </h2>
            <p className="text-gray-600">
              Aquí podrás ver y gestionar todos los usuarios registrados.
            </p>
            <div className="mt-4 text-sm text-amber-600">
              Funcionalidad en desarrollo - conectar con API de usuarios
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Gestión de Reservaciones
            </h2>
            <p className="text-gray-600">
              Aquí podrás ver y gestionar todas las reservaciones.
            </p>
            <div className="mt-4 text-sm text-amber-600">
              Funcionalidad en desarrollo - conectar con API de reservaciones
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Gestión del Menú
            </h2>
            <p className="text-gray-600">
              Aquí podrás agregar, editar y eliminar items del menú.
            </p>
            <div className="mt-4 text-sm text-amber-600">
              Funcionalidad en desarrollo - conectar con API de menú
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
