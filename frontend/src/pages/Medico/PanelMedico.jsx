import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig";

export default function PanelMedico() {
  const navigate = useNavigate();
  const [medico, setMedico] = useState(null);

  // ==========================================
  // NUEVOS ESTADOS PARA EL BUSCADOR DE PACIENTES
  // ==========================================
  const [busquedaPaciente, setBusquedaPaciente] = useState("");
  const [pacientes, setPacientes] = useState([]); 
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  useEffect(() => {
    const cargarMedico = async () => {
      const idUsuario = localStorage.getItem("id_usuario");

      if (!idUsuario) {
        return;
      }

      try {
        const respuesta = await apiConfig.get(`/medico/usuario/${idUsuario}`);
        setMedico(respuesta.data);

        if (respuesta.data?.id_medico) {
          localStorage.setItem("id_medico", String(respuesta.data.id_medico));
        }
      } catch (error) {
        console.error("Error al cargar datos del médico:", error);
      }
    };

    // Cargar también la lista completa de pacientes desde tu backend
    const cargarPacientes = async () => {
      try {
        const respuesta = await apiConfig.get("/paciente"); 
        setPacientes(respuesta.data);
      } catch (error) {
        console.error("Error al cargar pacientes para el buscador:", error);
      }
    };

    cargarMedico();
    cargarPacientes();
  }, []);

  // ==========================================
  // FUNCIONES DEL BUSCADOR
  // ==========================================
  const handleBuscarPaciente = (e) => {
    const texto = e.target.value;
    setBusquedaPaciente(texto);

    if (texto.trim() === "") {
      setSugerencias([]);
      setMostrarSugerencias(false);
      return;
    }

    const filtrados = pacientes.filter((p) => {
      const nombreCompleto = `${p.nombre || ""} ${p.apellido || ""}`.toLowerCase();
      const numDocumento = (p.documento || "").toString();
      return nombreCompleto.includes(texto.toLowerCase()) || numDocumento.includes(texto);
    });

    setSugerencias(filtrados);
    setMostrarSugerencias(true);
  };

  const seleccionarPaciente = (idPaciente) => {
    setMostrarSugerencias(false);
    setBusquedaPaciente(""); 
    navigate(`/tus-pacientes?id=${idPaciente}`); 
  };

  const nombre = medico
    ? `${medico.nombre || ""} `.trim()
    : "Doctor";

  const BlackedOutStyles = {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    backgroundColor: "#ffffff",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    maxHeight: "200px",
    overflowY: "auto",
    listStyle: "none",
    padding: "0",
    margin: "4px 0 0 0",
    zIndex: 100
  };

  const AtlanticHover = (e, color) => {
    e.target.style.backgroundColor = color;
  };

  const especialidad = medico?.nombre_especialidad || "Especialidad";
  const tarjetaProfesional = medico?.tarjeta_profesional || "";

  return (
    <PanelLayout
      title="Bienvenido"
      subtitle="Panel médico"
      userType="medico"
    >
      {/* 1. SECCIÓN DE BIENVENIDA */}
      <section className="pp-greeting">
        <div>
          <h1>Bienvenido Dr. {nombre}</h1>
          <p>
            {especialidad} ·{" "}
            {tarjetaProfesional
              ? `Tarjeta: ${tarjetaProfesional}`
              : "Actualiza tus datos"}
          </p>
        </div>
      </section>

      {/* 2. SECCIÓN INTERMEDIA: BUSCADOR DE PACIENTES */}
      <section style={{ margin: "0 0 25px 0", position: "relative" }}>
        <div style={{
          backgroundColor: "#fff",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          border: "1px solid #eaeaea"
        }}>
          <input
            type="text"
            placeholder="🔍 Buscar paciente por nombre, apellido o documento..."
            value={busquedaPaciente}
            onChange={handleBuscarPaciente}
            onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
            onFocus={() => busquedaPaciente && setMostrarSugerencias(true)}
            style={{
              width: "100%",
              padding: "10px 15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
              boxSizing: "border-box",
              outline: "none"
            }}
          />

          {/* LISTA FLOTANTE DE SUGERENCIAS */}
          {mostrarSugerencias && sugerencias.length > 0 && (
            <ul style={BlackedOutStyles}>
              {sugerencias.map((p) => (
                <li
                  key={p.id_paciente || p.id}
                  onMouseDown={() => seleccionarPaciente(p.id_paciente || p.id)}
                  style={{
                    padding: "12px 15px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f1f1f1",
                    fontSize: "14px",
                    color: "#333",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => AtlanticHover(e, "#f8f9fa")}
                  onMouseLeave={(e) => AtlanticHover(e, "#ffffff")}
                >
                  👤 {p.nombre} {p.apellido} {p.documento ? `(Doc: ${p.documento})` : ""}
                </li>
              ))}
            </ul>
          )}

          {/* MENSAJE CUANDO NO HAY COINCIDENCIAS */}
          {mostrarSugerencias && sugerencias.length === 0 && (
            <div style={{ ...BlackedOutStyles, padding: "12px 15px", fontSize: "14px", color: "#666", textAlign: "left" }}>
              ❌ No se encontraron pacientes registrados con ese nombre o documento.
            </div>
          )}
        </div>
      </section>

      {/* 3. SECCIÓN DE CUADRÍCULA DE TARJETAS */}
      <section className="pp-nav-grid">
        {/* Tarjeta 1: Agenda de hoy redirigida correctamente */}
        <button
          type="button"
          className="pp-nav-card"
          onClick={() => navigate("/historial-citas-med")}
        >
          <div className="pp-nav-icon pp-ic-amber">
            <i className="pi pi-list" />
          </div>
          <p className="pp-nav-title">Agenda de Hoy</p>
          <p className="pp-nav-desc">
            Consulta tus citas programadas para el día de hoy y gestiona tus consultas
          </p>
        </button>

        {/* Tarjeta 2: Tus pacientes */}
        <button
          type="button"
          className="pp-nav-card"
          onClick={() => navigate("/tus-pacientes")}
        >
          <div className="pp-nav-icon pp-ic-azul">
            <i className="pi pi-user" />
          </div>
          <p className="pp-nav-title">Tus pacientes</p>
          <p className="pp-nav-desc">
            Consulta la información de tus pacientes y sus detalles
          </p>
        </button>
        
        {/* Tarjeta 3: Programa tus citas */}
        <button
          type="button"
          className="pp-nav-card"
          onClick={() => navigate("/historial-citas-med")}
        >
          <div className="pp-nav-icon pp-ic-verde">
            <i className="pi pi-calendar-plus" />
          </div>
          <p className="pp-nav-title">Programa tus citas</p>
          <p className="pp-nav-desc">
            Agenda las citas para tus pacientes y gestiona tu calendario
          </p>
        </button>

        {/* Tarjeta 4: Mi Perfil */}
        <button
          type="button"
          className="pp-nav-card"
          onClick={() => navigate("/perfil-medico")}
        >
          <div className="pp-nav-icon pp-ic-morado">
            <i className="pi pi-id-card" />
          </div>
          <p className="pp-nav-title">Mi perfil</p>
          <p className="pp-nav-desc">
            Actualiza tus datos personales
          </p>
        </button>
      </section>
    </PanelLayout>
  );
}