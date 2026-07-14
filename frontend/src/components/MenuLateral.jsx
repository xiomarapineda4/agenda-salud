import { useNavigate } from 'react-router-dom'

export default function MenuLateral() {
  const navigate = useNavigate()

  return (
    <div
      className='flex flex-column'
      style={{
        width: '220px',
        minHeight: '100vh',
        backgroundColor: '#1a73e8',
        borderRadius: '10px 10px 10px 10px',
        padding: '20px',
        gap: '8px'
      }}
    >
      <div
  className='flex align-items-center justify-content-center mb-4'
  style={{
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '5px',
    marginBottom: '20px'
  }}
>
  <img src='/imagenes/logo.png' alt='Logo' style={{ width: '120px' }} />
</div>

      <p className='text-white font-bold mb-3' style={{ fontSize: '14px' }}>MENÚ</p>

      <Button_menu icono='📅' texto='Agendar cita' ruta='/agendar-cita' navigate={navigate} />
      <Button_menu icono='👤' texto='Datos personales' ruta='/perfil' navigate={navigate} />
      <Button_menu icono='🗓️' texto='Calendario' ruta='/calendario' navigate={navigate} />
      <Button_menu icono='⚙️' texto='Configuración' ruta='/configuracion' navigate={navigate} />
    </div>
  )
}

// Componente pequeño reutilizable para cada botón del menú
function Button_menu({ icono, texto, ruta, navigate }) {
  return (
    <div
      onClick={() => navigate(ruta)}
      className='flex align-items-center gap-2 cursor-pointer border-round p-2'
      style={{ color: 'white', fontSize: '15px' }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <span>{icono}</span>
      <span>{texto}</span>
    </div>
  )
}