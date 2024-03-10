import React, { useState } from 'react';
import f from './firebase';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs, setDoc} from 'firebase/firestore'
const auth = getAuth(f);
const bd = getFirestore(f)

const Inicio = () => {
  const ValorInicial = {
    nombre: '',
    apellido: '',
    correop: '',
    username: '',
    VideoJuegoFavorito: '',
    membresia: [],
  }

  const [user,setuser] = useState(ValorInicial)
  const [registrando, setRegistrando] = useState(false);

  const capturarinfo = (e) =>{
    const {name, value} = e.target;
    setuser({...user, [name] : value})

  }


  const Auntenticacion = async (e) => {
    e.preventDefault();
    const correo1 = e.target.correo.value;
    const contra = e.target.contrasena.value;
    // console.log(user);
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
    try {
      await addDoc(collection(bd,'usuarios'),{...user})
    } catch (error) {
      console.log(error)
    }
    setuser({...ValorInicial})

  };

  return (
    <div className='container'>
      <h1 className='titulo'>EustaquioGames</h1>
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
                    <input type="text" placeholder='Nombre' className='caja' name='nombre' onChange={capturarinfo} value={user.nombre}/>
                    <input type="text" placeholder='Apellido' className='caja' name='apellido' onChange={capturarinfo} value={user.apellido}/>
                    <input type="text" placeholder='Username' className='caja' name='username' onChange={capturarinfo} value={user.username}/>
                    <input type="text" placeholder='Correo' className='caja' id='correo' name='correop' onChange={capturarinfo} value={user.correop}/>
                    <input type="password" placeholder='Contraseña' className='caja' id='contrasena'/>
                    <select name="VideoJuegoFavorito" className='caja' onChange={capturarinfo} value={user.VideoJuegoFavorito}>
                      <option value="1">The Witcher 3: Wild Hunt</option>
                      <option value="2">Red Dead Redemption 2</option>
                      <option value="3">The Legend of Zelda: Breath of the Wild</option>
                      <option value="4">Dark Souls III</option>
                      <option value="5">Super Mario Odyssey</option>
                      <option value="6">Overwatch</option>
                      <option value="7">Minecraft</option>
                      <option value="8">Fortnite</option>
                      <option value="9">FIFA 22</option>
                      <option value="10">Call of Duty: Warzone</option>
                      <option value="11">Assassin's Creed Valhalla</option>
                      <option value="12">Cyberpunk 2077</option>
                      <option value="13">Among Us</option>
                      <option value="14">Animal Crossing: New Horizons</option>
                      <option value="15">League of Legends</option>
                      <option value="16">Genshin Impact</option>
                      <option value="17">Apex Legends</option>
                      <option value="18">World of Warcraft</option>
                      <option value="19">Control</option>
                      <option value="20">Hades</option>
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