import { useState, useCallback } from "react";

// ── BCEP 2018 DATA ────────────────────────────────────────────────────────────
const NIVELES = { sala_cuna:"Primer Nivel (Sala Cuna)", medio:"Segundo Nivel (Medio)", transicion:"Tercer Nivel (Transición)" };

const PRINCIPIOS = [
  { id:"bienestar",    label:"Bienestar",    desc:"Integridad física, psicológica y moral del niño/a." },
  { id:"unidad",       label:"Unidad",       desc:"Cada niño/a enfrenta el aprendizaje en forma integral." },
  { id:"singularidad", label:"Singularidad", desc:"Cada niño/a es único con características propias." },
  { id:"actividad",    label:"Actividad",    desc:"El niño/a como protagonista de sus aprendizajes." },
  { id:"juego",        label:"Juego",        desc:"Estrategia pedagógica central en educación parvularia." },
  { id:"relacion",     label:"Relación",     desc:"Interacción positiva con pares y adultos como fuente de aprendizaje." },
  { id:"significado",  label:"Significado",  desc:"Aprendizajes conectados con experiencias y conocimientos previos." },
  { id:"potenciacion", label:"Potenciación", desc:"Confianza en las propias fortalezas para enfrentar nuevos desafíos." },
];

const OAS = {
  comunicacion: { label:"Comunicación Integral", nucleos: {
    lenguaje_verbal: { label:"Lenguaje Verbal",
      sala_cuna:["OA1: Expresar oralmente emociones y necesidades a través de balbuceos, vocalizaciones y gestos.","OA2: Expresar necesidades e intereses mediante combinación de palabras y gestos, progresivamente frases simples.","OA3: Identificar progresivamente la intención comunicativa de personas del entorno.","OA4: Comprender mensajes simples y breves en juegos y situaciones cotidianas.","OA5: Reconocer sonidos de diferentes fuentes sonoras del entorno cotidiano.","OA6: Incorporar nuevas palabras al repertorio lingüístico para comunicarse con otros.","OA7: Disfrutar de distintos textos gráficos al manipularlos y observar sus imágenes.","OA8: Comprender progresivamente contenidos explícitos de textos literarios y no literarios."],
      medio:["OA1: Expresarse oralmente empleando estructuras oracionales simples y respetando patrones gramaticales básicos.","OA2: Comprender mensajes simples como instrucciones explícitas, explicaciones y preguntas relativas a objetos, personas, acciones, tiempo y lugar.","OA3: Identificar atributos de sonidos de diferentes fuentes sonoras: intensidad (fuerte/suave), velocidad (rápido/lento).","OA4: Incorporar progresivamente nuevas palabras al comunicar oralmente temas variados de su interés.","OA5: Manifestar interés por descubrir el contenido de textos de diferentes formatos.","OA6: Comprender a partir de la escucha atenta contenidos explícitos de textos literarios y no literarios.","OA7: Reconocer progresivamente el significado de imágenes, logos y símbolos de su entorno cotidiano.","OA8: Producir sus propios signos gráficos en situaciones lúdicas."],
      transicion:["OA1: Expresarse oralmente en forma clara y comprensible, empleando estructuras oracionales completas y conjugaciones verbales adecuadas.","OA2: Comprender textos orales como preguntas, explicaciones, relatos, instrucciones y algunos conceptos abstractos.","OA3: Descubrir en contextos lúdicos atributos fonológicos de palabras: conteo, segmentación de sílabas, sonidos iniciales y finales.","OA4: Comunicar oralmente temas de su interés empleando vocabulario variado e incorporando palabras nuevas.","OA5: Manifestar interés por descubrir el contenido y propósitos de diferentes textos escritos.","OA6: Comprender contenidos explícitos de textos literarios y no literarios, realizando progresivamente inferencias y predicciones.","OA7: Reconocer palabras en diversos soportes asociando algunos fonemas a sus grafemas.","OA8: Representar gráficamente trazos, letras, signos, palabras significativas y mensajes simples legibles.","OA9: Comunicar mensajes simples en la lengua indígena pertinente a la comunidad.","OA10: Reconocer palabras o mensajes de lenguas maternas de pares distintas al castellano."],
    },
    lenguajes_artisticos: { label:"Lenguajes Artísticos",
      sala_cuna:["OA1: Manifestar interés por sonidos, texturas, colores y luminosidad del entorno.","OA2: Producir sonidos con su voz, cuerpo y objetos sonoros.","OA3: Imitar gestos, movimientos y sonidos del entorno significativo.","OA4: Manifestar preferencias por recursos expresivos en piezas musicales, visuales y escénicas.","OA5: Expresar corporalmente las emociones que le provocan piezas musicales, bailando y cantando.","OA6: Experimentar posibilidades de expresión plástica produciendo sus primeros garabateos."],
      medio:["OA1: Manifestar interés por diversas producciones artísticas (modelado, música, pintura, teatro, danzas), describiendo características.","OA2: Expresar preferencias y emociones relacionadas con recursos expresivos de obras visuales, musicales o escénicas.","OA3: Interpretar canciones y juegos musicales experimentando con la voz, el cuerpo, instrumentos y objetos.","OA4: Expresar corporalmente sensaciones y emociones con mímica, juegos teatrales, rondas y danzas.","OA5: Expresar emociones e ideas por medio de la plástica con recursos pictóricos, gráficos y de modelado.","OA6: Experimentar diversas posibilidades de expresión combinando lenguajes artísticos.","OA7: Representar a través del dibujo elementos del entorno incorporando figuras cerradas y primeros esbozos de la figura humana."],
      transicion:["OA1: Apreciar producciones artísticas de diversos contextos, describiendo y comparando características visuales, musicales o escénicas.","OA2: Comunicar impresiones, emociones e ideas respecto de obras de arte, producciones propias y de sus pares.","OA3: Interpretar canciones y juegos musicales usando de manera integrada voz, cuerpo, instrumentos y objetos.","OA4: Expresar corporalmente sensaciones, emociones e ideas a través de dramatización, mímica y danza.","OA5: Representar plásticamente emociones, ideas y experiencias a través de líneas, formas, colores y texturas.","OA6: Experimentar combinaciones de expresión plástica, corporal y musical.","OA7: Representar a través del dibujo ideas e intereses incorporando detalles a figuras humanas con organización espacial básica."],
    },
  }},
  desarrollo: { label:"Desarrollo Personal y Social", nucleos: {
    identidad: { label:"Identidad y Autonomía",
      sala_cuna:["OA1: Expresar vocal, gestual o corporalmente distintas necesidades o emociones.","OA2: Manifestar satisfacción cuando adultos significativos le expresan afecto.","OA3: Reconocer algunas emociones en adultos significativos.","OA4: Manifestar preferencias por algunas situaciones, objetos y juegos.","OA5: Manifestar interés por nuevas situaciones u objetos.","OA6: Reconocer algunos rasgos distintivos de su identidad: nombre e imagen física.","OA7: Incorporar rutinas básicas de alimentación, vigilia, sueño, higiene y vestuario."],
      medio:["OA1: Representar verbal y corporalmente diferentes emociones en sus juegos.","OA2: Manifestar disposición y confianza al separarse de los adultos significativos.","OA3: Reconocer en sí mismo y en otros emociones como tristeza, miedo, alegría y rabia.","OA4: Manifestar disposición para regular emociones en función de necesidades propias y acuerdos grupales.","OA5: Manifestar preferencias al participar en diversas situaciones cotidianas y juegos.","OA6: Actuar con progresiva independencia ampliando su repertorio de acciones.","OA7: Comunicar rasgos de su identidad: nombre, características corporales, género y otros.","OA8: Apreciar sus características identitarias, fortalezas y habilidades.","OA9: Manifestar progresiva independencia en prácticas de higiene, alimentación y evacuación.","OA10: Manifestar satisfacción y confianza por su autovalía comunicando desafíos alcanzados.","OA11: Identificar alimentos de celebraciones de su familia y comunidad.","OA12: Representar sus pensamientos atribuyendo significados a objetos en situaciones de juego."],
      transicion:["OA1: Comunicar emociones y sentimientos que le provocan diversas narraciones o situaciones.","OA2: Manifestar disposición y confianza para relacionarse con adultos y pares fuera del grupo.","OA3: Reconocer emociones en otras personas observadas en forma directa o TICs.","OA4: Expresar emociones autorregulándose en función de necesidades propias y normas grupales.","OA5: Comunicar sus preferencias, opiniones e ideas en diversas situaciones.","OA6: Planificar proyectos y juegos en función de sus ideas e intereses.","OA7: Comunicar rasgos de su identidad de género, roles y cualidades personales.","OA8: Comunicar características identitarias, fortalezas y desafíos personales.","OA9: Cuidar su bienestar en prácticas de higiene, alimentación y vestuario con independencia.","OA10: Comunicar desafíos alcanzados e identificar acciones que aportaron a su logro.","OA11: Distinguir parámetros de regulación de alimentos: etiquetado de sellos, fechas de vencimiento.","OA12: Anticipar acciones y prever situaciones en juegos, proyectos y sucesos.","OA13: Representar en juegos sociodramáticos pensamientos y experiencias."],
    },
    convivencia: { label:"Convivencia y Ciudadanía",
      sala_cuna:["OA1: Interactuar con pares y adultos significativos en diferentes situaciones y juegos.","OA2: Disfrutar de la cercanía de niños, niñas y adultos en juegos y situaciones cotidianas.","OA3: Manifestar interés por lo que le sucede a otros niños y niñas.","OA4: Manifestar interés por participar en celebraciones de su entorno significativo.","OA5: Practicar normas de convivencia: saludar, despedirse y colaborar en acciones cotidianas.","OA6: Manifestar disposición para responder a requerimientos del adulto asociados a su seguridad."],
      medio:["OA1: Participar en actividades y juegos grupales con pares, conversando, intercambiando pertenencias y cooperando.","OA2: Disfrutar de instancias de interacción social con diversas personas de la comunidad.","OA3: Colaborar en situaciones cotidianas y de juego, proponiendo acciones frente a necesidades de sus pares.","OA4: Colaborar en actividades, conmemoraciones o celebraciones culturales de su familia y comunidad.","OA5: Iniciarse en la resolución pacífica de conflictos, dialogando y proponiendo acciones.","OA6: Manifestar disposición para practicar acuerdos de convivencia básica.","OA7: Identificar objetos y situaciones de riesgo para su seguridad y bienestar.","OA8: Reconocer acciones correctas e incorrectas para la convivencia armónica del grupo.","OA9: Manifestar interés por algunos de sus derechos: ser escuchados, tener un nombre, jugar.","OA10: Manifestar interés por interactuar reconociendo diversidad de características y formas de vida."],
      transicion:["OA1: Participar en juegos colaborativos, planificando estrategias y asumiendo responsabilidades.","OA2: Participar en actividades solidarias que integran a familias y comunidad.","OA3: Manifestar empatía y solidaridad practicando escucha, apoyo y colaboración.","OA4: Apreciar el significado de diversas manifestaciones culturales del entorno.","OA5: Aplicar estrategias pacíficas frente a la resolución de conflictos cotidianos.","OA6: Respetar normas y acuerdos creados colaborativamente con pares y adultos.","OA7: Identificar situaciones de riesgo proponiendo alternativas para enfrentarlas.","OA8: Comprender que sus decisiones en proyectos colectivos influyen en sus pares.","OA9: Reconocer y hacer respetar el derecho a expresarse y ser escuchado.","OA10: Reconocer requerimientos de convivencia democrática: escucha, respeto y turnos.","OA11: Apreciar la diversidad de personas y sus formas de vida."],
    },
    corporalidad: { label:"Corporalidad y Movimiento",
      sala_cuna:["OA1: Manifestar agrado al sentirse cómodo, seguro y contenido corporalmente.","OA2: Descubrir partes de su cuerpo y características físicas a través de experiencias sensoriomotrices.","OA3: Manifestar interés y satisfacción al moverse libremente en situaciones cotidianas y lúdicas.","OA4: Ampliar posibilidades de exploración sensoriomotriz adquiriendo control de prensión palmar voluntaria.","OA5: Adquirir desplazamiento gradual (girar, reptar, ponerse de pie, caminar).","OA6: Coordinar movimientos de manipulación ubicando objetos en relación a su propio cuerpo.","OA7: Explorar alternancia de posturas y movimientos: trepar, lanzar objetos, adquiriendo control gradual."],
      medio:["OA1: Reconocer situaciones en que se siente cómodo corporalmente, manifestando bienestar al adulto.","OA2: Reconocer las principales partes, características físicas de su cuerpo y sus funciones.","OA3: Experimentar diversas posibilidades de acción con su cuerpo identificando vocabulario asociado.","OA4: Reconocer el bienestar que produce el movimiento libre manifestando interés por desarrollarlo frecuentemente.","OA5: Perfeccionar coordinación visomotriz fina a través del uso de objetos, juguetes y utensilios.","OA6: Adquirir control y equilibrio en movimientos, posturas y desplazamientos en diferentes direcciones.","OA7: Resolver desafíos prácticos incorporando mayor precisión y coordinación en movimientos.","OA8: Utilizar categorías de ubicación espacial y temporal: adelante/atrás, arriba/abajo, antes/después."],
      transicion:["OA1: Manifestar iniciativa para resguardar el autocuidado de su cuerpo y confortabilidad.","OA2: Apreciar sus características corporales manifestando interés y cuidado por su bienestar.","OA3: Tomar conciencia de su cuerpo, características internas, esquema corporal y lateralidad.","OA4: Comunicar nuevas posibilidades de acción logradas a través de su cuerpo empleando vocabulario preciso.","OA5: Comunicar el bienestar que produce el movimiento al ejercitar su cuerpo habitualmente.","OA6: Coordinar con precisión habilidades psicomotrices finas en función de intereses de exploración.","OA7: Resolver desafíos manteniendo control, equilibrio y coordinación al combinar movimientos.","OA8: Coordinar habilidades psicomotoras practicando posturas de fuerza, resistencia y tracción.","OA9: Utilizar categorías de ubicación espacial y temporal en situaciones cotidianas y lúdicas."],
    },
  }},
  interaccion: { label:"Interacción y Comprensión del Entorno", nucleos: {
    entorno_natural: { label:"Exploración del Entorno Natural",
      sala_cuna:["OA1: Manifestar curiosidad y asombro por elementos del entorno natural: arena, lluvia, viento.","OA2: Reconocer elementos representativos del entorno natural: animales, plantas, ríos.","OA3: Explorar el entorno observando, manipulando y experimentando con materiales de interés.","OA4: Descubrir características de animales observándolos directamente, en textos e imágenes.","OA5: Colaborar en actividades sencillas de cuidado de la naturaleza."],
      medio:["OA1: Manifestar interés y asombro por elementos del entorno natural, explorando, observando y preguntando.","OA2: Comunicar características de elementos y paisajes del entorno natural y fenómenos naturales.","OA3: Descubrir que el sol es fuente de luz y calor para el planeta.","OA4: Comunicar propiedades básicas de los elementos naturales: colores, texturas, tamaños, temperaturas.","OA5: Distinguir variedad de animales y plantas respecto a características, necesidades y lugares que habitan.","OA6: Colaborar en acciones que contribuyen al desarrollo de ambientes sostenibles.","OA7: Emplear instrumentos de observación y recolección en la exploración del entorno natural.","OA8: Experimentar mezclas y disoluciones con materiales cotidianos describiendo los cambios.","OA9: Reconocer que el aire y el agua son elementos vitales para personas, animales y plantas."],
      transicion:["OA1: Manifestar interés al ampliar información sobre cambios en el entorno natural.","OA2: Formular conjeturas y predicciones sobre causas de fenómenos naturales.","OA3: Reconocer la importancia del agua y la energía solar para la vida.","OA4: Comunicar propiedades básicas de objetos y elementos naturales relacionándolos con posibles usos.","OA5: Explorar cambios que se producen en materiales al aplicarles fuerza, calor o agua.","OA6: Establecer relaciones de semejanzas y diferencias de animales y plantas.","OA7: Describir semejanzas y diferencias en el proceso de crecimiento de personas, animales y plantas.","OA8: Practicar acciones cotidianas que contribuyen al cuidado de ambientes sostenibles.","OA9: Comunicar observaciones, instrumentos utilizados y hallazgos en experiencias de indagación.","OA10: Formular conjeturas a partir de cambios observados en mezclas y disoluciones.","OA11: Identificar condiciones que caracterizan ambientes saludables.","OA12: Comprender que la acción humana puede aportar al desarrollo sostenible y también deteriorarlo."],
    },
    entorno_sociocultural: { label:"Comprensión del Entorno Sociocultural",
      sala_cuna:["OA1: Imitar gestos y acciones que realizan personas de su entorno cercano.","OA2: Identificar actividades habituales de la vida cotidiana.","OA3: Manifestar interés por canciones, juegos y bailes de su cotidianeidad.","OA4: Explorar utensilios domésticos y objetos tecnológicos de su vida cotidiana.","OA5: Reconocer objetos y personas asociándolos a ciertos lugares del entorno."],
      medio:["OA1: Describir actividades habituales de su comunidad señalando su participación en ellas.","OA2: Describir características de las formas de vida de su comunidad: viviendas, paisajes, costumbres.","OA3: Seleccionar utensilios y objetos tecnológicos que les permiten resolver problemas.","OA4: Reconocer sucesos significativos de su historia personal y familiar.","OA5: Identificar instituciones significativas del entorno describiendo actividades y rutinas.","OA6: Identificar normas de protección y seguridad referidas a alimentación, tránsito y sismos.","OA7: Distinguir en paisajes de su localidad elementos naturales y culturales."],
      transicion:["OA1: Comprender los roles de miembros de su familia y comunidad y su aporte al bienestar común.","OA2: Apreciar diversas formas de vida de comunidades del país y del mundo en el pasado y presente.","OA3: Comparar características de diseño, funcionamiento y utilidad de objetos tecnológicos.","OA4: Formular interpretaciones respecto de necesidades que dieron origen a creaciones e inventos.","OA5: Comunicar relatos sobre hechos significativos del pasado de su comunidad y país.","OA6: Reconocer acciones para el cuidado del patrimonio cultural material e inmaterial.","OA7: Reconocer la importancia del servicio de instituciones y lugares de interés patrimonial.","OA8: Conocer sobre la vida de mujeres y hombres que han realizado aportes en su comunidad y el mundo.","OA9: Ampliar estrategias de indagación usando diversas fuentes y tecnologías.","OA10: Comprender normas de protección y seguridad referidas a tránsito, incendios y sismos.","OA11: Identificar lugares del entorno a través de representaciones geográficas."],
    },
    matematico: { label:"Pensamiento Matemático",
      sala_cuna:["OA1: Adquirir noción de permanencia de objetos mediante juegos con objetos cotidianos.","OA2: Explorar atributos de objetos: tamaño, textura y dureza.","OA3: Experimentar con objetos resolviendo situaciones concretas.","OA4: Utilizar nociones de ubicación: dentro/fuera, encima/debajo.","OA5: Orientarse temporalmente en situaciones cotidianas: antes/después.","OA6: Emplear cuantificadores: más/menos, mucho/poco."],
      medio:["OA1: Reproducir patrones sonoros, visuales, gestuales y corporales de dos o tres elementos.","OA2: Establecer relaciones al clasificar por dos atributos y seriar por altura o longitud.","OA3: Describir la posición de objetos usando: dentro/fuera, encima/debajo, cerca/lejos.","OA4: Orientarse temporalmente usando: antes/después, día/noche, hoy/mañana.","OA5: Emplear cuantificadores: más/menos, mucho/poco, todo/ninguno.","OA6: Emplear los números para contar, identificar y comparar cantidades hasta el 10.","OA7: Representar progresivamente números y cantidades en forma concreta y pictórica hasta el 10.","OA8: Resolver problemas simples de manera concreta y pictórica, agregando o quitando hasta 5.","OA9: Descubrir atributos de figuras 3D mediante exploración de objetos.","OA10: Identificar acciones llevadas a cabo para resolver problemas."],
      transicion:["OA1: Crear patrones sonoros, visuales, gestuales y corporales de dos o tres elementos.","OA2: Clasificar por dos o tres atributos y seriar por altura, ancho, longitud o capacidad.","OA3: Comunicar posición de objetos usando conceptos de ubicación, distancia y dirección.","OA4: Emplear cuantificadores: más que, menos que, igual que.","OA5: Orientarse temporalmente usando nociones de secuencia, frecuencia y duración.","OA6: Emplear los números para contar, identificar y comparar cantidades hasta el 20.","OA7: Representar números y cantidades hasta el 10 en forma concreta, pictórica y simbólica.","OA8: Resolver problemas simples de manera concreta y pictórica agregando o quitando hasta 10.","OA9: Representar objetos desde arriba, del lado y abajo a través de dibujos y fotografías.","OA10: Identificar atributos de figuras 2D y 3D: forma, lados, vértices, caras.","OA11: Emplear medidas no estandarizadas para determinar longitud de objetos.","OA12: Comunicar el proceso de resolución de problemas identificando pregunta, acciones y respuestas."],
    },
  }},
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const pink = "#e5608a";
const pinkLight = "#fbeaf0";
const pinkBorder = "#f4c0d1";
const green = "#1D9E75";
const greenLight = "#E1F5EE";

const Chip = ({ label, selected, onClick, title }) => (
  <span title={title} onClick={onClick} style={{
    padding:"5px 13px", borderRadius:20, fontSize:12, cursor:"pointer",
    border:`0.5px solid ${selected ? pink : "var(--color-border-secondary)"}`,
    background: selected ? pinkLight : "var(--color-background-secondary)",
    color: selected ? "#72243E" : "var(--color-text-primary)",
    userSelect:"none", transition:"all .15s"
  }}>{label}</span>
);

const Field = ({ label, children, full }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:4, gridColumn: full ? "1/-1" : undefined }}>
    <label style={{ fontSize:12, fontWeight:500, color:"var(--color-text-secondary)" }}>{label}</label>
    {children}
  </div>
);

