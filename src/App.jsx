import React, { useState } from 'react';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleRegistro = () => {
    // Aquí puedes implementar la lógica para enviar los datos de registro al servidor
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Contraseña:', contraseña);
  };

  return (
    <div>
      <h2>Vista de registro</h2>
      <form onSubmit={handleRegistro}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        <button type="submit">Registrarse</button>
      </form>
      <div>
        <button onClick={() => console.log('Registro con Google')}>Registrarse con Google</button>
        <button onClick={() => console.log('Registro con Twitter')}>Registrarse con Twitter</button>
      </div>
    </div>
  );
}

function InicioSesion() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleInicioSesion = () => {
    // Aquí puedes implementar la lógica para iniciar sesión con los datos proporcionados
    console.log('Email:', email);
    console.log('Contraseña:', contraseña);
  };

  return (
    <div>
      <h2>Vista de inicio de sesión</h2>
      <form onSubmit={handleInicioSesion}>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        <button type="submit">Iniciar sesión</button>
      </form>
      <div>
        <button onClick={() => console.log('Inicio de sesión con Google')}>Iniciar sesión con Google</button>
        <button onClick={() => console.log('Inicio de sesión con Twitter')}>Iniciar sesión con Twitter</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Registro />
      <InicioSesion />
    </div>
  );
}

export default App;
