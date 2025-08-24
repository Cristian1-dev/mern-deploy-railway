import { BrowserRouter, Routes, Route } from 'react-router-dom'

// importando rutas
import { PaginaRegistro } from './paginas/PaginaRegistro.jsx';
import { LoginPage } from './paginas/LoginPagina.jsx';
import { RegistroProvider } from './contexto/ContextoRegistroUsuario.jsx'
import { HomePage } from './paginas/HomePage.jsx';
import { TareaFormulario } from './paginas/TareaFormulario.jsx';
import { TareasPage } from './paginas/TareasPage.jsx';
import { PerfilPage } from '../src/paginas/PerfilPage.jsx';
import './App.css'
import { RutasProtegidas } from './RutasProtegidas.jsx';
import { TareaProvider } from './contexto/TareaContexto.jsx';
import { Navbar } from './componentes/Navbar.jsx';

function App() {

  return (
    <RegistroProvider>
      <TareaProvider>
        <BrowserRouter>
          <Navbar />
          <div className='contenedor-registro'>
            <Routes>
              {/* Publico` */}
              <Route path='/' element={<HomePage />} />
              <Route path='/registrar' element={<PaginaRegistro />} />
              <Route path='/login' element={<LoginPage />} />

              {/* Privado */}
              <Route element={<RutasProtegidas />}>
                <Route path='/crear-tarea' element={<TareaFormulario />} />
                <Route path='/tareas' element={<TareasPage />} />
                <Route path='/actualizar/:id' element={<TareaFormulario />} />
                
                <Route path='/perfil' element={<PerfilPage />} />
              </Route>

            </Routes>
          </div>
        </BrowserRouter>
      </TareaProvider>
    </RegistroProvider>
  )
}

export default App


// Por qué no desaparecía la etiqueta <p> antes:

// error es un array []
// Un array vacío [] es "truthy" en JavaScript
// Por eso {error && <p>} siempre renderizaba la etiqueta <p>, incluso cuando el array estaba vacío
// El contenido era undefined porque intentabas renderizar un array directamente
// Ahora:

// Solo se renderiza cuando error.length > 0
// Cada error se muestra en su propia etiqueta <p>
// Cuando el array se vacía después de 5 segundos, toda la sección de errores desaparece completamente

// en el cliente se instala js-cookie para leer las cookies del frontend