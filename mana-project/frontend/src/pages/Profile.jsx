import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock, Users, AlertCircle, CheckCircle, XCircle, Loader2, Mail, Phone, User, LogOut, Home, CalendarPlus } from "lucide-react";

const API_URL = "http://localhost:4000/api/auth/profile";
const LOGOUT_API_URL = "http://localhost:4000/api/auth/logout";
const CHECK_ADMIN_URL = "http://localhost:4000/api/auth/check-admin";
const RESERVATIONS_URL = "http://localhost:4000/api/reservations";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true, // Envía la cookie con el token
      });
      setUser(response.data);
      
      // Verificar si es admin
      const adminCheck = await axios.get(CHECK_ADMIN_URL, {
        withCredentials: true,
      });
      
      if (adminCheck.data.isAdmin) {
        // Si es admin, redirigir al panel de administración
        navigate("/admin");
        return;
      }
      
      // Cargar reservaciones del usuario
      fetchUserReservations();
      
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      if (error.response?.status === 401) {
        // Token inválido o expirado, redirigir a login
        setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(error.response?.data?.error || "Error al cargar el perfil");
      }
      setLoading(false);
    }
  };

  const fetchUserReservations = async () => {
    setLoadingReservations(true);
    try {
      const response = await axios.get(`${RESERVATIONS_URL}/user`, {
        withCredentials: true,
      });
      setReservations(response.data);
    } catch (error) {
      console.error("Error al obtener reservaciones:", error);
    } finally {
      setLoadingReservations(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (estado) => {
    const statusConfig = {
      PENDIENTE: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle, label: 'Pendiente' },
      CONFIRMADA: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Confirmada' },
      CANCELADA: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Cancelada' },
      COMPLETADA: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle, label: 'Completada' },
    };
    const config = statusConfig[estado] || statusConfig.PENDIENTE;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  const handleLogout = async (e) => {
    
    e.preventDefault();
    try {
      await axios.post(LOGOUT_API_URL, {}, {
        withCredentials: true, // Incluir cookies
      });
      alert("Sesión cerrada");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
 
    
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-mana-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-mana-brown mx-auto mb-4" size={48} />
          <p className="text-mana-brown text-xl font-medium">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-mana-cream flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-mana-sand">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="text-red-500" size={32} />
          </div>
          <div className="text-red-600 text-xl mb-4 font-medium">{error}</div>
          <button
            onClick={() => navigate("/login")}
            className="bg-mana-brown text-white px-8 py-3 rounded-full hover:bg-mana-brown/90 transition font-medium"
          >
            Ir a Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mana-cream via-mana-sand to-mana-white">
      {/* Header decorativo */}
      <div className="bg-mana-brown h-48 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-mana-cream">
            <span className="text-5xl text-mana-brown font-bold">
              {user?.nombre?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-20 pb-12 max-w-4xl">
        {/* Nombre y email */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-mana-brown">
            {user?.nombre} {user?.apellido}
          </h1>
          <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
            <Mail size={16} />
            {user?.email}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'info' 
                ? 'bg-mana-brown text-white shadow-lg' 
                : 'bg-white text-mana-brown hover:bg-mana-sand'
            }`}
          >
            <User size={18} className="inline mr-2" />
            Mi Información
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'reservations' 
                ? 'bg-mana-brown text-white shadow-lg' 
                : 'bg-white text-mana-brown hover:bg-mana-sand'
            }`}
          >
            <Calendar size={18} className="inline mr-2" />
            Reservaciones
            {reservations.length > 0 && (
              <span className="ml-2 bg-mana-gold text-mana-brown text-xs px-2 py-0.5 rounded-full">
                {reservations.length}
              </span>
            )}
          </button>
        </div>

        {/* Contenido de tabs */}
        {activeTab === 'info' ? (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-mana-sand/50">
            <div className="p-8">
              <h2 className="text-xl font-bold text-mana-brown mb-6 flex items-center gap-2">
                <User className="text-mana-brown" />
                Datos Personales
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-2">
                    <User size={14} />
                    Nombre
                  </label>
                  <div className="bg-mana-cream/50 p-4 rounded-xl border border-mana-sand/30 group-hover:border-mana-brown/30 transition">
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.nombre || "No especificado"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-2">
                    <User size={14} />
                    Apellido
                  </label>
                  <div className="bg-mana-cream/50 p-4 rounded-xl border border-mana-sand/30 group-hover:border-mana-brown/30 transition">
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.apellido || "No especificado"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-2">
                    <Mail size={14} />
                    Correo electrónico
                  </label>
                  <div className="bg-mana-cream/50 p-4 rounded-xl border border-mana-sand/30 group-hover:border-mana-brown/30 transition">
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.email || "No especificado"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-2">
                    <Phone size={14} />
                    Teléfono
                  </label>
                  <div className="bg-mana-cream/50 p-4 rounded-xl border border-mana-sand/30 group-hover:border-mana-brown/30 transition">
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.telefono || "No especificado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="bg-mana-cream/30 px-8 py-6 border-t border-mana-sand/30">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-mana-brown py-3 px-6 rounded-full hover:bg-mana-sand transition font-medium border border-mana-sand"
                >
                  <Home size={18} />
                  Volver al inicio
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition font-medium"
                >
                  <LogOut size={18} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-mana-sand/50">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-mana-brown flex items-center gap-2">
                  <Calendar className="text-mana-brown" />
                  Mis Reservaciones
                </h2>
                <button
                  onClick={() => navigate("/reservations")}
                  className="flex items-center gap-2 bg-mana-brown text-white px-4 py-2 rounded-full hover:bg-mana-brown/90 transition text-sm font-medium"
                >
                  <CalendarPlus size={16} />
                  Nueva
                </button>
              </div>
              
              {loadingReservations ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin text-mana-brown" size={32} />
                  <span className="ml-3 text-gray-600">Cargando reservaciones...</span>
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-mana-cream rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-mana-brown/50" size={40} />
                  </div>
                  <p className="text-gray-500 mb-6">No tienes reservaciones registradas</p>
                  <button
                    onClick={() => navigate("/reservations")}
                    className="bg-mana-brown text-white px-8 py-3 rounded-full hover:bg-mana-brown/90 transition font-medium inline-flex items-center gap-2"
                  >
                    <CalendarPlus size={18} />
                    Hacer una reservación
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reserva) => (
                    <div 
                      key={reserva.id} 
                      className="bg-mana-cream/30 border border-mana-sand/50 rounded-2xl p-5 hover:shadow-md hover:border-mana-brown/30 transition group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-mana-brown/10 rounded-xl flex items-center justify-center">
                              <Calendar size={20} className="text-mana-brown" />
                            </div>
                            <span className="font-semibold text-gray-800 capitalize">
                              {formatDate(reserva.fecha)}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-gray-600 pl-13">
                            <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                              <Clock size={14} className="text-mana-brown" />
                              {formatTime(reserva.hora)}
                            </span>
                            <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                              <Users size={14} className="text-mana-brown" />
                              {reserva.personas} {reserva.personas === 1 ? 'persona' : 'personas'}
                            </span>
                          </div>
                        </div>
                        <div>
                          {getStatusBadge(reserva.estado)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;