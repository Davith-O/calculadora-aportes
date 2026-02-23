// Constantes
const PORCENTAJE_SALUD = 4;
const PORCENTAJE_PENSION = 16;
const PORCENTAJE_CAJA = 4;

const TASAS_ARL = {
    1: 0.522,
    2: 1.044,
    3: 2.436,
    4: 4.350,
    5: 6.960
};

const SALARIO_MINIMO_2026 = 1750905;

function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
}

function calcularAportes() {
    const inputSalario = document.getElementById('salario');
    const inputRiesgo = document.getElementById('nivel-riesgo');
    
    const salario = parseFloat(inputSalario.value);
    const riesgo = parseInt(inputRiesgo.value);

    // Validaciones
    if (!salario || salario <= 0) {
        alert('Por favor ingrese un salario válido mayor a cero.');
        inputSalario.focus();
        return;
    }

    if (salario < SALARIO_MINIMO_2026) {
        alert(`El salario no puede ser inferior al mínimo legal vigente: ${formatearMoneda(SALARIO_MINIMO_2026)}`);
        inputSalario.focus();
        return;
    }

    if (!riesgo || riesgo < 1 || riesgo > 5) {
        alert('Por favor seleccione un nivel de riesgo válido (1 al 5).');
        inputRiesgo.focus();
        return;
    }

    // Calculos
    const aporteSalud = (salario * PORCENTAJE_SALUD) / 100;
    const aportePension = (salario * PORCENTAJE_PENSION) / 100;
    const aporteArl = (salario * TASAS_ARL[riesgo]) / 100;
    const aporteCaja = (salario * PORCENTAJE_CAJA) / 100;
    const totalAportes = aporteSalud + aportePension + aporteArl + aporteCaja;

    // Mostrar resultados
    document.getElementById('salario-base').textContent = formatearMoneda(salario);
    document.getElementById('aporte-salud').textContent = formatearMoneda(aporteSalud);
    document.getElementById('aporte-pension').textContent = formatearMoneda(aportePension);
    document.getElementById('aporte-arl').textContent = formatearMoneda(aporteArl);
    document.getElementById('porcentaje-arl').textContent = TASAS_ARL[riesgo].toFixed(3) + '%';
    document.getElementById('aporte-caja').textContent = formatearMoneda(aporteCaja);
    document.getElementById('total-aportes').textContent = formatearMoneda(totalAportes);

    // Mostrar sección y scroll
    const seccionResultados = document.getElementById('resultados');
    seccionResultados.style.display = 'block';
    seccionResultados.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Calcular con Enter
document.getElementById('salario').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calcularAportes();
    }
});

// Solo números en el input
document.getElementById('salario').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d]/g, '');
});