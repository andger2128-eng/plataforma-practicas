import React, { useState, useEffect } from 'react';

interface Vacancy {
  id: number;
  title: string;
  company: string;
  description: string;
  requirements: string;
  benefits: string;
  location: string;
  type: string;
  duration: string;
  postedDate: string;
  applications: number[];
}

interface Application {
  id: number;
  vacancyId: number;
  studentName: string;
  applicationDate: string;
  status: string;
}

export default function Vacancies() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    benefits: '',
    location: '',
    type: 'presencial',
    duration: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setVacancies([
      {
        id: 1,
        title: 'Pasantía en Desarrollo Web',
        company: 'Tech Solutions',
        description: 'Buscamos estudiantes para desarrollar aplicaciones web modernas.',
        requirements: 'Conocimientos de HTML, CSS, JavaScript. React es un plus.',
        benefits: 'Flexibilidad horaria, experiencia práctica, posibilidad de contratación.',
        location: 'Lima',
        type: 'híbrido',
        duration: '3 meses',
        postedDate: '2023-10-15',
        applications: []
      },
      {
        id: 2,
        title: 'Práctica en Marketing Digital',
        company: 'Creative Agency',
        description: 'Oportunidad para aprender sobre estrategias de marketing digital y redes sociales.',
        requirements: 'Estudiante de Marketing o carreras afines. Creatividad y proactividad.',
        benefits: 'Entrenamiento en herramientas de marketing, certificaciones.',
        location: 'Arequipa',
        type: 'remoto',
        duration: '4 meses',
        postedDate: '2023-10-10',
        applications: []
      }
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateVacancyForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.company.trim()) newErrors.company = 'La empresa es obligatoria';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!formData.requirements.trim()) newErrors.requirements = 'Los requisitos son obligatorios';
    if (!formData.location.trim()) newErrors.location = 'La ubicación es obligatoria';
    if (!formData.duration.trim()) newErrors.duration = 'La duración es obligatoria';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostVacancy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateVacancyForm()) {
      const newVacancy: Vacancy = {
        id: vacancies.length + 1,
        ...formData,
        postedDate: new Date().toISOString().split('T')[0],
        applications: []
      };
      
      setVacancies([newVacancy, ...vacancies]);
      
      setFormData({
        title: '',
        company: '',
        description: '',
        requirements: '',
        benefits: '',
        location: '',
        type: 'presencial',
        duration: ''
      });
      
      setShowVacancyForm(false);
      setSuccessMessage('Vacante publicada exitosamente');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleApply = (vacancyId: number) => {
    const alreadyApplied = applications.some(app => app.vacancyId === vacancyId);
    
    if (alreadyApplied) {
      alert('Ya has postulado a esta vacante');
      return;
    }
    
    const newApplication: Application = {
      id: applications.length + 1,
      vacancyId,
      studentName: 'Estudiante Ejemplo',
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'pendiente'
    };
    
    setApplications([...applications, newApplication]);
    
    const updatedVacancies = vacancies.map(vacancy => 
      vacancy.id === vacancyId 
        ? { ...vacancy, applications: [...vacancy.applications, newApplication.id] }
        : vacancy
    );
    
    setVacancies(updatedVacancies);
    setSuccessMessage('Postulación enviada exitosamente');
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Gestión de Vacantes</h3>
          <p className="text-gray-600">Publica y postula a oportunidades de prácticas</p>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'student' | 'company')}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="student">Vista Estudiante</option>
            <option value="company">Vista Empresa</option>
          </select>
          
          {userType === 'company' && (
            <button
              onClick={() => setShowVacancyForm(!showVacancyForm)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {showVacancyForm ? 'Cancelar' : 'Nueva Vacante'}
            </button>
          )}
        </div>
      </div>
      
      {userType === 'company' && showVacancyForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3">Publicar Nueva Vacante</h4>
          
          <form onSubmit={handlePostVacancy}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Título de la vacante
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej. Pasantía en Desarrollo Web"
                />
                {errors.title && <p className="text-red-500 text-xs italic mt-1">{errors.title}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre de tu empresa"
                />
                {errors.company && <p className="text-red-500 text-xs italic mt-1">{errors.company}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                placeholder="Describe brevemente las responsabilidades y objetivos de la práctica"
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirements">
                Requisitos
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                placeholder="Describe los requisitos necesarios para aplicar"
              ></textarea>
              {errors.requirements && <p className="text-red-500 text-xs italic mt-1">{errors.requirements}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="benefits">
                Beneficios (opcional)
              </label>
              <textarea
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={2}
                placeholder="Describe los beneficios que ofreces"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  Ubicación
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej. Lima"
                />
                {errors.location && <p className="text-red-500 text-xs italic mt-1">{errors.location}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  Modalidad
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                  <option value="híbrido">Híbrido</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                  Duración
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej. 3 meses"
                />
                {errors.duration && <p className="text-red-500 text-xs italic mt-1">{errors.duration}</p>}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Publicar Vacante
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="space-y-4">
        {vacancies.length > 0 ? (
          vacancies.map(vacancy => (
            <div key={vacancy.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{vacancy.title}</h4>
                  <p className="text-gray-600">{vacancy.company}</p>
                </div>
                <div className="flex space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {vacancy.type}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {vacancy.duration}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-700">{vacancy.description}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700">Requisitos:</p>
                <p className="text-sm text-gray-600">{vacancy.requirements}</p>
              </div>
              
              {vacancy.benefits && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-700">Beneficios:</p>
                  <p className="text-sm text-gray-600">{vacancy.benefits}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  {vacancy.location}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Publicado: {vacancy.postedDate}</span>
                  
                  {userType === 'student' ? (
                    <button
                      onClick={() => handleApply(vacancy.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                      disabled={applications.some(app => app.vacancyId === vacancy.id)}
                    >
                      {applications.some(app => app.vacancyId === vacancy.id) ? 'Ya postulado' : 'Postular'}
                    </button>
                  ) : (
                    <div className="text-sm text-gray-600">
                      Postulaciones: {vacancy.applications.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay vacantes disponibles en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
