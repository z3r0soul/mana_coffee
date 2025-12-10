import { useState, useRef } from 'react';
import axios from 'axios';
import { Calendar, Coffee, LogOut, UtensilsCrossed, Upload, Image, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Menu from '../pages/Menu';
import AdminReservations from '../pages/Admin_reservations';

const LOGOUT_API_URL = "/api/auth/logout";
const LUNCH_API_URL = "/api/lunch";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reservations');
  const [lunchImage, setLunchImage] = useState(null);
  const [lunchPreview, setLunchPreview] = useState(null);
  const [uploadingLunch, setUploadingLunch] = useState(false);
  const fileInputRef = useRef(null);

  const handleLunchImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen no debe superar los 5MB");
        return;
      }
      setLunchImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLunchPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadLunch = async () => {
    if (!lunchImage) {
      alert("Selecciona una imagen primero");
      return;
    }

    setUploadingLunch(true);
    try {
      const formData = new FormData();
      formData.append('imagen', lunchImage);

      await axios.post(`${LUNCH_API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert("Imagen del almuerzo actualizada exitosamente");
      setLunchImage(null);
      setLunchPreview(null);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir la imagen del almuerzo");
    } finally {
      setUploadingLunch(false);
    }
  };

  const clearLunchImage = () => {
    setLunchImage(null);
    setLunchPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_API_URL, {}, { //axios post envia la petición al backend
        withCredentials: true, //envia las cookies con la petición
      });
      alert("Sesión cerrada");
      navigate("/"); //reenvio al usuario a la pagina de inicio
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
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'reservations'
              ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white shadow-lg'
              : 'text-gray-700 hover:bg-mana-cream/50'
              }`}
          >
            <Calendar size={18} />
            Reservaciones
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'menu'
              ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white shadow-lg'
              : 'text-gray-700 hover:bg-mana-cream/50'
              }`}
          >
            <Coffee size={18} />
            Menú
          </button>
          <button
            onClick={() => setActiveTab('almuerzo')}
            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'almuerzo'
              ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white shadow-lg'
              : 'text-gray-700 hover:bg-mana-cream/50'
              }`}
          >
            <UtensilsCrossed size={18} />
            Almuerzo
          </button>
        </div>

        {/* Content */}
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

        {activeTab === 'almuerzo' && (
          <div>
            <h2 className="text-3xl font-bold text-mana-brown mb-6 flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8" />
              Almuerzo del Día
            </h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-mana-brown/10">
              <p className="text-gray-700 mb-6">
                Sube la imagen del menú del almuerzo diario. Esta imagen se mostrará a los clientes en la sección de almuerzo.
              </p>

              {/* Área de carga de imagen */}
              <div className="max-w-xl mx-auto">
                {/* Input de archivo oculto */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLunchImageChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Preview o área de drop */}
                {lunchPreview ? (
                  <div className="relative">
                    <img
                      src={lunchPreview}
                      alt="Preview del almuerzo"
                      className="w-full h-80 object-cover rounded-2xl shadow-lg border-2 border-[#8B7355]"
                    />
                    <button
                      onClick={clearLunchImage}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <X size={20} className="text-gray-700" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-3 border-dashed border-[#8B7355]/50 rounded-2xl p-12 text-center cursor-pointer hover:border-[#8B7355] hover:bg-[#FAF9F6] transition-all"
                  >
                    <div className="bg-gradient-to-br from-[#D4C5A9]/40 to-[#C9B99A]/60 p-6 rounded-full inline-block mb-4">
                      <Image size={48} className="text-[#8B7355]" />
                    </div>
                    <p className="text-lg font-semibold text-[#6F4E37] mb-2">
                      Haz clic para seleccionar una imagen
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG o WEBP (máx. 5MB)
                    </p>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#FAF9F6] text-[#6F4E37] px-6 py-3 rounded-xl hover:bg-[#E8E4D9] transition-all font-semibold border border-[#E8E4D9]"
                  >
                    <Upload size={20} />
                    Seleccionar imagen
                  </button>
                  <button
                    onClick={handleUploadLunch}
                    disabled={!lunchImage || uploadingLunch}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      lunchImage && !uploadingLunch
                        ? 'bg-gradient-to-r from-mana-brown to-[#8B6F47] text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {uploadingLunch ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <UtensilsCrossed size={20} />
                        Actualizar almuerzo
                      </>
                    )}
                  </button>
                </div>

                {/* Nota informativa */}
                <div className="mt-6 p-4 bg-gradient-to-r from-[#FFFDD0]/30 to-[#F5E6C3]/30 rounded-xl border border-[#C9A875]/30">
                  <p className="text-sm text-[#8B6F47]">
                    <strong>Nota:</strong> La imagen del almuerzo se mostrará en el constructor de almuerzos disponible de 11:45 AM a 3:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;