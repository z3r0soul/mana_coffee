import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "/api/auth/login";

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    const email = (formData.email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El correo electrónico no es válido");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true,
      });

      // Solo guardar usuario en 
      localStorage.setItem("user", JSON.stringify(response.data.usuario));

      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        error.response?.data?.error || "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // AJUSTE FONDO: #FDFBF7 y pt-32 para la navbar fija
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 pt-32">
      {/* AJUSTE CONTENEDOR: Borde suave, sombra y bordes muy redondeados */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#E8E4D9]">
        {/* Header */}
        <div>
          <h2 className="text-center text-4xl font-extrabold text-[#4A4036]">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-[#8C705F]">
            Bienvenido de vuelta a Mana Restobar
          </p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative text-sm">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#6B5D4D] mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                // AJUSTE INPUT: Fondo #FAF9F6, Borde #E8E4D9, Focus #8B7355
                className="appearance-none relative block w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] placeholder-[#9A8C7D] text-[#4A4036] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
                placeholder="correo@ejemplo.com"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#6B5D4D] mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] placeholder-[#9A8C7D] text-[#4A4036] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
                placeholder="Tu contraseña"
              />
            </div>
          </div>

          {/* Botón de login */}
          <div>
            <button
              type="submit"
              disabled={loading}
              // AJUSTE BOTÓN: bg-[#8B7355] hover-[#6F5B43]
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#8B7355] hover:bg-[#6F5B43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B7355] disabled:bg-[#E8E4D9] disabled:text-[#9A8C7D] disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </div>

          {/* Link a registro */}
          <div className="text-center">
            <p className="text-sm text-[#6B5D4D]">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="font-bold text-[#8B7355] hover:text-[#6F5B43] transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;