import React, { useState } from 'react';
import f from './firebase';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(f);

const Inicio = () => {
  const [registrando, setRegistrando] = useState(false);

  const Auntenticacion = async (e) => {
    e.preventDefault();
    const correo1 = e.target.correo.value;
    const contra = e.target.contrasena.value;

    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo1, contra);
      } catch (error) {
        alert("La contraseña debe tener más de 8 caracteres");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo1, contra);
      } catch (error) {
        alert("El correo o la contraseña son incorrectos");
      }
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        {/* Formulario */}
        <div className="cuadro col-md-4">
          <div className="padre">
            <div className="card card-body shadow-lg">
              <form onSubmit={Auntenticacion}>
                {!registrando && (
                  <>
                    <input type="text" placeholder='Correo' className='caja' id='correo' />
                    <input type="password" placeholder='Contraseña' className='caja' id='contrasena' />
                  </>
                )}
                {registrando && (
                  <>
                    <input type="text" placeholder='Nombre' className='caja' />
                    <input type="text" placeholder='Correo' className='caja' id='correo' />
                    <input type="password" placeholder='Contraseña' className='caja' id='contrasena' />
                    <select name="VideoJuegoFavorito" className='caja'>
                      <option value="V1">The Witcher 3: Wild Hunt</option>
                      <option value="V2">Red Dead Redemption 2</option>
                      <option value="V3">The Legend of Zelda: Breath of the Wild</option>
                      <option value="V4">Dark Souls III</option>
                      <option value="V5">Super Mario Odyssey</option>
                      <option value="V6">Overwatch</option>
                      <option value="V7">Minecraft</option>
                      <option value="V8">Fortnite</option>
                      <option value="V9">FIFA 22</option>
                      <option value="V10">Call of Duty: Warzone</option>
                      <option value="V11">Assassin's Creed Valhalla</option>
                      <option value="V12">Cyberpunk 2077</option>
                      <option value="V13">Among Us</option>
                      <option value="V14">Animal Crossing: New Horizons</option>
                      <option value="V15">League of Legends</option>
                      <option value="V16">Genshin Impact</option>
                      <option value="V17">Apex Legends</option>
                      <option value="V18">World of Warcraft</option>
                      <option value="V19">Control</option>
                      <option value="V20">Hades</option>
                    </select>
                  </>
                )}
                <button className='Botonr'>{registrando ? "Registrarse" : "Iniciar sesión"}</button>
              </form>
              <h4>{registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                <button onClick={() => setRegistrando(!registrando)} className='Botonr'>
                  {registrando ? "Iniciar sesión" : "Registrarse"}
                </button>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
