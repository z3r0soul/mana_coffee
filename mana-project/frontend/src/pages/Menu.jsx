import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "/api/menu";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    tipo: "CAFETERIA",
  });

  // Cargar items del menú
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar el menú:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Actualizar item existente
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Item actualizado exitosamente");
      } else {
        // Crear nuevo item
        await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Item agregado exitosamente");
      }

      // Limpiar formulario
      setFormData({ nombre: "", descripcion: "", precio: "", tipo: "CAFETERIA" });
      setShowForm(false);
      setEditingId(null);

      // Recargar menú
      fetchMenuItems();
    } catch (error) {
      console.error("Error al guardar item:", error);
      alert("Error al guardar el item");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      nombre: item.nombre,
      descripcion: item.descripcion || "",
      precio: item.precio,
      tipo: item.tipo,
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este item?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMenuItems();
        alert("Item eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el item");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">Cargando menú...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-2">
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setFormData({ nombre: "", descripcion: "", precio: "", tipo: "CAFETERIA" });
                setEditingId(null);
              }
            }}
            className="mt-6 bg-[#8C705F] text-white px-8 py-3 rounded-xl hover:bg-[#6F4E37] transition shadow-lg font-semibold"
          >
            {showForm ? "Cancelar" : "Agregar Nuevo Item"}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-2xl mx-auto border border-[#E8E4D9]">
            <h2 className="text-3xl font-bold mb-6 text-[#6F4E37]">
              {editingId ? "Editar Item del Menú" : "Agregar Item al Menú"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#8C705F] uppercase tracking-wider mb-2">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355]/20 transition-all"
                  placeholder="Ej: Café Americano"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#8C705F] uppercase tracking-wider mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355]/20 transition-all"
                  placeholder="Describe el producto..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#8C705F] uppercase tracking-wider mb-2">
                  Precio ($)
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355]/20 transition-all"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#8C705F] uppercase tracking-wider mb-2">
                  Tipo de Producto
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[#8B7355]/20 transition-all"
                >
                  <option value="CAFETERIA">Cafetería</option>
                  <option value="DESAYUNO">Desayuno</option>
                  <option value="ALMUERZO">Almuerzo</option>
                  <option value="CENA">Cena</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8C705F] text-white py-4 rounded-xl hover:bg-[#6F4E37] transition-all font-bold text-lg shadow-lg active:scale-95"
              >
                {editingId ? "Actualizar Item" : "Agregar Item"}
              </button>
            </form>
          </div>
        )}

        {/* Grid de items del menú */}
        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-[#8C705F] font-medium">
              No hay items en el menú todavía
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => {
              const tipoColors = {
                CAFETERIA: "bg-amber-100 text-amber-800",
                DESAYUNO: "bg-orange-100 text-orange-800",
                ALMUERZO: "bg-green-100 text-green-800",
                CENA: "bg-purple-100 text-purple-800"
              };

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col border border-[#E8E4D9] hover:border-[#8B7355]"
                >
                  {/* Badge del tipo */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${tipoColors[item.tipo]}`}>
                      {item.tipo}
                    </span>
                  </div>

                  {/* Nombre del producto */}
                  <h3 className="text-xl font-bold text-[#6F4E37] mb-2">
                    {item.nombre}
                  </h3>

                  {/* Descripción */}
                  {item.descripcion && (
                    <p className="text-[#8C705F] text-sm mb-4 flex-grow">
                      {item.descripcion}
                    </p>
                  )}

                  {/* Precio formateado */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#8B7355]">
                      ${formatPrice(item.precio)}
                    </span>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-full bg-[#8C705F] text-white px-4 py-2.5 rounded-xl hover:bg-[#6F4E37] transition-all text-sm font-bold shadow-md active:scale-95"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-full bg-[#5D4037] text-white px-4 py-2.5 rounded-xl hover:bg-[#4E342E] transition-all text-sm font-bold shadow-md active:scale-95"
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* Fecha */}
                  <div className="mt-3 text-xs text-[#9A8C7D] text-center font-medium">
                    {new Date(item.fecha).toLocaleDateString('es-ES')}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
