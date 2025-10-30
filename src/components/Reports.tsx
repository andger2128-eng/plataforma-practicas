import React, { useState, useEffect } from 'react';

interface Report {
  id: number;
  title: string;
  content: string;
  studentName: string;
  companyName: string;
  startDate: string;
  endDate: string;
  activities: string;
  learnings: string;
  difficulties: string;
  recommendations: string;
  submissionDate: string;
  status: string;
  feedback: string;
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [viewMode, setViewMode] = useState<'student' | 'company'>('student');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    activities: '',
    learnings: '',
    difficulties: '',
    recommendations: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setReports([
      {
        id: 1,
        title: 'Informe de práctica - Primera semana',
        content: 'Durante mi primera semana en la empresa, me familiaricé con los procesos internos y herramientas utilizadas por el equipo de desarrollo.',
        studentName: 'Juan Pérez',
        companyName: 'Tech Solutions',
        startDate: '2023-10-01',
        endDate: '2023-10-07',
        activities: 'Instalación del entorno de desarrollo, revisión de documentación del proyecto, reunión inicial con el equipo.',
        learnings: 'Aprendí sobre la arquitectura del sistema y buenas prácticas de desarrollo.',
        difficulties: 'Puntos complejos de configuración del entorno.',
        recommendations: 'Documentar los procesos de instalación para nuevos practicantes.',
        submissionDate: '2023-10-08',
        status: 'aprobado',
        feedback: 'Buen trabajo inicial. Se recomienda profundizar en la documentación técnica.'
      },
      {
        id: 2,
        title: 'Informe de práctica - Segunda semana',
        content: 'Esta semana trabajé en el desarrollo de nuevos componentes para la aplicación web utilizando React.',
        studentName: 'María García',
        companyName: 'Creative Agency',
        startDate: '2023-10-08',
        endDate: '2023-10-14',
        activities: 'Desarrollo de componentes React, revisión de código con el equipo, participación en reuniones de planificación.',
        learnings: 'Mejoré mis habilidades en React y aprendí sobre el flujo de trabajo de desarrollo en equipo.',
        difficulties: 'Integración con APIs complejas.',
        recommendations: 'Ofrecer más talleres sobre manejo de estado en aplicaciones React.',
        submissionDate: '2023-10-15',
        status: 'pendiente',
        feedback: ''
      }
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateReportForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.content.trim()) newErrors.content = 'El contenido es obligatorio';
    if (!formData.startDate) newErrors.startDate = 'La fecha de inicio es obligatoria';
    if (!formData.endDate) newErrors.endDate = 'La fecha de fin es obligatoria';
    if (!formData.activities.trim()) newErrors.activities = 'Las actividades son obligatorias';
    if (!formData.learnings.trim()) newErrors.learnings = 'Los aprendizajes son obligatorios';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateReportForm()) {
      const newReport: Report = {
        id: reports.length + 1,
        ...formData,
        studentName: 'Estudiante Ejemplo',
        companyName: 'Empresa Ejemplo',
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'pendiente',
        feedback: ''
      };
      
      setReports([newReport, ...reports]);
      
      setFormData({
        title: '',
        content: '',
        startDate: '',
        endDate: '',
        activities: '',
        learnings: '',
        difficulties: '',
        recommendations: ''
      });
      
      setShowReportForm(false);
      setSuccessMessage('Informe enviado exitosamente');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleStatusChange = (reportId: number, newStatus: string) => {
    const updatedReports = reports.map(report => 
      report.id === reportId 
        ? { ...report, status: newStatus }
        : report
    );
    
    setReports(updatedReports);
    setSuccessMessage(`Estado del informe actualizado a: ${newStatus}`);
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const viewReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`Viendo informe: ${report.title}\n\n${report.content}`);
    }
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
          <h3 className="text-lg font-semibold">Informes de Práctica</h3>
          <p className="text-gray-600">Registra y gestiona informes de progreso</p>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'student' | 'company')}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="student">Vista Estudiante</option>
            <option value="company">Vista Empresa</option>
          </select>
          
          {viewMode === 'student' && (
            <button
              onClick={() => setShowReportForm(!showReportForm)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {showReportForm ? 'Cancelar' : 'Nuevo Informe'}
            </button>
          )}
        </div>
      </div>
      
      {viewMode === 'student' && showReportForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3">Registrar Nuevo Informe</h4>
          
          <form onSubmit={handleSubmitReport}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Título del informe
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej. Informe de práctica - Primera semana"
              />
              {errors.title && <p className="text-red-500 text-xs italic mt-1">{errors.title}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.startDate && <p className="text-red-500 text-xs italic mt-1">{errors.startDate}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.endDate && <p className="text-red-500 text-xs italic mt-1">{errors.endDate}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Resumen del periodo
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                placeholder="Describe brevemente lo más destacado del periodo reportado"
              ></textarea>
              {errors.content && <p className="text-red-500 text-xs italic mt-1">{errors.content}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activities">
                Actividades realizadas
              </label>
              <textarea
                id="activities"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                placeholder="Lista las principales actividades que realizaste"
              ></textarea>
              {errors.activities && <p className="text-red-500 text-xs italic mt-1">{errors.activities}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="learnings">
                Aprendizajes adquiridos
              </label>
              <textarea
                id="learnings"
                name="learnings"
                value={formData.learnings}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                placeholder="Describe lo que aprendiste durante este periodo"
              ></textarea>
              {errors.learnings && <p className="text-red-500 text-xs italic mt-1">{errors.learnings}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulties">
                Dificultades encontradas (opcional)
              </label>
              <textarea
                id="difficulties"
                name="difficulties"
                value={formData.difficulties}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={2}
                placeholder="Describe las dificultades que enfrentaste y cómo las superaste"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendations">
                Recomendaciones (opcional)
              </label>
              <textarea
                id="recommendations"
                name="recommendations"
                value={formData.recommendations}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={2}
                placeholder="Sugerencias para mejorar el programa de prácticas"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Enviar Informe
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {viewMode === 'student' ? 'Empresa' : 'Estudiante'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Período
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de envío
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length > 0 ? (
              reports.map(report => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {viewMode === 'student' ? report.companyName : report.studentName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(report.submissionDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'aprobado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewReport(report.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Ver
                    </button>
                    
                    {viewMode === 'company' && report.status === 'pendiente' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(report.id, 'aprobado')}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleStatusChange(report.id, 'rechazado')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  No hay informes disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
