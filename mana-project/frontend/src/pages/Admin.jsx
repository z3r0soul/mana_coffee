import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../components/AdminDashboard';

const CHECK_ADMIN_URL = "http://localhost:4000/api/auth/check-admin";

function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get(CHECK_ADMIN_URL, {
        withCredentials: true,
      });

      if (response.data.isAdmin) {
        setIsAdmin(true);
      } else {
        // No es admin, redirigir a home
        alert("");
        navigate("/");
      }
    } catch (error) {
      console.error("Error al verificar permisos:", error);
      if (error.response?.status === 401) {
        // No está autenticado
        alert("Debes iniciar sesión");
        navigate("/login");
      } else {
        // Otro error
        alert("Error al verificar permisos");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-2xl text-amber-700">Cargando</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // No mostrar nada mientras redirige
  }

  return <AdminDashboard />;
}

export default Admin;
