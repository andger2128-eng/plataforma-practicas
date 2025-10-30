import React, { useState } from 'react';

export default function RegisterForm() {
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Campos específicos de estudiante
    career: '',
    university: '',
    semester: '',
    // Campos específicos de empresa
    companyName: '',
    sector: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    if (!formData.password.trim()) newErrors.password = 'La contraseña es obligatoria';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (userType === 'student') {
      if (!formData.career.trim()) newErrors.career = 'La carrera es obligatoria';
      if (!formData.university.trim()) newErrors.university = 'La universidad es obligatoria';
      if (!formData.semester.trim()) newErrors.semester = 'El semestre es obligatorio';
    } else {
      if (!formData.companyName.trim()) newErrors.companyName = 'El nombre de la empresa es obligatorio';
      if (!formData.sector.trim()) newErrors.sector = 'El sector es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log(`${userType === 'student' ? 'Estudiante' : 'Empresa'} registrado:`, formData);
      setSuccessMessage(`${userType === 'student' ? 'Estudiante' : 'Empresa'} registrado exitosamente`);
      
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        career: '',
        university: '',
        semester: '',
        companyName: '',
        sector: '',
        description: ''
      });
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setUserType('student')}
          >
            Estudiante
          </button>
          <button
            className={`px-4 py-2 rounded ${userType === 'company' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setUserType('company')}
          >
            Empresa
          </button>
        </div>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              {userType === 'student' ? 'Nombre completo' : 'Nombre de la empresa'}
            </label>
            <input
              type="text"
              id="name"
              name={userType === 'student' ? 'name' : 'companyName'}
              value={userType === 'student' ? formData.name : formData.companyName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={userType === 'student' ? 'Ingresa tu nombre completo' : 'Ingresa el nombre de la empresa'}
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
            {errors.companyName && <p className="text-red-500 text-xs italic mt-1">{errors.companyName}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
          </div>
          
          {userType === 'student' ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="career">
                  Carrera
                </label>
                <input
                  type="text"
                  id="career"
                  name="career"
                  value={formData.career}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej. Ingeniería de Sistemas"
                />
                {errors.career && <p className="text-red-500 text-xs italic mt-1">{errors.career}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="university">
                  Universidad
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej. Universidad Nacional"
                />
                {errors.university && <p className="text-red-500 text-xs italic mt-1">{errors.university}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                  Semestre
                </label>
                <input
                  type="text"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej. VI semestre"
                />
                {errors.semester && <p className="text-red-500 text-xs italic mt-1">{errors.semester}</p>}
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sector">
                  Sector
                </label>
                <input
                  type="text"
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej. Tecnología, Finanzas, Salud"
                />
                {errors.sector && <p className="text-red-500 text-xs italic mt-1">{errors.sector}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Descripción de la empresa
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  placeholder="Breve descripción de la empresa"
                ></textarea>
              </div>
            </>
          )}
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {userType === 'student' ? 'Registrarse como estudiante' : 'Registrarse como empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
