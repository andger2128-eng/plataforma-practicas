<<<<<<< HEAD
import RegisterForm from "./components/RegisterForm";
import Vacancies from "./components/Vacancies";
import Reports from "./components/Reports";
=======
<<<<<<< HEAD
import React from 'react'
import RegisterForm from './components/RegisterForm'
import Vacancies from './components/Vacancies'
import Reports from './components/Reports'
=======
import RegisterForm from "./components/RegisterForm";
import Vacancies from "./components/Vacancies";
import Reports from "./components/Reports";
>>>>>>> 9c336c6 (Agrego configuración de Jest y Babel para pruebas unitarias)
>>>>>>> 5d4dd66 (Configuración de Jest, Babel y nuevas pruebas unitarias)

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Portal de Prácticas</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">1. Registro Estudiantes/Empresas</h2>
        <RegisterForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Publicación y postulación a vacantes</h2>
        <Vacancies />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Registrar informe de práctica</h2>
        <Reports />
      </section>
<<<<<<< HEAD
=======

      {/* 👇 Footer agregado aquí */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#666",
          borderTop: "1px solid #ddd",
          paddingTop: "1rem"
        }}
      >
        <p>✅ Despliegue exitoso en Netlify</p>
        <p>Versión: {import.meta.env.VITE_APP_VERSION}</p>
        <p>Fecha de build: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
}
>>>>>>> 5d4dd66 (Configuración de Jest, Babel y nuevas pruebas unitarias)

      {/* 👇 Footer agregado aquí */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#666",
          borderTop: "1px solid #ddd",
          paddingTop: "1rem"
        }}
      >
        <p>✅ Despliegue exitoso en Netlify</p>
        <p>Versión: {import.meta.env.VITE_APP_VERSION}</p>
        <p>Fecha de build: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
}
