import RegisterForm from "./components/RegisterForm";
import Vacancies from "./components/Vacancies";
import Reports from "./components/Reports";


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
    </div>
  )
}
