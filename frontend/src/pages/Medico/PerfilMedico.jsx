import { useState, useEffect } from "react";
import { User, Lock, Pencil, X, Check, ChevronRight } from "lucide-react";
import PanelLayout from "../../layouts/PanelLayout";

function Campo({ label, value }) {
  return (
    <div className="campo-fila">
      <span className="campo-label">{label}</span>
      <span className="campo-valor">{value ?? "—"}</span>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, disabled = false }) {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={name}>{label}</label>
      <input
        id={name}
        className="input-field"
        type="text"
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
}

export default function PerfilMedico() {
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [errores, setErrores] = useState([]);

  // 🔹 DATOS MOCK (simulados)
  const [medico, setMedico] = useState(null);
  const [draft, setDraft] = useState({});

  useEffect(() => {
    // Simulación de carga
    setTimeout(() => {
      const dataMock = {
        nombre: "María",
        apellido: "Reyes",
        documento: "123456789",
        correo: "maria@email.com",
        tipo_documento: "CC",
        nombre_especialidad: "Medicina General",
        tarjeta_profesional: "TP-123456",
        experiencia_clinica: "5 años",
        estado: "Activo",
      };

      setMedico(dataMock);
      setDraft(dataMock);
      setCargando(false);
    }, 800);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const iniciarEdicion = () => {
    setDraft(medico);
    setErrores([]);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setDraft(medico);
    setErrores([]);
    setEditando(false);
  };

  const validarDatos = () => {
    const errs = [];
    if (!draft.tarjeta_profesional?.trim()) {
      errs.push("La tarjeta profesional es obligatoria.");
    }
    if (!draft.experiencia_clinica || String(draft.experiencia_clinica).trim() === "") {
      errs.push("La experiencia clínica es obligatoria.");
    }
    return errs;
  };

  const guardarDatos = async () => {
    const errs = validarDatos();
    if (errs.length > 0) {
      setErrores(errs);
      return;
    }

    setGuardando(true);

    // 🔹 Simulación de guardado
    setTimeout(() => {
      setMedico({ ...draft });
      setEditando(false);
      setErrores([]);
      setGuardado(true);
      setGuardando(false);
    }, 1000);
  };

  // 🔹 Toast controlado
  useEffect(() => {
    if (guardado) {
      const timer = setTimeout(() => setGuardado(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [guardado]);

  if (cargando) {
    return (
      <PanelLayout title="Perfil Médico" subtitle="Cargando..." userType="medico">
        <div className="pp-root">
          <div className="pp-estado">Cargando tu perfil...</div>
        </div>
      </PanelLayout>
    );
  }

  const iniciales = `${medico.nombre?.[0] ?? ""}${medico.apellido?.[0] ?? ""}`.toUpperCase();

  return (
    <PanelLayout title="Perfil Médico" subtitle="Modo local (sin base de datos)" userType="medico">
      <div className="pp-root">
        <div className="pp-container">

          {guardado && (
            <div className="pp-toast pp-toast-success">
              <Check size={16} /> Datos actualizados correctamente.
            </div>
          )}

          <div className="pp-grid-layout">

            <div className="pp-card pp-card-avatar">
              <div className="pp-avatar">{iniciales}</div>
              <div className="pp-avatar-info">
                <h2 className="pp-avatar-name">{medico.nombre} {medico.apellido}</h2>
                <p className="pp-avatar-doc">Doc. {medico.documento}</p>
              </div>
              <div className="pp-avatar-badge">Médico</div>
            </div>

            <div className="pp-card pp-card-datos">
              <div className="pp-card-header">
                <div className="pp-card-icon"><User size={18} /></div>
                <h3 className="pp-card-title">Datos del médico</h3>
                {!editando && (
                  <button className="pp-btn-ghost" onClick={iniciarEdicion}>
                    <Pencil size={15} /> Editar
                  </button>
                )}
              </div>

              {!editando ? (
                <div className="pp-campos">
                  <Campo label="Nombre" value={medico.nombre} />
                  <Campo label="Apellido" value={medico.apellido} />
                  <Campo label="Documento" value={medico.documento} />
                  <Campo label="Correo" value={medico.correo} />
                  <Campo label="Tipo de documento" value={medico.tipo_documento} />
                  <Campo label="Especialidad" value={medico.nombre_especialidad} />
                  <Campo label="Tarjeta profesional" value={medico.tarjeta_profesional} />
                  <Campo label="Experiencia clínica" value={medico.experiencia_clinica} />
                  <Campo label="Estado" value={medico.estado} />
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); guardarDatos(); }}>
                  {errores.length > 0 && (
                    <div className="pp-errors">
                      {errores.map((e, i) => <p key={i}>{e}</p>)}
                    </div>
                  )}

                  <div className="pp-form-grid">
                    <InputField
                      label="Tarjeta profesional"
                      name="tarjeta_profesional"
                      value={draft.tarjeta_profesional}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Experiencia clínica"
                      name="experiencia_clinica"
                      value={draft.experiencia_clinica}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pp-form-actions">
                    <button type="button" className="pp-btn pp-btn-secondary" onClick={cancelarEdicion}>
                      <X size={15} /> Cancelar
                    </button>
                    <button type="submit" className="pp-btn pp-btn-primary" disabled={guardando}>
                      <Check size={15} /> {guardando ? "Guardando..." : "Guardar cambios"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {!editando && (
              <div className="pp-card pp-card-pass">
                <div className="pp-card-header">
                  <div className="pp-card-icon"><Lock size={18} /></div>
                  <h3 className="pp-card-title">Seguridad</h3>
                </div>
                <div className="pp-pass-info">
                  <span className="pp-pass-dots">••••••••</span>
                  <span className="pp-pass-hint">Contraseña de acceso a tu cuenta</span>
                </div>
                <button className="pp-btn pp-btn-outline" disabled>
                  Cambiar contraseña
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
