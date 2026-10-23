import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { obtenerRecetas } from '../api';

function Favoritos({ favoritos, onQuitar }) {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    obtenerRecetas(controller.signal)
      .then(setRecetas)
      .catch((error) => {
        if (error.name !== 'AbortError') console.error(error);
      });

    return () => controller.abort();
  }, []);

  if (favoritos.length === 0) {
    return (
      <section>
        <h1>Favoritos</h1>
        <p>
          Aún no tienes favoritos. <Link to="/recetas">Explora las recetas</Link>.
        </p>
      </section>
    );
  }

  const [orden, setOrden] = useState('nombre');

  const lista = recetas
    .filter((r) => favoritos.includes(r.id))
    .sort((a, b) => (orden === 'nombre' ? a.nombre.localeCompare(b.nombre) : a.tiempo - b.tiempo));

  return (
    <section>
      <h1>Favoritos</h1>

      <label>
        Ordenar por{' '}
        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
          <option value="nombre">nombre</option>
          <option value="tiempo">tiempo</option>
        </select>
      </label>

      <ul className="favoritos">
        {lista.map((receta) => (
          <li key={receta.id}>
            <Link to={`/recetas/${receta.id}`}>{receta.nombre}</Link>
            <button onClick={() => onQuitar(receta.id)}>Quitar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Favoritos;
