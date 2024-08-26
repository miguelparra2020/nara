import '../App.css';
import { useEffect, useState } from 'react';
import { MDBCarousel, MDBCarouselItem,  MDBSpinner,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
 } from 'mdb-react-ui-kit';
import '../App.css'; // Asegúrate de importar el archivo CSS si lo estás usando

function Album() {
  const [sheetData, setSheetData] = useState([]);
  const SPREADSHEET_ID = '1yBQ6PaE9VLhR_QDPteFBztl8fjnhelzrLDARC_d1Ieo';
  const RANGE = 'Sheet1'; // Nombre de la hoja o rango específico
  const API_KEY = 'AIzaSyBr0pgECVdFk23UvuDcsyAiq78XqVckC3A'; // Reemplaza con tu clave API

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();

        const headers = data.values[0]; // Los títulos de las columnas están en la primera fila
        const rows = data.values.slice(1); // El resto de filas contienen los datos

        const formattedData = rows.map(row => {
          const entry = headers.reduce((obj, header, index) => {
            obj[header] = row[index] || ''; // Asigna un valor vacío si no hay dato
            return obj;
          }, {});
          return entry;
        }).filter(entry => entry['url publica']); // Filtrar solo los que tienen "url publica"

        setSheetData(formattedData);
      } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
      }
    };

    fetchSheetData();
  }, []);

  const carouselItems = [...sheetData, ...sheetData, ...sheetData]; // Duplicar los ítems

  console.log("sheetData:", sheetData);

  return (
    <>
      {carouselItems.length > 0 ? (
        <MDBCarousel showControls dark>
          {carouselItems.map((item, index) => (
            <MDBCarouselItem itemId={item.id} key={item['id'] || index}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
      <MDBCard style={{maxWidth: '300px'}}>
      <MDBCardImage src={item['url publica']} position='top' alt='...' 
      width={180}
      height={320}
      />
      <MDBCardBody>
        <MDBCardText>
          {item['fecha']}
        </MDBCardText>
      <MDBCardTitle>{item['descripcion']}</MDBCardTitle>
      <br />
      <MDBBtn href={item['url publica']} target='_blank' className="btn btn-danger">Abrir foto &nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
  <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
  <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
</svg></MDBBtn>
      </MDBCardBody>
      
    </MDBCard>
    </div>
            </MDBCarouselItem>
          ))}
        </MDBCarousel>
      ) : (
        <p><MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner> Cargando albúm ...</p>
      )}
    </>
  );
}

export default Album;
