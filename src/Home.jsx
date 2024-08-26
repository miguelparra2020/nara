import './App.css'

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
import imagePortada from './assets/portada-nara.jpeg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/album');  // Redirige a la ruta '/album' después de 5 segundos
      }, 3000);
  
      return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
    }, [navigate]);

  return (
    <>
      <h1>Bienvenidos a mi albúm fotográfico</h1>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <MDBCard style={{maxWidth: '300px'}}>
      <MDBCardImage src={imagePortada} position='top' alt='...' 
      width={180}
      height={320}
      />
      <MDBCardBody>
        <MDBCardTitle>Nara Páez Aguirre</MDBCardTitle>
        <MDBCardText>
          24/08/2024 9:18 pm
        </MDBCardText>
      </MDBCardBody>
      
    </MDBCard>
    </div>
    </>
  )
}

export default Home
