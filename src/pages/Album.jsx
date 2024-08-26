import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Album() {
  const [sheetData, setSheetData] = useState([]);
  const [img64, setImg64] = useState(null);
  const SPREADSHEET_ID = '1yBQ6PaE9VLhR_QDPteFBztl8fjnhelzrLDARC_d1Ieo';
  const RANGE = 'Sheet1'; // Nombre de la hoja o rango específico
  const API_KEY = 'AIzaSyBr0pgECVdFk23UvuDcsyAiq78XqVckC3A'; // Reemplaza con tu clave API
  const IMAGE_URL = 'https://drive.google.com/uc?export=view&id=18RDQI5sWV9Uba4Gtwh_ftmE8Gdk-BB3e';

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();

        const headers = data.values[0]; // Los títulos de las columnas están en la primera fila
        const rows = data.values.slice(1); // El resto de filas contienen los datos

        const formattedData = rows
          .map(row => {
            const entry = headers.reduce((obj, header, index) => {
              obj[header] = row[index] || ''; // Asigna un valor vacío si no hay dato
              return obj;
            }, {});

            return entry;
          })
          .filter(entry => entry['url publica']); // Filtrar solo los que tienen "url publica"

        setSheetData(formattedData);
      } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
      }
    };

    const fetchImageBase64 = async () => {
      try {
        // Obtener la imagen como un arraybuffer
        const response = await axios.get(IMAGE_URL, { responseType: 'arraybuffer' });
        const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(response.data)));
        const mimeType = 'image/jpeg'; // Cambia el tipo MIME según el tipo de imagen (puede ser image/png, image/gif, etc.)
        const imageBase64 = `data:${mimeType};base64,${base64}`;
        
        setImg64(imageBase64);
      } catch (error) {
        console.error('Error fetching and converting image:', error);
      }
    };

    fetchSheetData();
    fetchImageBase64();
  }, []);

  console.log(sheetData);

  return (
    <>
      {img64 ? (
        <img src={img64} alt="Imagen desde Google Drive" />
      ) : (
        <p>Cargando imagen...</p>
      )}
      <img src="https://drive.google.com/uc?export=view&id=18RDQI5sWV9Uba4Gtwh_ftmE8Gdk-BB3e" alt="Imagen desde Google Drive" />
      {/* Agrega el código para mostrar los datos de la hoja de cálculo si es necesario */}
    </>
  );
}

export default Album;
