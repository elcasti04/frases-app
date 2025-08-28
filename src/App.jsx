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
  const [fraseActual, setFraseActual] = useState(null);
  const [accentColor, setAccentColor] = useState(colorAcentoAleatorio());

  useEffect(() => {
    fetch('/frases.json')
      .then(res => res.json())
      .then(data => {
        setFrases(data);
        const random = data[Math.floor(Math.random() * data.length)];
        setFraseActual(random);
        setAccentColor(colorAcentoAleatorio());
      })
      .catch(err => console.error('Error cargando JSON:', err));
  }, []);

  const cambiarFrase = () => {
    if (frases.length === 0) return;
    let nueva;
    do {
      nueva = frases[Math.floor(Math.random() * frases.length)];
    } while (nueva.texto === fraseActual?.texto);

    setFraseActual(nueva);
    setAccentColor(colorAcentoAleatorio());
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        {fraseActual ? (
          <FraseCard frase={fraseActual} accentColor={accentColor} />
        ) : (
          <p>Cargando frases...</p>
        )}
        <Boton texto="Nueva frase" onClick={cambiarFrase} />
      </div>
    </div>
  );
}
