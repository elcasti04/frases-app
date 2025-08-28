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
  const [indice, setIndice] = useState(0);
  const [accentColor, setAccentColor] = useState(colorAcentoAleatorio());

  useEffect(() => {
    fetch('/frases.json')
      .then(res => res.json())
      .then(data => {
        setFrases(data);
        setIndice(0);
        setAccentColor(colorAcentoAleatorio());
      })
      .catch(err => console.error('Error cargando JSON:', err));
  }, []);

  const cambiarFrase = (nuevoIndice) => {
    if (frases.length === 0) return;
    const index = (nuevoIndice + frases.length) % frases.length; // circular
    setIndice(index);
    setAccentColor(colorAcentoAleatorio());
  };

  const compartirFrase = () => {
    const frase = frases[indice];
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
        {frases.length > 0 ? (
          <FraseCard frase={frases[indice]} accentColor={accentColor} />
        ) : (
          <p>Cargando frases...</p>
        )}

        <div className="botones">
          <Boton texto="Anterior" onClick={() => cambiarFrase(indice - 1)} />
          <Boton texto="Siguiente" onClick={() => cambiarFrase(indice + 1)} />
          <Boton texto="Compartir" onClick={compartirFrase} />
        </div>
      </div>
    </div>
  );
}
