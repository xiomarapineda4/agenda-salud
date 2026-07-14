import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig";

export default function TusPacientes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 🚀 CORREGIDO: Convertimos explícitamente a número para evitar conflictos String vs Number
  const paramId = searchParams.get("id");
  const idPacienteSeleccionado = paramId ? Number(paramId) : null;

  // Estados para la base de datos
  const [listaPacientes, setListaPacientes] = useState([]);
  const [pacienteDetalle, setPacienteDetalle] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  // 1. Cargar todos los pacientes de la base de datos al abrir la página
  useEffect(() => {
    const obtenerTodosLosPacientes = async () => {
      try {
        const respuesta = await apiConfig.get("/paciente");
        setListaPacientes(respuesta.data);
      } catch (error) {
        console.error("Error al cargar la lista de pacientes desde el backend:", error);
      }
    };
    obtenerTodosLosPacientes();
  }, []);

  // 2. Cada vez que cambie el ID en la URL, cargamos su expediente clínico detallado
  useEffect(() => {
    if (idPacienteSeleccionado) {
      const obtenerDetallePaciente = async () => {
        setCargandoDetalle(true);
        try {
          const respuesta = await apiConfig.get(`/paciente/${idPacienteSeleccionado}`);
          setPacienteDetalle(respuesta.data);
        } catch (error) {
          console.error("Error al cargar el detalle del paciente:", error);
          setPacienteDetalle(null);
        } finally {
          setCargandoDetalle(false);
        }
      };
      obtenerDetallePaciente();
    } else {
      setPacienteDetalle(null);
    }
  }, [idPacienteSeleccionado]);

  // 3. Filtro en tiempo real para buscar dentro de esta misma pantalla
  const pacientesFiltrados = listaPacientes.filter((p) => {
    const nombreCompleto = `${p.nombre || ""} ${p.apellido || ""}`.toLowerCase();
    const doc = (p.documento || "").toString();
    return nombreCompleto.includes(busqueda.toLowerCase()) || doc.includes(busqueda);
  });

  return (
    <PanelLayout
      title="Tus Pacientes"
      subtitle="Lista de pacientes asignados"
      userType="medico"
    >
      {/* Mantenemos la sección de bienvenida estilizada */}
      <section className="pp-greeting" style={{ marginBottom: "20px" }}>
        <div>
          <h1>Pacientes</h1>
          <p>Aquí podrás consultar la información de tus pacientes asignados en la base de datos.</p>
        </div>
      </section>

      {/* Botón de navegación para regresar */}
      <button 
        onClick={() => navigate("/panel-medico")}
        style={{ marginBottom: "25px", padding: "8px 16px", cursor: "pointer", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#f8f9fa", fontWeight: "500" }}
      >
        ⬅️ Volver al Panel Principal
      </button>

      {/* CONTENEDOR DE DOS COLUMNAS */}
      <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
        
        {/* COLUMNA IZQUIERDA: TABLA DEL DIRECTORIO */}
        <div style={{ flex: "1 1 500px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ marginTop: 0, marginBottom: "15px" }}>👥 Directorio General ({listaPacientes.length})</h3>
          
          <input
            type="text"
            placeholder="Filtrar por nombre o cédula..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ width: "100%", padding: "11px", marginBottom: "20px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />

          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f4f6f9", textAlign: "left" }}>
                  <th style={{ padding: "12px 10px", borderBottom: "2px solid #dee2e6" }}>Nombre Completo</th>
                  <th style={{ padding: "12px 10px", borderBottom: "2px solid #dee2e6" }}>N° Documento</th>
                  <th style={{ padding: "12px 10px", borderBottom: "2px solid #dee2e6" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pacientesFiltrados.map((p) => (
                  <tr 
                    key={p.id_paciente} 
                    style={{ 
                      borderBottom: "1px solid #eee", 
                      backgroundColor: idPacienteSeleccionado === p.id_paciente ? "#e8f4fd" : "transparent" 
                    }}
                  >
                    <td style={{ padding: "12px 10px", fontWeight: idPacienteSeleccionado === p.id_paciente ? "bold" : "normal" }}>
                      {p.nombre || "Sin nombre"} {p.apellido || ""}
                    </td>
                    <td style={{ padding: "12px 10px" }}>{p.documento || "N/A"}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <button
                        onClick={() => navigate(`/tus-pacientes?id=${p.id_paciente}`)}
                        style={{ padding: "6px 12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
                      >
                        👁️ Ver Ficha
                      </button>
                    </td>
                  </tr>
                ))}
                {pacientesFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ padding: "20px", textAlign: "center", color: "#888" }}> No se encontraron pacientes en el sistema.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* COLUMNA DERECHA: EXPEDIENTE CLÍNICO */}
        <div style={{ flex: "1 1 400px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", minHeight: "350px" }}>
          <h3 style={{ marginTop: 0 }}>📋 Expediente Clínico</h3>
          <hr style={{ border: "0", borderTop: "1px solid #eee", marginBottom: "20px" }} />

          {cargandoDetalle ? (
            <p style={{ textAlign: "center", color: "#666", paddingTop: "30px" }}>🔄 Buscando historial clínico en MySQL...</p>
          ) : pacienteDetalle && Number(pacienteDetalle.id_paciente) === idPacienteSeleccionado ? (
            <div style={{ lineHeight: "1.6" }}>
              <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px", borderLeft: "4px solid #007bff" }}>
                <h4 style={{ margin: "0 0 5px 0", color: "#007bff", fontSize: "16px" }}>
                  {pacienteDetalle.nombre} {pacienteDetalle.apellido}
                </h4>
                <p style={{ margin: "0", fontSize: "13px", color: "#666" }}>📧 {pacienteDetalle.correo || "Sin correo registrado"}</p>
              </div>

              <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px 0", fontWeight: "bold", color: "#555", width: "40%" }}>🩸 Tipo de Sangre:</td>
                    <td style={{ padding: "10px 0" }}>{pacienteDetalle.tipo_sangre || "No asignado"}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 0", fontWeight: "bold", color: "#555" }}>⚥ Sexo:</td>
                    <td style={{ padding: "10px 0", textTransform: "capitalize" }}>{pacienteDetalle.sexo || "No asignado"}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 0", fontWeight: "bold", color: "#555" }}>📅 F. Nacimiento:</td>
                    <td style={{ padding: "10px 0" }}>
                      {pacienteDetalle.fecha_nacimiento 
                        ? new Date(pacienteDetalle.fecha_nacimiento).toLocaleDateString() 
                        : "No asignada"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 0", fontWeight: "bold", color: "#555" }}>📞 Teléfono:</td>
                    <td style={{ padding: "10px 0" }}>{pacienteDetalle.telefono || "No registrado"}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 0", fontWeight: "bold", color: "#555" }}>📍 Dirección:</td>
                    <td style={{ padding: "10px 0" }}>{pacienteDetalle.direccion || "No registrada"}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 0", fontWeight: "bold", color: "#555" }}>🟢 Estado del Usuario:</td>
                    <td style={{ padding: "10px 0" }}>
                      <span style={{ 
                        padding: "4px 10px", 
                        borderRadius: "12px", 
                        fontSize: "12px", 
                        fontWeight: "bold", 
                        backgroundColor: pacienteDetalle.estado === "activo" ? "#d4edda" : "#f8d7da", 
                        color: pacienteDetalle.estado === "activo" ? "#155724" : "#721c24",
                        textTransform: "uppercase"
                      }}>
                        {pacienteDetalle.estado || "ACTIVO"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#999", paddingTop: "50px" }}>
              <p style={{ fontSize: "45px", margin: "0" }}>🔍</p>
              <p style={{ fontSize: "14px", padding: "0 20px" }}>
                Selecciona un paciente del directorio izquierdo o utiliza el buscador del panel para inspeccionar sus datos clínicos.
              </p>
            </div>
          )}
        </div>

      </div>
    </PanelLayout>
  );
}