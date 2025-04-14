// Ejemplo simple de graficación usando Chart.js
function graficarFuncion(ctxId, datosX, datosY, titulo = 'Gráfica') {
  const ctx = document.getElementById(ctxId).getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: datosX,
      datasets: [{
        label: titulo,
        data: datosY,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'x' }},
        y: { title: { display: true, text: 'f(x)' }}
      }
    }
  });
}
