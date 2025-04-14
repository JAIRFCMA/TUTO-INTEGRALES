async function cargarEjercicios(tipo) {
  try {
    const respuesta = await fetch(`../ejercicios/${tipo}.json`);
    const ejercicios = await respuesta.json();

    const contenedor = document.getElementById('lista-ejercicios');
    contenedor.innerHTML = '';

    ejercicios.forEach((ejercicio, i) => {
      const item = document.createElement('div');
      item.classList.add('ejercicio');
      item.innerHTML = `
        <h3>Ejercicio ${i + 1}</h3>
        <p>${ejercicio.pregunta}</p>
        <pre>${ejercicio.integral}</pre>
      `;
      contenedor.appendChild(item);
    });

  } catch (error) {
    console.error("Error al cargar ejercicios:", error);
  }
}
