document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada correctamente');
  
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        console.log(`Navegando a: ${link.href}`);
      });
    });
  });
  