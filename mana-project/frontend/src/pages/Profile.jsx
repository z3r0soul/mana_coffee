import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/profile";
const LOGOUT_API_URL = "http://localhost:4000/api/auth/logout";
const CHECK_ADMIN_URL = "http://localhost:4000/api/auth/check-admin";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-2xl text-amber-700">Cargando perfil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={() => navigate("/login")}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Ir a Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="mt-2 text-gray-600">Información de tu cuenta</p>
        </div>

        {/* Tarjeta de perfil */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Avatar y nombre */}
          <div className="bg-amber-600 px-6 py-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
              <span className="text-4xl text-amber-600 font-bold">
                {user?.nombre?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">
              {user?.nombre} {user?.apellido}
            </h2>
            <p className="text-amber-100">{user?.email}</p>
          </div>

          {/* Información detallada */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500">
                  Nombre
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user?.nombre || "No especificado"}
                </p>
              </div>

              {/* Apellido */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500">
                  Apellido
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user?.apellido || "No especificado"}
                </p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500">
                  Correo electrónico
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user?.email || "No especificado"}
                </p>
              </div>

              {/* Teléfono */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500">
                  Teléfono
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user?.telefono || "No especificado"}
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Volver al inicio
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition font-medium"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;