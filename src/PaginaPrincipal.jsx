import React from 'react'
import {getAuth, signOut} from 'firebase/auth'
import f from "./firebase"

const auth = getAuth(f)
const PaginaPrincipal = ({correousuario}) => {
  return (
    <div>
        <h1> Pagina Principal {correousuario}</h1><button onClick={()=>signOut(auth)}>logout</button>
    </div>
  )
}

export default PaginaPrincipal