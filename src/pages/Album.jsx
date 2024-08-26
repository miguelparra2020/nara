import '../App.css';
import { useEffect, useState } from 'react';
import { MDBCarousel, MDBCarouselItem,  MDBSpinner,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage
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
        <MDBCarousel showControls>
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
