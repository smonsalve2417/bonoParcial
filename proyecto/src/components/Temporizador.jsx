import { useEffect, useState } from 'react';

function formatear(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function Temporizador({ minutos }) {
  const [segundos, setSegundos] = useState(minutos * 60);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    if (!corriendo) return;

    setInterval(() => {
      setSegundos((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
  }, [corriendo]);

  return (
    <section className="temporizador">
      <h2>Temporizador</h2>
      <p className="tiempo" aria-label="Tiempo restante">{formatear(segundos)}</p>
      <button onClick={() => setCorriendo(!corriendo)}>
        {corriendo ? 'Pausar' : 'Iniciar'}
      </button>
      <button
        onClick={() => {
          setCorriendo(false);
          setSegundos(minutos * 60);
        }}
      >
        Reiniciar
      </button>
    </section>
  );
}

export default Temporizador;
