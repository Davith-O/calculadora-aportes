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

// Guarda los valores calculados para poder recalcular el total sin volver a pedir datos
let valoresCalculados = null;

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

    // Calculos base (siempre se calculan los 4 aportes)
    const aporteSalud   = (salario * PORCENTAJE_SALUD)   / 100;
    const aportePension = (salario * PORCENTAJE_PENSION)  / 100;
    const aporteArl     = (salario * TASAS_ARL[riesgo])   / 100;
    const aporteCaja    = (salario * PORCENTAJE_CAJA)     / 100;

    // Guardar valores para reutilizarlos al cambiar los toggles
    valoresCalculados = { salario, aporteSalud, aportePension, aporteArl, aporteCaja, riesgo };

    // Mostrar valores individuales en pantalla
    document.getElementById('salario-base').textContent    = formatearMoneda(salario);
    document.getElementById('aporte-salud').textContent    = formatearMoneda(aporteSalud);
    document.getElementById('aporte-pension').textContent  = formatearMoneda(aportePension);
    document.getElementById('aporte-arl').textContent      = formatearMoneda(aporteArl);
    document.getElementById('porcentaje-arl').textContent  = TASAS_ARL[riesgo].toFixed(3) + '%';
    document.getElementById('aporte-caja').textContent     = formatearMoneda(aporteCaja);

    // Mostrar sección de resultados
    const seccionResultados = document.getElementById('resultados');
    seccionResultados.style.display = 'block';

    // Calcular total según los toggles actuales
    recalcularTotal();

    // Scroll suave
    seccionResultados.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Recalcula el total según qué aportes están activados
function recalcularTotal() {
    // Si aún no se ha calculado, no hace nada
    if (!valoresCalculados) return;

    const { aporteSalud, aportePension, aporteArl, aporteCaja } = valoresCalculados;

    const incluirSalud   = document.getElementById('incluir-salud').checked;
    const incluirPension = document.getElementById('incluir-pension').checked;
    const incluirCaja    = document.getElementById('incluir-caja').checked;

    // Actualizar valores individuales: mostrar $0 si está desmarcado
    document.getElementById('aporte-salud').textContent   = formatearMoneda(incluirSalud   ? aporteSalud   : 0);
    document.getElementById('aporte-pension').textContent = formatearMoneda(incluirPension ? aportePension : 0);
    document.getElementById('aporte-caja').textContent    = formatearMoneda(incluirCaja    ? aporteCaja    : 0);

    // Total solo suma los aportes activados (ARL siempre incluida)
    const total = 
        (incluirSalud   ? aporteSalud   : 0) +
        (incluirPension ? aportePension : 0) +
        aporteArl +
        (incluirCaja    ? aporteCaja    : 0);

    document.getElementById('total-aportes').textContent = formatearMoneda(total);

    // Efecto visual: atenuar la fila y mostrar badge "Omitido"
    actualizarFilaResultado('fila-salud',   'badge-salud',   !incluirSalud);
    actualizarFilaResultado('fila-pension', 'badge-pension', !incluirPension);
    actualizarFilaResultado('fila-caja',    'badge-caja',    !incluirCaja);
}

// Aplica/quita el estilo de "omitido" a una fila del resultado
function actualizarFilaResultado(idFila, idBadge, omitido) {
    const fila  = document.getElementById(idFila);
    const badge = document.getElementById(idBadge);

    if (!fila || !badge) return;

    if (omitido) {
        fila.classList.add('item-omitido');
        badge.style.display = 'inline-block';
    } else {
        fila.classList.remove('item-omitido');
        badge.style.display = 'none';
    }
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