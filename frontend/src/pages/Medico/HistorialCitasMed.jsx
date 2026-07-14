import { useEffect, useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig";

export default function HistorialCitasMed() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🚀 DINÁMICO: Recuperamos el ID real del médico que inició sesión
  const idMedico = localStorage.getItem("id_medico");

  useEffect(() => {
    const obtenerAgenda = async () => {
      // Si por alguna razón no hay ID de médico en el almacenamiento, no hacemos la petición
      if (!idMedico) {
        console.warn("No se encontró el id_medico en el localStorage.");
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        // Hacemos la petición al endpoint usando el ID del médico real logueado
        const respuesta = await apiConfig.get(`/cita/medico/${idMedico}`);
        setCitas(respuesta.data);
      } catch (error) {
        console.error("Error al cargar la agenda del médico:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerAgenda();
  }, [idMedico]);

  // Función auxiliar para darle color a las etiquetas de estado
  const getBadgeStyle = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pendiente":
        return { backgroundColor: "#fff3cd", color: "#856404", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "12px" };
      case "confirmada":
        return { backgroundColor: "#d4edda", color: "#155724", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "12px" };
      case "cancelada":
        return { backgroundColor: "#f8d7da", color: "#721c24", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "12px" };
      default:
        return { backgroundColor: "#e2e3e5", color: "#383d41", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "12px" };
    }
  };

  return (
    <PanelLayout
      title="Agenda de Hoy"
      subtitle="Panel médico"
      userType="medico"
    >
      {/* Sección de bienvenida */}
      <section className="pp-greeting" style={{ marginBottom: "25px" }}>
        <div>
          <h1>📆 Agenda de Citas</h1>
          <p>Consulta y gestiona tus citas programadas</p>
        </div>
      </section> {/* 🛠️ CORREGIDO AQUÍ: Se eliminó el "se¿-tion" roto */}

      {/* CONTENEDOR PRINCIPAL DE LA TABLA */}
      <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h3 style={{ marginTop: 0, marginBottom: "20px" }}>📋 Próximas Consultas Asignadas</h3>

        {cargando ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <p style={{ fontSize: "18px" }}>🔄 Cargando tu agenda desde la base de datos...</p>
          </div>
        ) : citas.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#f4f6f9", borderBottom: "2px solid #dee2e6" }}>
                  <th style={{ padding: "12px 10px" }}>ID Cita</th>
                  <th style={{ padding: "12px 10px" }}>Paciente</th>
                  <th style={{ padding: "12px 10px" }}>Fecha</th>
                  <th style={{ padding: "12px 10px" }}>Hora</th>
                  <th style={{ padding: "12px 10px" }}>Motivo de Consulta</th>
                  <th style={{ padding: "12px 10px" }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id_cita} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px 10px", fontWeight: "500", color: "#007bff" }}>#{cita.id_cita}</td>
                    <td style={{ padding: "12px 10px", fontWeight: "500" }}>{cita.nombre_paciente}</td>
                    <td style={{ padding: "12px 10px" }}>{new Date(cita.fecha).toLocaleDateString()}</td>
                    <td style={{ padding: "12px 10px" }}>{cita.hora.substring(0, 5)} hs</td>
                    <td style={{ padding: "12px 10px", color: "#555" }}>{cita.motivo || "Consulta general"}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <span style={getBadgeStyle(cita.estado)}>
                        {cita.estado || "Pendiente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "50px", color: "#999" }}>
            <p style={{ fontSize: "50px", margin: "0" }}>📭</p>
            <h4>No tienes citas programadas</h4>
            <p>Tu agenda está libre por el momento.</p>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}