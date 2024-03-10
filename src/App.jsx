import { useState } from "react";
import './App.css'
import app from './firebase'
import {getAuth} from 'firebase/auth'
import Inicio from './Inicio'
import PaginaPrincipal from './PaginaPrincipal'
import {onAuthStateChanged} from 'firebase/auth'
const auntenticador = getAuth(app)

function App() {

    const [usuario, setusuario] = useState(null)
    onAuthStateChanged(auntenticador, (usuariof)=>{
        if (usuariof){
            setusuario(usuariof)
        }
        else{
            setusuario(null)
        }
    }
    )
    return (
    <div className="App">
        {usuario ? <PaginaPrincipal correousuario = {usuario.email} /> : <Inicio/>}
    </div>
    )
}

export default App