const inputStyle = {
  fontFamily:"var(--font-sans)", fontSize:14, padding:"7px 10px",
  border:"0.5px solid var(--color-border-secondary)", borderRadius:8,
  background:"var(--color-background-primary)", color:"var(--color-text-primary)", width:"100%"
};

const SelectField = ({ label, value, onChange, options, full }) => (
  <Field label={label} full={full}>
    <select value={value} onChange={e => onChange(e.target.value)} style={inputStyle}>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
  </Field>
);

// ── PRINT / PDF — works inside Claude artifact iframe ─────────────────────────
function printPlan(plan, meta) {
  const principList = (plan.principios || "").split(",").map(p => p.trim()).filter(Boolean);

  const css = `
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Georgia,serif;max-width:720px;margin:0 auto;padding:28px 32px;color:#1a1a1a;font-size:13px;line-height:1.65;background:#fff}
    h1{font-size:19px;font-weight:700;color:#72243E;margin-bottom:6px}
    .meta{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:18px}
    .meta span{background:#fbeaf0;color:#993556;padding:3px 9px;border-radius:20px;font-size:11px;font-family:sans-serif}
    .section{margin-bottom:16px;page-break-inside:avoid}
    .section h2{font-size:10px;font-weight:700;color:#e5608a;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid #f4c0d1;padding-bottom:4px;margin-bottom:8px;font-family:sans-serif}
    .badge{display:inline-block;background:#fbeaf0;color:#72243E;border:0.5px solid #f4c0d1;padding:5px 12px;border-radius:6px;font-size:12px;margin-bottom:4px}
    .badge-blue{display:inline-block;background:#E6F1FB;color:#0C447C;border:0.5px solid #B5D4F4;padding:5px 12px;border-radius:6px;font-size:12px}
    .chips{display:flex;flex-wrap:wrap;gap:5px}
    .chip{background:#f5f5f5;border:0.5px solid #ddd;padding:3px 10px;border-radius:20px;font-size:11px;font-family:sans-serif}
    .sub{font-weight:700;margin:10px 0 3px}
    .eval-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}
    .eval-box{background:#f8f8f8;border-radius:6px;padding:11px}
    .eval-box h3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#666;margin:0 0 7px;font-family:sans-serif}
    ul{margin:0;padding-left:15px}
    li{margin-bottom:4px;font-size:12px}
    .dua-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin-top:8px}
    .dua-box{border-radius:6px;padding:10px}
    .dua-box h3{font-size:10px;font-weight:700;margin:0 0 4px;text-transform:uppercase;letter-spacing:.05em;font-family:sans-serif}
    .dua-box p{font-size:12px;line-height:1.5}
    @media print{body{padding:16px}.no-print{display:none!important}.section{page-break-inside:avoid}}
  `;

  const duaSection = meta.dua && plan.dua_compromiso ? `
    <div class="section">
      <h2>Adecuaciones DUA (Decreto 83)</h2>
      <div class="dua-grid">
        <div class="dua-box" style="background:#E1F5EE"><h3 style="color:#085041">Compromiso</h3><p style="color:#0F6E56">${plan.dua_compromiso||""}</p></div>
        <div class="dua-box" style="background:#E6F1FB"><h3 style="color:#0C447C">Representación</h3><p style="color:#185FA5">${plan.dua_representacion||""}</p></div>
        <div class="dua-box" style="background:#EEEDFE"><h3 style="color:#3C3489">Acción y Expresión</h3><p style="color:#534AB7">${plan.dua_accion||""}</p></div>
      </div>
    </div>` : "";

  const bodyHtml = `
    <div class="no-print" style="background:#fbeaf0;padding:10px 16px;border-radius:8px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;font-family:sans-serif">
      <span style="font-size:13px;color:#72243E;font-weight:500">✦ Vista previa — Planificación lista para imprimir</span>
      <button onclick="window.print()" style="background:#e5608a;color:white;border:none;border-radius:6px;padding:7px 16px;font-size:13px;cursor:pointer;font-weight:500">🖨 Imprimir / Guardar PDF</button>
    </div>
    <h1>"${plan.titulo||""}"</h1>
    <div class="meta">
      <span>🏫 ${meta.estab}</span><span>👤 ${meta.edu}</span><span>👥 ${meta.curso}</span>
      <span>📚 ${meta.nivel}</span><span>📅 ${meta.fecha}</span><span>⏱ ${meta.duracion}</span><span>📍 ${meta.zona}</span>
    </div>
    <div class="section">
      <h2>Fundamentos Pedagógicos Aplicados</h2>
      <div class="chips">${principList.map(p=>`<span class="chip">${p}</span>`).join("")}</div>
    </div>
    <div class="section">
      <h2>Objetivo de Aprendizaje (OA)</h2>
      <div class="badge">${plan.oa_texto||""}</div>
    </div>
    <div class="section">
      <h2>Objetivo de Aprendizaje Transversal (OAT)</h2>
      <div class="badge-blue">${plan.oat_texto||""}</div>
    </div>
    <div class="section">
      <h2>Descripción de la Experiencia de Aprendizaje</h2>
      <p class="sub">Inicio:</p><p>${plan.inicio||""}</p>
      <p class="sub">Desarrollo:</p><p>${plan.desarrollo||""}</p>
      <p class="sub">Cierre:</p><p>${plan.cierre||""}</p>
    </div>
    <div class="section">
      <h2>Recursos y Materiales</h2>
      <p>${plan.recursos||""}</p>
    </div>
    ${duaSection}
    <div class="section">
      <h2>Evaluación</h2>
      <p>${plan.evaluacion||""}</p>
      <div class="eval-grid">
        <div class="eval-box"><h3>Preguntas para el Aprendizaje</h3><ul>${(plan.preguntas||[]).map(p=>`<li>${p}</li>`).join("")}</ul></div>
        <div class="eval-box"><h3>Focos de Observación</h3><ul>${(plan.focos||[]).map(f=>`<li>${f}</li>`).join("")}</ul></div>
      </div>
    </div>
  `;

  // Render inside a full-screen iframe within the same document (works in sandboxed iframes)
  let iframe = document.getElementById("__print_frame__");
  if (iframe) iframe.remove();
  iframe = document.createElement("iframe");
  iframe.id = "__print_frame__";
  iframe.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:9999;background:#fff";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Planificación</title><style>${css}</style></head><body>${bodyHtml}</body></html>`);
  doc.close();

  // Close button — returns to the app
  const closeBtn = doc.createElement("button");
  closeBtn.className = "no-print";
  closeBtn.textContent = "✕ Cerrar vista previa";
  closeBtn.style.cssText = "position:fixed;bottom:16px;right:16px;background:#333;color:white;border:none;border-radius:6px;padding:8px 14px;font-size:13px;cursor:pointer;font-family:sans-serif;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,0.3)";
  closeBtn.onclick = () => iframe.remove();
  doc.body.appendChild(closeBtn);
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("setup"); // setup | gen | output
  const [estabName, setEstabName] = useState("");
  const [estabRegion, setEstabRegion] = useState("");
  const [estabDone, setEstabDone] = useState(false);
  const [cursoName, setCursoName] = useState("");
  const [cursoNivel, setCursoNivel] = useState("");
  const [cursoEdu, setCursoEdu] = useState("");
  const [cursoDone, setCursoDone] = useState(false);
  const [openForm, setOpenForm] = useState("estab");

  // Generator state
  const [nivel, setNivel] = useState("medio");
  const [idea, setIdea] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [ambito, setAmbito] = useState("");
  const [nucleo, setNucleo] = useState("");
  const [oa, setOa] = useState("");
  const [nucleoOat, setNucleoOat] = useState("identidad");
  const [oat, setOat] = useState("");
  const [selPrincipios, setSelPrincipios] = useState(new Set(["bienestar","juego","actividad","singularidad"]));
  const [modoMat, setModoMat] = useState("creativo");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [zona, setZona] = useState("Sala de Clases");
  const [interaccion, setInteraccion] = useState("Grupal");
  const [duracion, setDuracion] = useState("45 minutos");
  const [foco, setFoco] = useState("Juego guiado");
  const [formato, setFormato] = useState("estandar");
  const [dua, setDua] = useState(false);

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  // ── derived data
  const nucleosDisp = ambito && OAS[ambito] ? Object.entries(OAS[ambito].nucleos).map(([k,v])=>({value:k,label:v.label})) : [];
  const oasDisp = ambito && nucleo && OAS[ambito]?.nucleos[nucleo] ? (OAS[ambito].nucleos[nucleo][nivel] || OAS[ambito].nucleos[nucleo].medio || []) : [];
  const oatsDisp = OAS.desarrollo.nucleos[nucleoOat]?.[nivel] || OAS.desarrollo.nucleos[nucleoOat]?.medio || [];
  const nucleoOatLabel = OAS.desarrollo.nucleos[nucleoOat]?.label || "";
  const steps = (estabDone?1:0)+(cursoDone?1:0);

  const togglePrincipio = id => {
    setSelPrincipios(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  };

  const addTag = () => {
    const v = tagInput.trim();
    if (v && !tags.includes(v)) setTags(t=>[...t,v]);
    setTagInput("");
  };

  const genMeta = () => ({
    estab: estabName||"Establecimiento", edu: cursoEdu||"Educadora",
    curso: cursoName+(cursoNivel?" — "+NIVELES[cursoNivel]:""),
    nivel: NIVELES[nivel]||nivel, fecha, zona, duracion, dua
  });

  // ── API call
  const generar = useCallback(async () => {
    if (!idea.trim()) { setError("Ingresa una idea de actividad."); return; }
    setError(""); setLoading(true); setPlan(null);
    setView("output");

    const meta = genMeta();
    const principiosArr = Array.from(selPrincipios).map(id=>PRINCIPIOS.find(p=>p.id===id)?.label).filter(Boolean);
    const mat = tags.length>0 ? tags.join(", ") : "a definir según la actividad";

    const prompt = `Eres experta en educación parvularia chilena con profundo conocimiento del BCEP 2018. Genera una planificación de experiencia de aprendizaje completa y de alta calidad pedagógica.

DATOS:
- Establecimiento: ${meta.estab}
- Educadora/or: ${meta.edu}
- Curso: ${meta.curso}
- Nivel BCEP: ${meta.nivel}
- Fecha: ${meta.fecha}
- Idea de actividad: ${idea}
- Zona: ${zona}, Interacción: ${interaccion}, Duración: ${duracion}, Foco: ${foco}
- Principios pedagógicos: ${principiosArr.join(", ")}
- Materiales (modo ${modoMat}): ${mat}

OBJETIVOS:
- OA Principal: ${oa || "seleccionar el más pertinente"}
- Ámbito Transversal: Desarrollo Personal y Social / Núcleo: ${nucleoOatLabel}
- OAT: ${oat || "seleccionar el más pertinente"}
${dua ? "- Incluir adecuaciones DUA Decreto 83: Compromiso, Representación, Acción/Expresión" : ""}
FORMATO: ${formato==="integra" ? "Fundación Integra — Rol del Niño, Rol del Equipo Pedagógico, Participación de Familias" : "Estándar MINEDUC — Inicio, Desarrollo y Cierre"}

Responde SOLO con JSON válido sin markdown ni backticks:
{"titulo":"título creativo","descripcion":"2 oraciones","oa_texto":"OA completo aplicado","oat_texto":"OAT completo aplicado","principios":"lista separada por comas","inicio":"inicio detallado 3-4 oraciones","desarrollo":"desarrollo detallado 5-6 oraciones","cierre":"cierre detallado 3-4 oraciones","recursos":"materiales separados por comas","preguntas":["p1","p2","p3"],"focos":["f1","f2"],"evaluacion":"proceso evaluativo"${dua?',"dua_compromiso":"...","dua_representacion":"...","dua_accion":"..."':''}}`;

    try {
      const res = await fetch("/.netlify/functions/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error("Error HTTP " + res.status);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const txt = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!txt) throw new Error("La IA no devolvió respuesta.");
      const start = txt.indexOf("{");
      const end = txt.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No se recibió JSON válido de la IA.");
      const parsed = JSON.parse(txt.slice(start, end + 1));
      setPlan(parsed);
    } catch(e) {
      setError("Error al generar: "+e.message);
    }
    setLoading(false);
  }, [idea, zona, interaccion, duracion, foco, modoMat, tags, oa, oat, nucleoOatLabel, dua, formato, nivel, selPrincipios, estabName, cursoEdu, cursoName, cursoNivel, fecha]);

  // ── RENDER SETUP ─────────────────────────────────────────────────────────
  if (view==="setup") return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
        <div style={{fontSize:26,fontWeight:500,color:"var(--color-text-primary)"}}>✦ Generador de Planificaciones</div>
        <div style={{fontSize:13,color:"var(--color-text-secondary)",marginTop:4}}>Bases Curriculares de Educación Parvularia 2018</div>
      </div>
      <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"1.25rem"}}>
        <div style={{textAlign:"center",marginBottom:"1.25rem"}}>
          <div style={{width:48,height:48,borderRadius:12,background:pinkLight,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:8}}>✦</div>
          <div style={{fontSize:16,fontWeight:500}}>Configura tu espacio de trabajo</div>
          <div style={{fontSize:13,color:"var(--color-text-secondary)",marginTop:3}}>Ingresa los datos de tu establecimiento y curso</div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--color-text-secondary)",marginBottom:5}}>
          <span>Progreso de configuración</span>
          <span style={{color:pink,fontWeight:500}}>{steps} de 2 pasos</span>
        </div>
        <div style={{height:4,background:"var(--color-background-secondary)",borderRadius:2,marginBottom:"1rem",overflow:"hidden"}}>
          <div style={{height:"100%",background:pink,borderRadius:2,width:`${steps*50}%`,transition:"width .4s"}}/>
        </div>

        {/* Establecimiento */}
        <div style={{border:`0.5px solid ${estabDone?green:pink}`,borderRadius:8,marginBottom:10,background:estabDone?greenLight:pinkLight}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px",cursor:"pointer"}}
               onClick={()=>setOpenForm(f=>f==="estab"?null:"estab")}>
            <div style={{width:32,height:32,borderRadius:8,background:estabDone?"#9FE1CB":pinkBorder,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
              {estabDone?"✓":"🏫"}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:500}}>{estabDone?"Establecimiento configurado":"Configura tu Establecimiento"}</div>
              <div style={{fontSize:12,color:"var(--color-text-secondary)"}}>{estabDone?estabName:"El nombre e identidad de tu colegio o jardín."}</div>
            </div>
            <span style={{fontSize:12}}>{openForm==="estab"?"▲":"▼"}</span>
          </div>
          {openForm==="estab" && (
            <div style={{padding:"0 12px 12px",borderTop:`0.5px solid ${pinkBorder}`}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"10px 0"}}>
                <Field label="Nombre del Establecimiento *" full>
                  <input style={inputStyle} value={estabName} onChange={e=>setEstabName(e.target.value)} placeholder="Ej: Jardín Campanita"/>
                </Field>
                <Field label="Región">
                  <select style={inputStyle} value={estabRegion} onChange={e=>setEstabRegion(e.target.value)}>
                    <option value="">Seleccione región</option>
                    {["Región Metropolitana","Valparaíso","Biobío","La Araucanía","Maule","O'Higgins","Los Lagos","Antofagasta","Coquimbo","Tarapacá","Arica y Parinacota","Atacama","Ñuble","Los Ríos","Aysén","Magallanes"].map(r=><option key={r}>{r}</option>)}
                  </select>
                </Field>
              </div>
              <button onClick={()=>{if(!estabName.trim()){alert("Ingresa el nombre");return}setEstabDone(true);setOpenForm("curso");}}
                style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"7px 16px",fontSize:13,fontWeight:500,cursor:"pointer"}}>
                ✓ Guardar
              </button>
            </div>
          )}
        </div>

        {/* Curso */}
        <div style={{border:`0.5px solid ${cursoDone?green:"var(--color-border-secondary)"}`,borderRadius:8,marginBottom:12,background:cursoDone?greenLight:"var(--color-background-primary)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px",cursor:"pointer"}}
               onClick={()=>setOpenForm(f=>f==="curso"?null:"curso")}>
            <div style={{width:32,height:32,borderRadius:8,background:cursoDone?"#9FE1CB":"var(--color-background-secondary)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
              {cursoDone?"✓":"📖"}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:500}}>{cursoDone?"Curso creado":"Crea tu Primer Curso"}</div>
              <div style={{fontSize:12,color:"var(--color-text-secondary)"}}>{cursoDone?`${cursoName} — ${NIVELES[cursoNivel]}`:"Define el nivel y año académico."}</div>
            </div>
            <span style={{fontSize:12}}>{openForm==="curso"?"▲":"▼"}</span>
          </div>
          {openForm==="curso" && (
            <div style={{padding:"0 12px 12px",borderTop:"0.5px solid var(--color-border-tertiary)"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"10px 0"}}>
                <Field label="Nombre del Curso *">
                  <input style={inputStyle} value={cursoName} onChange={e=>setCursoName(e.target.value)} placeholder="Ej: Sala Mariposas"/>
                </Field>
                <Field label="Nivel Educativo *">
                  <select style={inputStyle} value={cursoNivel} onChange={e=>{setCursoNivel(e.target.value);setNivel(e.target.value||"medio");}}>
                    <option value="">Seleccione nivel</option>
                    <option value="sala_cuna">Sala Cuna (0-2 años)</option>
                    <option value="medio">Nivel Medio (2-4 años)</option>
                    <option value="transicion">Transición NT1/NT2 (4-6 años)</option>
                  </select>
                </Field>
                <Field label="Educadora / Educador">
                  <input style={inputStyle} value={cursoEdu} onChange={e=>setCursoEdu(e.target.value)} placeholder="Nombre completo"/>
                </Field>
                <Field label="Año Académico">
                  <input style={inputStyle} value="2026" readOnly/>
                </Field>
              </div>
              <button onClick={()=>{if(!cursoName.trim()||!cursoNivel){alert("Completa nombre y nivel");return}setCursoDone(true);setOpenForm(null);}}
                style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"7px 16px",fontSize:13,fontWeight:500,cursor:"pointer"}}>
                ✓ Guardar
              </button>
            </div>
          )}
        </div>

        <button onClick={()=>setView("gen")} disabled={!estabDone}
          style={{width:"100%",padding:"12px",background:estabDone?pink:"var(--color-background-secondary)",color:estabDone?"white":"var(--color-text-tertiary)",border:"none",borderRadius:8,fontSize:15,fontWeight:500,cursor:estabDone?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          ✦ Ir a generar mi planificación →
        </button>
      </div>
    </div>
  );

  // ── RENDER GENERATOR ──────────────────────────────────────────────────────
  if (view==="gen") return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{textAlign:"center",marginBottom:"1.25rem"}}>
        <div style={{fontSize:22,fontWeight:500}}>✦ Generador de Planificaciones</div>
        <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:3}}>BCEP 2018 · {estabName}</div>
      </div>
      <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"1.25rem"}}>

        {/* Idea + fecha */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:10,marginBottom:"1rem"}}>
          <Field label="Idea de Actividad *" full>
            <input style={{...inputStyle,fontSize:15}} value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Ej: Juego para explorar las partes del cuerpo"/>
          </Field>
          <Field label="Fecha">
            <input type="date" style={inputStyle} value={fecha} onChange={e=>setFecha(e.target.value)}/>
          </Field>
        </div>

        {/* Nivel tabs */}
        <div style={{borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:"1rem",marginBottom:"1rem"}}>
          <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Objetivo de Aprendizaje (OA) — Ámbito Principal</div>
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            {[["medio","Nivel Medio"],["transicion","Transición"],["sala_cuna","Sala Cuna"]].map(([v,l])=>(
              <button key={v} onClick={()=>{setNivel(v);setOa("");setOat("");}}
                style={{padding:"5px 14px",borderRadius:20,fontSize:12,fontWeight:500,cursor:"pointer",border:`0.5px solid ${nivel===v?pink:"var(--color-border-secondary)"}`,background:nivel===v?pink:"transparent",color:nivel===v?"white":"var(--color-text-secondary)"}}>
                {l}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <SelectField label="Ámbito Principal" value={ambito} onChange={v=>{setAmbito(v);setNucleo("");setOa("");}}
              options={[{value:"",label:"Seleccione ámbito"},...Object.entries(OAS).map(([k,v])=>({value:k,label:v.label}))]}/>
            <SelectField label="Núcleo Principal" value={nucleo} onChange={v=>{setNucleo(v);setOa("");}}
              options={[{value:"",label:"Seleccione núcleo"},...nucleosDisp]}/>
            {oasDisp.length>0 && (
              <Field label="Selecciona el OA Principal" full>
                <select value={oa} onChange={e=>setOa(e.target.value)} style={inputStyle}>
                  <option value="">Seleccione un OA</option>
                  {oasDisp.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            )}
          </div>
        </div>

        {/* OAT */}
        <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:12,marginBottom:"1rem"}}>
          <div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:8}}>
            <span style={{fontWeight:500,color:"var(--color-text-primary)"}}>Ámbito Transversal (OAT):</span> Desarrollo Personal y Social — <span style={{color:pink}}>siempre presente</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <SelectField label="Núcleo Transversal" value={nucleoOat} onChange={v=>{setNucleoOat(v);setOat("");}}
              options={[{value:"identidad",label:"Identidad y Autonomía"},{value:"convivencia",label:"Convivencia y Ciudadanía"},{value:"corporalidad",label:"Corporalidad y Movimiento"}]}/>
            <SelectField label="Selecciona el OAT" value={oat} onChange={setOat}
              options={[{value:"",label:"Seleccione un OAT"},...oatsDisp.map(o=>({value:o,label:o}))]}/>
          </div>
        </div>

        {/* Principios */}
        <div style={{borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:"1rem",marginBottom:"1rem"}}>
          <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Principios Pedagógicos BCEP</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {PRINCIPIOS.map(p=>(
              <Chip key={p.id} label={p.label} selected={selPrincipios.has(p.id)} onClick={()=>togglePrincipio(p.id)} title={p.desc}/>
            ))}
          </div>
        </div>

        {/* Materiales */}
        <div style={{borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:"1rem",marginBottom:"1rem"}}>
          <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Modo de Uso de Materiales</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
            {[["creativo","✦","Creativo","Sorpréndeme con nuevos materiales."],["hibrido","↺","Híbrido","Mis materiales y sugerencias."],["estricto","🔒","Estricto","Solo mis materiales."]].map(([v,ic,n,d])=>(
              <div key={v} onClick={()=>setModoMat(v)} style={{border:`0.5px solid ${modoMat===v?pink:"var(--color-border-secondary)"}`,borderRadius:8,padding:10,cursor:"pointer",background:modoMat===v?pinkLight:"var(--color-background-primary)"}}>
                <div style={{fontSize:16,color:pink,marginBottom:3}}>{ic}</div>
                <div style={{fontSize:13,fontWeight:500}}>{n}</div>
                <div style={{fontSize:11,color:"var(--color-text-secondary)"}}>{d}</div>
              </div>
            ))}
          </div>
          {modoMat!=="creativo" && (
            <div>
              <Field label="Mis materiales (Enter para agregar)">
                <div style={{display:"flex",flexWrap:"wrap",gap:7,padding:10,border:"0.5px solid var(--color-border-secondary)",borderRadius:8,minHeight:46,cursor:"text"}}
                     onClick={()=>document.getElementById("taginput").focus()}>
                  {tags.map(t=>(
                    <span key={t} onClick={()=>setTags(ts=>ts.filter(x=>x!==t))}
                      style={{padding:"3px 10px",borderRadius:20,fontSize:12,cursor:"pointer",background:pinkLight,border:`0.5px solid ${pink}`,color:"#72243E"}}>
                      {t} ×
                    </span>
                  ))}
                  <input id="taginput" style={{border:"none",outline:"none",fontSize:13,fontFamily:"var(--font-sans)",background:"transparent",color:"var(--color-text-primary)",minWidth:140}}
                    value={tagInput} onChange={e=>setTagInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addTag())}
                    placeholder="Escribe un material..."/>
                </div>
              </Field>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:7,alignItems:"center"}}>
                <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>Sugerencias:</span>
                {["Cuento ilustrado","Plastilina","Lápices de colores","Bloques de madera","Títeres","Música suave","Aros","Cuerdas","Témpera","Pelotas"].map(s=>(
                  <span key={s} onClick={()=>{if(!tags.includes(s))setTags(t=>[...t,s]);}}
                    style={{padding:"3px 10px",borderRadius:20,fontSize:11,cursor:"pointer",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",color:"var(--color-text-primary)"}}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ajustes */}
        <div style={{borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:"1rem",marginBottom:"1rem"}}>
          <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Ajustes Pedagógicos</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            <SelectField label="Zona de Actividad" value={zona} onChange={setZona} options={["Sala de Clases","Patio / Exterior","Sala de Psicomotricidad","Sala de Música","Biblioteca","Comedor"]}/>
            <SelectField label="Tipo de Interacción" value={interaccion} onChange={setInteraccion} options={["Grupal","Individual","Parejas","Pequeños grupos"]}/>
            <SelectField label="Duración estimada" value={duracion} onChange={setDuracion} options={["30 minutos","45 minutos","60 minutos","90 minutos"]}/>
            <SelectField label="Foco Pedagógico" value={foco} onChange={setFoco} options={["Juego libre","Juego guiado","Aprendizaje colaborativo","Exploración sensorial","Expresión artística","Lectura compartida","Movimiento y corporalidad"]}/>
            <SelectField label="Formato" value={formato} onChange={setFormato} options={[{value:"estandar",label:"Estándar MINEDUC"},{value:"integra",label:"Formato Fundación Integra"}]}/>
            <div style={{display:"flex",alignItems:"flex-end",paddingBottom:4}}>
              <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",fontSize:13,color:"var(--color-text-secondary)"}}>
                <input type="checkbox" checked={dua} onChange={e=>setDua(e.target.checked)} style={{width:"auto"}}/>
                Adecuaciones DUA (Decreto 83)
              </label>
            </div>
          </div>
        </div>

        {error && <div style={{color:"#A32D2D",fontSize:13,marginBottom:8,padding:"8px 12px",background:"#FCEBEB",borderRadius:8}}>{error}</div>}

        <button onClick={generar} disabled={loading}
          style={{width:"100%",padding:"13px",background:loading?"var(--color-background-secondary)":pink,color:loading?"var(--color-text-tertiary)":"white",border:"none",borderRadius:8,fontSize:15,fontWeight:500,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          {loading ? "⏳ Generando planificación..." : "✦ Generar Planificación con IA"}
        </button>
      </div>
    </div>
  );

  // ── RENDER OUTPUT ─────────────────────────────────────────────────────────
  const meta = genMeta();
  return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:18,fontWeight:500}}>Planificación Generada</div>
        <div style={{display:"flex",gap:8}}>
          {plan && (
            <button onClick={()=>printPlan(plan,meta)}
              style={{border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5}}>
              📄 Exportar PDF
            </button>
          )}
          <button onClick={()=>setView("gen")}
            style={{border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer"}}>
            ← Volver
          </button>
          <button onClick={()=>{setPlan(null);setIdea("");setView("gen");}}
            style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer"}}>
            + Nueva
          </button>
        </div>
      </div>

      <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"1.25rem"}}>
        {loading && (
          <div style={{textAlign:"center",padding:"2rem"}}>
            <div style={{fontSize:32,marginBottom:10}}>✦</div>
            <div style={{fontSize:15,color:"var(--color-text-secondary)"}}>La IA está creando tu planificación...</div>
            <div style={{fontSize:13,color:"var(--color-text-tertiary)",marginTop:5}}>Esto puede tomar unos segundos</div>
          </div>
        )}
        {error && <div style={{color:"#A32D2D",padding:"1rem",background:"#FCEBEB",borderRadius:8,fontSize:14}}>{error}</div>}
        {plan && !loading && (
          <>
            {/* Header */}
            <div style={{background:pinkLight,borderRadius:10,padding:"1.1rem",marginBottom:"1rem"}}>
              <div style={{fontSize:19,fontWeight:500,color:"#72243E"}}>"{plan.titulo}"</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:8}}>
                {[["🏫",meta.estab],["👤",meta.edu],["👥",meta.curso],["📚",meta.nivel],["📅",meta.fecha],["⏱",meta.duracion],["📍",meta.zona]].map(([ic,v])=>(
                  <span key={v} style={{fontSize:12,color:"#993556",background:"rgba(255,255,255,.65)",padding:"3px 9px",borderRadius:20}}>{ic} {v}</span>
                ))}
              </div>
            </div>
            {[
              ["Fundamentos Pedagógicos Aplicados", <p style={{fontSize:14,lineHeight:1.7}}>{plan.principios}</p>],
              ["Objetivo de Aprendizaje (OA)", <div style={{display:"inline-block",background:pinkLight,color:"#72243E",padding:"5px 12px",borderRadius:6,fontSize:13,border:`0.5px solid ${pinkBorder}`}}>{plan.oa_texto}</div>],
              ["Objetivo de Aprendizaje Transversal (OAT)", <div style={{display:"inline-block",background:"#E6F1FB",color:"#0C447C",padding:"5px 12px",borderRadius:6,fontSize:13,border:"0.5px solid #B5D4F4"}}>{plan.oat_texto}</div>],
              ["Descripción de la Experiencia de Aprendizaje", (
                <>
                  <p style={{fontSize:14,lineHeight:1.7,marginBottom:10}}><strong>Inicio:</strong><br/>{plan.inicio}</p>
                  <p style={{fontSize:14,lineHeight:1.7,marginBottom:10}}><strong>Desarrollo:</strong><br/>{plan.desarrollo}</p>
                  <p style={{fontSize:14,lineHeight:1.7}}><strong>Cierre:</strong><br/>{plan.cierre}</p>
                </>
              )],
              ["Recursos y Materiales", <p style={{fontSize:14,lineHeight:1.7}}>{plan.recursos}</p>],
            ].map(([title,content])=>(
              <div key={title} style={{marginBottom:"1rem"}}>
                <div style={{fontSize:11,fontWeight:500,color:pink,textTransform:"uppercase",letterSpacing:".06em",borderBottom:`1px solid ${pinkBorder}`,paddingBottom:5,marginBottom:8}}>{title}</div>
                {content}
              </div>
            ))}

            {/* DUA */}
            {meta.dua && plan.dua_compromiso && (
              <div style={{marginBottom:"1rem"}}>
                <div style={{fontSize:11,fontWeight:500,color:pink,textTransform:"uppercase",letterSpacing:".06em",borderBottom:`1px solid ${pinkBorder}`,paddingBottom:5,marginBottom:8}}>Adecuaciones DUA (Decreto 83)</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  {[["Compromiso",plan.dua_compromiso,"#E1F5EE","#085041","#0F6E56"],["Representación",plan.dua_representacion,"#E6F1FB","#0C447C","#185FA5"],["Acción y Expresión",plan.dua_accion,"#EEEDFE","#3C3489","#534AB7"]].map(([t,c,bg,th,tc])=>(
                    <div key={t} style={{background:bg,borderRadius:8,padding:11}}>
                      <div style={{fontSize:11,fontWeight:500,color:th,marginBottom:4,textTransform:"uppercase",letterSpacing:".04em"}}>{t}</div>
                      <p style={{fontSize:13,color:tc,lineHeight:1.6}}>{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evaluación */}
            <div style={{marginBottom:"1rem"}}>
              <div style={{fontSize:11,fontWeight:500,color:pink,textTransform:"uppercase",letterSpacing:".06em",borderBottom:`1px solid ${pinkBorder}`,paddingBottom:5,marginBottom:8}}>Evaluación</div>
              <p style={{fontSize:14,lineHeight:1.7,marginBottom:12}}>{plan.evaluacion}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:12}}>
                  <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:7}}>❓ Preguntas para el Aprendizaje</div>
                  <ul style={{paddingLeft:"1.1rem",margin:0}}>
                    {(plan.preguntas||[]).map((p,i)=><li key={i} style={{fontSize:13,lineHeight:1.6,marginBottom:5}}>{p}</li>)}
                  </ul>
                </div>
                <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:12}}>
                  <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:7}}>👁 Focos de Observación</div>
                  <ul style={{paddingLeft:"1.1rem",margin:0}}>
                    {(plan.focos||[]).map((f,i)=><li key={i} style={{fontSize:13,lineHeight:1.6,marginBottom:5}}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
