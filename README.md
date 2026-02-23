# Calculadora de Aportes para Trabajadores Dependientes

Aplicación web para calcular los aportes a seguridad social de un trabajador dependiente en Colombia. Calcula automáticamente las contribuciones a Salud, Pensión, ARL y Caja de Compensación según el salario ingresado y el nivel de riesgo laboral.

---

 Demo en vivo

🔗 [Ver proyecto en GitHub Pages](https://davith-o.github.io/calculadora-aportes/)

---

Tecnologías utilizadas

| Tecnología | Descripción |
|------------|-------------|
| HTML5 | Estructura y marcado semántico |
| CSS3 | Estilos, animaciones y diseño responsive |
| JavaScript (Vanilla) | Lógica de cálculo y manipulación del DOM |
| Google Fonts (Poppins) | Tipografía del proyecto |

---

Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para cargar la fuente Google Fonts)
- ✅ No requiere instalación de dependencias
- ✅ No requiere backend ni servidor
- ✅ No requiere Node.js ni ningún framework

---

Cómo ejecutar localmente

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Davith-O/calculadora-aportes.git
   ```

2. **Entra a la carpeta del proyecto:**
   ```bash
   cd calculadora-salarial
   ```

3. **Abre el archivo principal en tu navegador:**
   ```bash
   # En Windows
   start index.html

   # En Mac
   open index.html

   # En Linux
   xdg-open index.html
   ```

---

Funcionalidades

- ✅ Cálculo de aportes a **Salud (4%)**
- ✅ Cálculo de aportes a **Pensión (16%)**
- ✅ Cálculo de **ARL** según 5 niveles de riesgo (0.522% al 6.960%)
- ✅ Cálculo de **Caja de Compensación (4%)**
- ✅ Validación que el salario no sea inferior al **mínimo legal vigente 2026 ($1.750.905 COP)**
- ✅ Formato de moneda en **pesos colombianos (COP)**
- ✅ Diseño **responsive** para móviles y escritorio
- ✅ Animaciones y transiciones suaves

---

Tasas de ARL por nivel de riesgo

| Nivel | Porcentaje | Actividades |
|-------|-----------|-------------|
| Riesgo 1 | 0.522% | Actividades administrativas |
| Riesgo 2 | 1.044% | Comercio, servicios |
| Riesgo 3 | 2.436% | Manufactura, industria |
| Riesgo 4 | 4.350% | Construcción, transporte |
| Riesgo 5 | 6.960% | Minería, petróleo |

---

Estructura del proyecto

```
calculadora-salarial/
│
├── index.html       # Estructura principal de la aplicación
├── estilo.css       # Estilos y diseño visual
├── script.js        # Lógica de cálculo de aportes
└── README.md        # Documentación del proyecto
```

---

Autor

Juan David Orozco
- GitHub: [@Davith-O](https://github.com/Davith-O)

---
