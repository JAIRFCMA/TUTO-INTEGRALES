// Configuración inicial
const calculator = Desmos.GraphingCalculator(document.getElementById('desmos-calculator'), {
    keypad: false,
    settingsMenu: false
});

// Variables para ejercicios
let ejercicios = [
    { pregunta: "\\int 2x \\, dx", respuesta: "x^2 + C" },
    { pregunta: "\\int \\cos(x) \\, dx", respuesta: "\\sin(x) + C" },
    { pregunta: "\\int e^x \\, dx", respuesta: "e^x + C" },
    { pregunta: "\\int \\frac{1}{x} \\, dx", respuesta: "\\ln|x| + C" }
];

let ejercicioActual = 0;
let correctas = 0;
let incorrectas = 0;

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    nuevoEjercicio();
    actualizarEstadisticas();
});

// 1. Cálculo con Math.js
function calcularMathJS() {
    const input = document.getElementById("inputFuncion").value.trim();
    const resultado = document.getElementById("resultado");
    
    try {
        // Ejemplo simplificado - en producción usar math.integral cuando esté disponible
        let solucion;
        if (input.includes("x^")) {
            const exp = parseInt(input.split("^")[1]) + 1;
            solucion = `\\[ \\int ${input} \\, dx = \\frac{${input.split("^")[0]}x^{${exp}}}{${exp}} + C \\]`;
        } else if (input.includes("sin")) {
            solucion = `\\[ \\int ${input} \\, dx = -\\cos(x) + C \\]`;
        } else {
            solucion = "No se pudo resolver con Math.js. Intenta con SymPy.";
        }
        
        resultado.innerHTML = solucion;
        graficarFuncion(input);
        MathJax.typeset();
    } catch (error) {
        resultado.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    }
}

// 2. Cálculo con SymPy (Backend)
async function calcularSymPy() {
    try {
        const input = "exp(x)";  // Fuerza prueba directa
        const response = await fetch('http://localhost:5000/calcular', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ funcion: input })
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        console.log("Respuesta del backend:", data);  // Depuración
        document.getElementById("resultado").innerHTML = `\\[ ${data.resultado} \\]`;
        
    } catch (error) {
        console.error("Error completo:", error);
        document.getElementById("resultado").innerHTML = 
            `<p class="text-danger">Error: ${error.message}. ¿El backend está corriendo?</p>`;
    }
}
// 3. Sistema de ejercicios
function nuevoEjercicio() {
    ejercicioActual = Math.floor(Math.random() * ejercicios.length);
    document.getElementById("preguntaEjercicio").innerHTML = `\\[ ${ejercicios[ejercicioActual].pregunta} \\]`;
    document.getElementById("respuestaUsuario").value = "";
    document.getElementById("feedback").innerHTML = "";
    MathJax.typeset();
}

function verificarRespuesta() {
    const respuesta = document.getElementById("respuestaUsuario").value.trim();
    const feedback = document.getElementById("feedback");
    const correcta = ejercicios[ejercicioActual].respuesta;
    
    if (respuesta === correcta.replace(/\\/g, "")) {
        feedback.innerHTML = "✅ Correcto!";
        feedback.className = "correct";
        correctas++;
    } else {
        feedback.innerHTML = `❌ Incorrecto. La respuesta es: \\[ ${correcta} \\]`;
        feedback.className = "incorrect";
        incorrectas++;
    }
    
    actualizarEstadisticas();
    MathJax.typeset();
}

function actualizarEstadisticas() {
    document.getElementById("correctas").textContent = correctas;
    document.getElementById("incorrectas").textContent = incorrectas;
    const total = correctas + incorrectas;
    const porcentaje = total > 0 ? Math.round((correctas / total) * 100) : 0;
    document.getElementById("progreso").style.width = `${porcentaje}%`;
    document.getElementById("progreso").textContent = `${porcentaje}%`;
}

// 4. Gráficos con Desmos
function graficarFuncion(funcion) {
    calculator.setBlank();
    calculator.setExpression({
        id: 'funcion',
        latex: `f(x) = ${funcion}`,
        color: Desmos.Colors.BLUE
    });
    
    // Opcional: Graficar el área bajo la curva
    if (funcion.includes("x^")) {
        calculator.setExpression({
            id: 'area',
            latex: `\\int_{0}^{2} ${funcion} \\, dx`,
            color: Desmos.Colors.RED,
            fillOpacity: 0.5
        });
    }
}