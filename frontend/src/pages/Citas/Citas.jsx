import "./Citas.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiconfig";
import { useAlerta } from '../../context/AlertaContenedorContext';

function Cita() {
  const navigate = useNavigate();
  const { mostrarAlertaGlobal } = useAlerta();
  
  // 1. ESTADO DEL FORMULARIO
  const [datos, setDatos] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    id_medico: "",
  });

  // 2. ESTADOS COMPONENTES BASE
  const [medicos, setMedicos] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]); 
  const [cargando, setCargando] = useState(false);
  const [buscandoHoras, setBuscandoHoras] = useState(false);
  const [mensajeHoras, setMensajeHoras] = useState("");

  // 3. ESTADOS PARA FILTROS
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [listaEspecialidades, setListaEspecialidades] = useState([]);

  // 4. CARGAR MÉDICOS AL INICIAR 
  useEffect(() => {
    const cargarMedicos = async () => {
      try {
        const respuesta = await apiConfig.get("/medico");

        const medicosDesdeBackend = respuesta.data.map((medico) => ({
          id_medico: medico.id_medico || medico.id,
          nombre: `${medico.nombre || ""} ${medico.apellido || ""}`.trim(),
          especialidad:
            medico.nombre_especialidad ||
            medico.especialidad ||
            "General",
        }));

        setMedicos(medicosDesdeBackend);

        // EXTRAER LAS ESPECIALIDADES ÚNICAS PARA EL SELECTOR DEL FILTRO
        const especialidadesUnicas = [
          ...new Set(medicosDesdeBackend.map((m) => m.especialidad)),
        ];
        setListaEspecialidades(especialidadesUnicas);

      } catch (error) {
        console.error("Error al cargar médicos:", error);
      }
    };

    cargarMedicos();
  }, []);

  // 5. MONITOR DE MÉDICO Y FECHA (Trae bloques de 20 min)
  useEffect(() => {
    const cargarHorariosDisponibles = async () => {
      if (!datos.id_medico || !datos.fecha) {
        setHorasDisponibles([]);
        setMensajeHoras("");
        return;
      }

      setBuscandoHoras(true);
      setMensajeHoras("");
      setHorasDisponibles([]);
      setDatos((prev) => ({ ...prev, hora: "" })); 

      try {
        const respuesta = await apiConfig.get("/cita/disponibilidad", {
          params: {
            id_medico: datos.id_medico,
            fecha: datos.fecha,
          },
        });

        setHorasDisponibles(respuesta.data);

        if (respuesta.data.length === 0) {
          setMensajeHoras("El médico no atiende este día o no cuenta con horarios disponibles.");
        }
      } catch (error) {
        console.error("Error al cargar disponibilidad:", error);
        setMensajeHoras("No se pudieron cargar los horarios para esta fecha.");
      } finally {
        setBuscandoHoras(false);
      }
    };

    cargarHorariosDisponibles();
  }, [datos.id_medico, datos.fecha]);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // 6. LÓGICA DE FILTRADO EN TIEMPO REAL 
  const medicosFiltrados = medicos.filter((medico) => {
    return especialidadSeleccionada === "" || medico.especialidad === especialidadSeleccionada;
  });

  // Manejador del cambio de especialidad (Resuelve inconsistencia de ID viejo)
  const handleEspecialidadChange = (e) => {
    setEspecialidadSeleccionada(e.target.value);
    setDatos((prev) => ({ ...prev, id_medico: "", hora: "" })); // Limpia el médico y la hora previa
  };

  // 7. GUARDAR LA CITA 
  const handleAgendar = async (e) => {
    e.preventDefault();

    if (!datos.fecha || !datos.hora || !datos.motivo.trim() || !datos.id_medico) {
      mostrarAlertaGlobal("Por favor, completa todos los campos.");
      return;
    }

    const idPaciente = localStorage.getItem("id_paciente");

    if (!idPaciente) {
      mostrarAlertaGlobal("No se encontró el paciente conectado. Inicia sesión nuevamente.");
      return;
    }

    setCargando(true);

    try {
      const datosAEnviar = {
        fecha: datos.fecha,
        hora: datos.hora,
        motivo: datos.motivo,
        id_medico: datos.id_medico,
        id_paciente: idPaciente,
        estado: "pendiente",
      };

      const respuesta = await apiConfig.post("/cita", datosAEnviar);

      mostrarAlertaGlobal(respuesta.data.mensaje || "¡Cita agendada correctamente!");

      setDatos({
        fecha: "",
        hora: "",
        motivo: "",
        id_medico: "",
      });
      setEspecialidadSeleccionada("");

      navigate("/panel-paciente");
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      const mensajeError =
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        "Hubo un error al guardar la cita en la base de datos.";
      mostrarAlertaGlobal(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <PanelLayout
      title="Agendar cita"
      subtitle="Reserva una nueva cita médica"
      userType="paciente"
    >
      <section className="pp-greeting">
        <div>
          <h1>Agendar cita</h1>
          <p>Usa los filtros para encontrar tu médico y selecciona un horario.</p>
        </div>
      </section>

      <section className="cita-panel-wrapper">
        <div className="tarjeta-cita">
          
          {/* SECCIÓN FILTRO: Especialidad */}
          <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "24px", marginTop: "5px" }}>
            Selecciona la especialidad:
          </label>
          <select
            value={especialidadSeleccionada}
            onChange={handleEspecialidadChange}
            className="input-cita"
            style={{ textAlign: "center", textAlignLast: "center" }}
          >
            <option value="">- Selecciona una especialidad de la lista -</option>
            {listaEspecialidades.map((esp, idx) => (
              <option key={idx} value={esp}>
                {esp}
              </option>
            ))}
          </select>

          <hr style={{ border: "0", borderTop: "1px solid #eee", marginBottom: "15px", marginTop: "15px" }} />

          <form onSubmit={handleAgendar}>
            
            {/* SECCIÓN: Selector de Médico */}
            <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "12px" }}>
              Selecciona un médico:
            </label>
            <select
              name="id_medico"
              className="input-cita"
              value={datos.id_medico}
              onChange={handleChange}
              required
            >
              <option value="">
                {medicosFiltrados.length === 0 
                  ? "No se encontraron médicos con esos filtros" 
                  : "- Selecciona un médico de la lista -"}
              </option>
              {medicosFiltrados.map((medico) => (
                <option key={medico.id_medico} value={medico.id_medico}>
                  {medico.nombre} ({medico.especialidad})
                </option>
              ))}
            </select>

            {/* SECCIÓN: Selector de Fecha */}
            <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "12px" }}>
              Selecciona la fecha de la cita:
            </label>
            <input
              type="date"
              name="fecha"
              className="input-cita"
              value={datos.fecha}
              onChange={handleChange}
              required
            />

            {/* SECCIÓN: Selector de turnos dinámico */}
            <div style={{ margin: "5px 0 20px 0", textAlign: "left" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "12px", color: "#444" }}>
                Horarios disponibles cada 20 min:
              </label>

              {buscandoHoras && <p style={{ fontSize: "14px", color: "#666" }}>Consultando agenda libre...</p>}
              {mensajeHoras && <p style={{ fontSize: "14px", color: "#dc3545", fontWeight: "bold" }}>{mensajeHoras}</p>}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {horasDisponibles.map((h) => (
                  <button
                    type="button"
                    key={h.hora}
                    onClick={() => setDatos((prev) => ({ ...prev, hora: h.hora }))}
                    style={{
                      padding: "10px",
                      fontSize: "14px",
                      backgroundColor: datos.hora === h.hora ? "#007bff" : "#ffffff",
                      color: datos.hora === h.hora ? "#ffffff" : "#333333",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: datos.hora === h.hora ? "bold" : "normal",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {h.hora.substring(0, 5)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input de Motivo */}
            <input
              type="text"
              name="motivo"
              className="input-cita"
              value={datos.motivo}
              onChange={handleChange}
              placeholder="Motivo de la cita"
              required
            />

            {/* Botones de Envío */}
            <button 
              type="submit" 
              className="boton-cita" 
              disabled={cargando || !datos.hora}
            >
              {cargando ? "Agendando..." : "Agendar cita"}
            </button>

            <button
              type="button"
              className="boton-cita secundario"
              onClick={() => navigate("/panel-paciente")}
            >
              Volver
            </button>
          </form>
        </div>
      </section>
    </PanelLayout>
  );
}

export default Cita;