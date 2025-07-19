import estudiantes from '../data/estudiantes.js';
import cursos from '../data/cursos.js';
import calificaciones from '../data/calificaciones.js';

export function obtenerCalificaciones(req, res) {
  try {
   
    const { curso, estudiante, minima } = req.query;

    const resultado = calificaciones
      .map((calificacion) => {
        const est = estudiantes.find((e) => e.id === calificacion.estudianteId);
        const cur = cursos.find((c) => c.id === calificacion.cursoId);

        if (!est || !cur){
            return null;
        }

        return {
          nombre: est.nombre,
          curso: cur.nombre,
          calificacion: calificacion.calificacion,
        };
      })
      .filter(item => item !== null)
      .filter(item =>
        (!curso || item.curso.toLowerCase().includes(curso.toLowerCase())) &&
        (!estudiante || item.nombre.toLowerCase().includes(estudiante.toLowerCase())) &&
        (!minima || item.calificacion >= Number(minima))
      );

    res.json(resultado);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al procesar las calificaciones' });
  }
}



export default obtenerCalificaciones;