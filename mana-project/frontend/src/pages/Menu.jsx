import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/menu";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
      await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Limpiar formulario
      setFormData({ nombre: "", descripcion: "", precio: "", tipo: "CAFETERIA" });
      setShowForm(false);
      
      // Recargar menú
      fetchMenuItems();
      alert("Item agregado exitosamente");
    } catch (error) {
      console.error("Error al crear item:", error);
      alert("Error al crear el item");
    }
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
          >
            {showForm ? "Cancelar" : "Agregar Nuevo Item"}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Agregar Item al Menú</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Ej: Café Americano"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Describe el producto..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Producto
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="CAFETERIA">Cafetería</option>
                  <option value="DESAYUNO">Desayuno</option>
                  <option value="ALMUERZO">Almuerzo</option>
                  <option value="CENA">Cena</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition font-semibold"
              >
                Agregar Item
              </button>
            </form>
          </div>
        )}

        {/* Grid de items del menú */}
        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
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
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col"
                >
                  {/* Badge del tipo */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tipoColors[item.tipo]}`}>
                      {item.tipo}
                    </span>
                  </div>

                  {/* Nombre del producto */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.nombre}
                  </h3>

                  {/* Descripción */}
                  {item.descripcion && (
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {item.descripcion}
                    </p>
                  )}

                  {/* Precio formateado */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-amber-600">
                      ${formatPrice(item.precio)}
                    </span>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                  >
                    Eliminar
                  </button>

                  {/* Fecha */}
                  <div className="mt-2 text-xs text-gray-400 text-center">
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
