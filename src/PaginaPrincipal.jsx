import React, { useEffect, useState } from 'react';
import f from './firebase';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, query, where} from 'firebase/firestore'; // Añadido setDoc

const auth = getAuth(f);
const bd = getFirestore(f);

const PaginaPrincipal = ({ username }) => {
  const [lista, setLista] = useState([]);
  const [vistaDetallada, setVistaDetallada] = useState(null);
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState("");
  const [suscrito, setSuscrito] = useState(false);
  const [clubesSuscritos, setClubesSuscritos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const q = await getDocs(collection(bd, 'club'));
        const docs = [];
        q.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const mostrarVistaDetallada = (item) => {
    setVistaDetallada(item);
    setDescripcionSeleccionada(item.descripcion);
    if (clubesSuscritos.includes(item.nombre)) {
      setSuscrito(true);
    } else {
      setSuscrito(false);
    }
  };

  const handleSuscripcion = async (nombreClub) => {
    if (suscrito) {
      const nuevosClubes = clubesSuscritos.filter(club => club !== nombreClub);
      setClubesSuscritos(nuevosClubes);
    } else {
      setClubesSuscritos([...clubesSuscritos, nombreClub]);
    }
    setSuscrito(!suscrito);

    // Guardar los clubes suscritos en Firebase
    const userDocRef = doc(bd, 'usuarios', auth.currentUser.uid);
    try {
      await setDoc(userDocRef, { clubesSuscritos }, { merge: true });
      console.log("Clubes suscritos actualizados en Firebase.");
    } catch (error) {
      console.error("Error al guardar clubes suscritos:", error);
    }
  };

  const handleBusqueda = async () => {
    try {
      const q = query(collection(bd, 'videojuegos'), where("nombre", "==", busqueda));
      const querySnapshot = await getDocs(q);
      const resultados = [];
      querySnapshot.forEach((doc) => {
        resultados.push(doc.data());
      });
      setResultadosBusqueda(resultados);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <h2 className='t1'> Bienvenido a EustaquioGames{username}</h2>
          <input
            type="text"
            placeholder="Buscar videojuego"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={handleBusqueda}>Buscar</button>

          {resultadosBusqueda.length > 0 && (
            <div className='container'>
              <h2>Resultados de la búsqueda:</h2>
              {resultadosBusqueda.map((resultado, index) => (
                <div key={index}>
                  <p>VideoJuego: {resultado.nombre}</p>
                  <p>Descripcion: {resultado.descripcion}</p>
                  <p>Genero: {resultado.genero}</p>
                  <a href={resultado.imagen}>
                  <img className='img-i' src={resultado.imagen} alt="Descripción de la imagen" />
                  </a>

                </div>
              ))}
            </div>
          )}

          {lista.map((list) => (
            <div className='container card' key={list.id}>
              <div className='card-body'>
                <h1>{list.nombre}</h1>
                <a href={list.imagen}>
                  <img className='img-i' src={list.imagen} alt="Descripción de la imagen" />
                </a>
                <button className='Botonr' onClick={() => mostrarVistaDetallada(list)}>Ver Más</button>
              </div>
            </div>
          ))}
          <button className='Botonr2' onClick={() => signOut(auth)}>Logout</button>
        </div>

        <div className='col-md-4'>
          {vistaDetallada && (
            <div className='container card' key={vistaDetallada.id}>
              <div className='card-body'>
                <h1>{vistaDetallada.nombre}</h1>
                <p><h2>Descripcion: </h2>{descripcionSeleccionada}</p>
                <h2>Videojuegos:</h2>
                <p>{vistaDetallada.videojuegos.join(', ')}</p>
                <button className='Botonr' onClick={() => handleSuscripcion(vistaDetallada.nombre)}>
                  {suscrito ? "Desuscribirse" : "Suscribirse"}
                </button>
                <button className='Botonr' onClick={() => setVistaDetallada(null)}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaPrincipal;
