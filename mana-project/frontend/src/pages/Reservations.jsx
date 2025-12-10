import { useState } from "react";
import axios from "axios";
import { Minus, Plus, Calendar, Clock, Users, User, Phone, Mail, CalendarDays, CheckCircle } from "lucide-react";

const API_URL = "http://localhost:4000/api";

function Reservations() {
  const [personas, setPersonas] = useState(1);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const MAX_PERSONAS = 35;
  const MIN_PERSONAS = 1;

  // Horarios disponibles (7:30 AM - 7:00 PM)
  const horariosDisponibles = [
    "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00"
  ];

  const handlePersonasChange = (delta) => {
    setPersonas(prev => {
      const newValue = prev + delta;
      return Math.min(MAX_PERSONAS, Math.max(MIN_PERSONAS, newValue));
    });
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const formatHora = (h) => {
    const hour = parseInt(h.split(':')[0]);
    const min = h.split(':')[1];
    if (hour >= 12) {
      return `${hour === 12 ? '12' : hour - 12}:${min} PM`;
    }
    return `${h} AM`;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Solo permitir números, espacios y algunos caracteres
    const cleaned = value.replace(/[^0-9\s\-+()]/g, '');
    setTelefono(cleaned);
    
    if (cleaned && !validatePhone(cleaned)) {
      setErrors(prev => ({ ...prev, telefono: 'El número debe tener exactamente 10 dígitos' }));
    } else {
      setErrors(prev => ({ ...prev, telefono: null }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Ingresa un correo electrónico válido' }));
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
  };

  const canProceedStep1 = nombre && telefono && email && validatePhone(telefono) && validateEmail(email);
  const canProceedStep2 = fecha && hora;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fecha || !hora || !nombre || !telefono || !email) {
      return;
    }

    setSubmitting(true);

    const reservaData = {
      nombre,
      telefono,
      email,
      personas,
      fecha,
      hora
    };

    try {
      await axios.post(`${API_URL}/reservations`, reservaData);
      setSuccess(true);
    } catch (error) {
      console.error("Error al crear reserva:", error);
      alert("Error al crear la reserva. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setPersonas(1);
    setFecha("");
    setHora("");
    setNombre("");
    setTelefono("");
    setEmail("");
    setStep(1);
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Reserva Confirmada</h1>
            <p className="text-gray-600 mb-8">
              Gracias <span className="font-semibold text-amber-600">{nombre}</span>, tu reserva ha sido registrada exitosamente.
              Te contactaremos por WhatsApp para coordinar los detalles.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-3">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-amber-600" size={20} />
                <span className="text-gray-700">{new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-amber-600" size={20} />
                <span className="text-gray-700">{formatHora(hora)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-amber-600" size={20} />
                <span className="text-gray-700">{personas} {personas === 1 ? 'persona' : 'personas'}</span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full bg-amber-600 text-white py-4 rounded-xl hover:bg-amber-700 transition font-semibold"
            >
              Hacer otra reserva
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Reserva tu <span className="text-amber-600">Mesa</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Te contactaremos por WhatsApp para coordinar el menú
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= 1 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 rounded transition-all ${step >= 2 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= 2 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 rounded transition-all ${step >= 3 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= 3 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Datos de Contacto */}
          <div className={`transition-all duration-300 ${step === 1 ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <User className="text-amber-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tus Datos</h2>
                  <p className="text-gray-500 text-sm">Ingresa tu información de contacto</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="Juan Pérez"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={telefono}
                      onChange={handlePhoneChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.telefono ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'
                      }`}
                      placeholder="300 123 4567"
                      maxLength={15}
                    />
                  </div>
                  {errors.telefono && (
                    <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'
                      }`}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full mt-8 bg-amber-600 text-white py-4 rounded-xl hover:bg-amber-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          </div>

          {/* Step 2: Fecha y Hora */}
          <div className={`transition-all duration-300 ${step === 2 ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Calendar className="text-amber-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Fecha y Hora</h2>
                  <p className="text-gray-500 text-sm">Elige cuándo quieres visitarnos</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Selecciona la fecha</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    min={getMinDate()}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Clock size={16} />
                    Horario disponible: 7:30 AM - 7:00 PM
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {horariosDisponibles.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHora(h)}
                        className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                          hora === h
                            ? 'bg-amber-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                        }`}
                      >
                        {formatHora(h)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-amber-600 text-white py-4 rounded-xl hover:bg-amber-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Número de Personas */}
          <div className={`transition-all duration-300 ${step === 3 ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Users className="text-amber-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Número de Personas</h2>
                  <p className="text-gray-500 text-sm">Máximo {MAX_PERSONAS} personas por reserva</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 py-10">
                <button
                  type="button"
                  onClick={() => handlePersonasChange(-1)}
                  disabled={personas <= MIN_PERSONAS}
                  className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-100 hover:bg-gray-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus size={28} />
                </button>
                
                <div className="text-center">
                  <span className="text-7xl font-bold text-gray-900">{personas}</span>
                  <p className="text-gray-500 mt-2 text-lg">
                    {personas === 1 ? "persona" : "personas"}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => handlePersonasChange(1)}
                  disabled={personas >= MAX_PERSONAS}
                  className="w-16 h-16 flex items-center justify-center rounded-2xl bg-amber-600 text-white hover:bg-amber-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={28} />
                </button>
              </div>

              {/* Resumen */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Resumen de tu reserva</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre:</span>
                    <span className="font-medium text-gray-900">{nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-medium text-gray-900">
                      {fecha ? new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-medium text-gray-900">{hora ? formatHora(hora) : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personas:</span>
                    <span className="font-medium text-gray-900">{personas}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-amber-600 text-white py-4 rounded-xl hover:bg-amber-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Procesando..." : "Confirmar Reserva"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reservations;
