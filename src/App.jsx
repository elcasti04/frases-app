import { useState, useEffect } from 'react';
import Header from './components/Header';
import FraseCard from './components/FraseCard';
import Boton from './components/Boton';
import './index.css';

const coloresAcento = [
  '#FFD6E0', '#B5EAD7', '#FFDAC1',
  '#C7CEEA', '#D0F4DE', '#E2F0CB', '#FFB7B2'
];

function colorAcentoAleatorio() {
  return coloresAcento[Math.floor(Math.random() * coloresAcento.length)];
}

export default function App() {
  const [frases, setFrases] = useState([]);
  const [indiceActual, setIndiceActual] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [accentColor, setAccentColor] = useState(colorAcentoAleatorio());

  useEffect(() => {
    fetch('/frases.json')
      .then(res => res.json())
      .then(data => {
        setFrases(data);
        const randomIndex = Math.floor(Math.random() * data.length);
        setIndiceActual(randomIndex);
        setAccentColor(colorAcentoAleatorio());
      })
      .catch(err => console.error('Error cargando JSON:', err));
  }, []);

  const siguienteFrase = () => {
    if (frases.length === 0) return;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * frases.length);
    } while (randomIndex === indiceActual);

    setHistorial([...historial, indiceActual]); // guardo la actual antes de cambiar
    setIndiceActual(randomIndex);
    setAccentColor(colorAcentoAleatorio());
  };

  const anteriorFrase = () => {
    if (historial.length === 0) return;
    const ultimo = historial[historial.length - 1];
    setHistorial(historial.slice(0, -1)); // quito el último
    setIndiceActual(ultimo);
    setAccentColor(colorAcentoAleatorio());
  };

  const compartirFrase = () => {
    const frase = frases[indiceActual];
    if (!frase) return;

    if (navigator.share) {
      navigator.share({
        title: "Frase inspiradora",
        text: `"${frase.texto}" - ${frase.autor}`,
        url: window.location.href
      }).catch(err => console.error("Error al compartir:", err));
    } else {
      navigator.clipboard.writeText(`"${frase.texto}" - ${frase.autor}`)
        .then(() => alert("Frase copiada al portapapeles 📋"))
        .catch(err => console.error("No se pudo copiar:", err));
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        {indiceActual !== null && frases.length > 0 ? (
          <FraseCard frase={frases[indiceActual]} accentColor={accentColor} />
        ) : (
          <p>Cargando frases...</p>
        )}

        <div className="botones">
          <Boton texto="Anterior" onClick={anteriorFrase} />
          <Boton texto="Siguiente" onClick={siguienteFrase} />
          <Boton texto="Compartir" onClick={compartirFrase} />
        </div>
      </div>
    </div>
  );
}
