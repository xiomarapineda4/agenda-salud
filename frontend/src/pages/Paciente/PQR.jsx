import { useState, useContext } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import { AlertaContext } from "../../context/AlertaContenedorContext";
import axios from "axios";
export default function PQR() {
    // 1. DEfinimos las alarmas
    const { mostrarAlertaGlobal } = useContext(AlertaContext);
    // 2. Definimos los estados
  const [tipoSolicitud, setTipoSolicitud] = useState("peticion");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
    // 3.Envio del formulario
const handleSubmit =  async (e) => {
   e.preventDefault();
   //  Validacion del texto
    if (!mensaje.trim()) {
      mostrarAlertaGlobal("Escribe el detalle de tu solicitud para poder enviarla.");
      return;
    }
    // Enviar datoa al servidor
console.log("Enviando:", { tipoSolicitud, mensaje });
 const idUsuarioActivo = localStorage.getItem("id_usuario") || 115;
 axios.post('http://localhost:3000/api/pqr', {
  id_usuario: Number(idUsuarioActivo),
  tipo_solicitud: tipoSolicitud,
  asunto: "Nueva ${tipoSolicitud} desde la web",
  descripcion: mensaje
 })
 .then(response => {
  console.log("Servidor responde con exito:", response.data);
  mostrarAlertaGlobal("¡PQR radicada con exito!");
  setEnviado(true);
  setMensaje("");
 })
.catch(error => {
console.error("Error al conectar con el backend:", error);
mostrarAlertaGlobal("Hubo un problema al enviar PQR al servidor.");
});

};
  // 4. La interfaz de la pagina

  return (
    <PanelLayout
      title="PQR"
      subtitle="Peticiones, Quejas, Reclamos y Sugerencias"
      userType="paciente"
    >
      <div className="pp-card" style={{ backgroundColor: "#cae0f0", padding: "40px 30px", borderRadius: "12px",
         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05", maxWidth: "480px", minHeight: "500px", margin: "20px auto" }}>
        <h2 style={{ color: "#2c3e50", fontWeight: "bold", fontSize: "24px", marginBottom: "15px" }}>Peticiones, Quejas, Reclamos y Sugerencias</h2>
        <p style={{ color: "#475569", marginBottom: "20px", fontWeight: "600", fontSize: "15px", lineHeight: "1.5" }}>
            Desde este modulo podras enviar solicitudes relacionadas con la
            atencion recibida y realizar seguimiento a tus requerimientos.
        </p>
        {enviado && (
            <div className="alert-success" style={{ marginBottom: "15px", color: "#9164fb", fontWeight: "bold" }}>
                ¡Su solicitud ha sido registrada con exito!
            </div>
        )}
        <form onSubmit={handleSubmit}>
            {/* selector del tipo de solicitud */}
          <div className="pp-form-group" >
          <label>Tipo de Solicitud:</label>
          <select
          value={tipoSolicitud}
          onChange={(e) => setTipoSolicitud(e.target.value)}
          style={{ width: "100px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #b0bec5", backgroundColor: "white", fontSize: "14px", color: "#333",outline: "none"}}
        >
        <option value="peticion">Peticion</option>
        <option value="queja">Queja</option>
        <option value="reclamo">Reclamo</option>
        <option value="sugerencia">Sugerencia</option>
        </select>
     </div> 
     {/* Campo de texto para el mensaje */}
     <div className="pp-form-group">
        <label>Detalle de la solicitud:</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escriba aqui los detalles..."
          rows="5"
          style={{ width: "100%", height: "150px", padding: "12px", borderRadius: "8px",
            border: "1px solid #b0bec5", backgroundColor: "white", fontSize: "14px",
            color: "#333", boxSizing: "border-box", outline: "none", resize: "none" }}
          />
      </div>
      {/* Boton para procesar el formulario */}
      <button type="submit" className="pp-btn-submit" style={{ backgroundColor: "#7da2f8", color: "white", padding: "10px 24px",
        border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "bold", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        marginTop: "15px"}}
        >
        Enviar PQR
      </button>
    </form>
 </div>
</PanelLayout>
  );
}

