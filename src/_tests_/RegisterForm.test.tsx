import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import "@testing-library/jest-dom";

describe("Pruebas unitarias para RegisterForm", () => {

  test("Muestra por defecto el formulario de estudiante", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Carrera/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse como estudiante/i)).toBeInTheDocument();
  });

  test("Cambia correctamente al formulario de empresa", () => {
    render(<RegisterForm />);

    const botonEmpresa = screen.getByText(/Empresa/i);
    fireEvent.click(botonEmpresa);

    expect(screen.getByLabelText(/Sector/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse como empresa/i)).toBeInTheDocument();
  });

  test("Valida los campos obligatorios y muestra mensajes de error", () => {
    render(<RegisterForm />);

    const botonEnviar = screen.getByRole("button", { name: /Registrarse como estudiante/i });
    fireEvent.click(botonEnviar);

    expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/El email es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
  });

});
