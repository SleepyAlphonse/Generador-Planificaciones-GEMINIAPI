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

// ── Catálogo de OA reales por nivel (para anclar la IA al BCEP) ──────────────
function catalogoOAporNivel(nivel) {
  let out = "";
  for (const [, ambData] of Object.entries(OAS)) {
    out += `\nÁMBITO: ${ambData.label}\n`;
    for (const [, nucData] of Object.entries(ambData.nucleos)) {
      const lista = nucData[nivel] || nucData.medio || [];
      out += `  Núcleo "${nucData.label}":\n`;
      lista.forEach(oa => { out += `    - ${oa}\n`; });
    }
  }
  return out.trim();
}

// ── Catálogo de OAT (transversales) por nivel — del ámbito Desarrollo Personal y Social ──
function catalogoOATporNivel(nivel) {
  let out = "";
  const amb = OAS.desarrollo;
  for (const [, nucData] of Object.entries(amb.nucleos)) {
    const lista = nucData[nivel] || nucData.medio || [];
    out += `  Núcleo "${nucData.label}":\n`;
    lista.forEach(oa => { out += `    - ${oa}\n`; });
  }
  return out.trim();
}

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

// ── PRINT / PDF — Planificación Secuenciada (tabla 7 columnas) ────────────────
function printSecuencia(secuencia, meta) {
  const css = `
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Georgia,serif;padding:24px;color:#1a1a1a;font-size:11px;line-height:1.5;background:#fff}
    h1{font-size:18px;font-weight:700;color:#72243E;margin-bottom:4px;text-align:center;font-family:sans-serif}
    .subtitle{text-align:center;font-size:12px;color:#993556;margin-bottom:6px;font-family:sans-serif}
    .meta{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-bottom:20px}
    .meta span{background:#fbeaf0;color:#993556;padding:3px 9px;border-radius:20px;font-size:10px;font-family:sans-serif}
    .dia-title{font-size:13px;font-weight:700;color:#fff;background:#e5608a;padding:6px 12px;border-radius:6px 6px 0 0;font-family:sans-serif;margin-top:22px}
    table{width:100%;border-collapse:collapse;margin-bottom:8px;table-layout:fixed}
    th{background:#fbeaf0;color:#72243E;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.03em;padding:6px 5px;border:1px solid #f4c0d1;font-family:sans-serif;vertical-align:top;text-align:left}
    td{padding:7px 6px;border:1px solid #e5c4d0;font-size:10px;vertical-align:top;line-height:1.45;word-wrap:break-word;overflow-wrap:break-word}
    td strong{color:#72243E;font-family:sans-serif;font-size:9px;text-transform:uppercase;letter-spacing:.02em}
    .exp-block{margin-bottom:6px}
    .exp-block:last-child{margin-bottom:0}
    @media print{
      body{padding:12px}
      .no-print{display:none!important}
      .dia-wrap{page-break-inside:avoid}
      thead{display:table-header-group}
    }
  `;

  const diasHtml = (secuencia.dias || []).map(d => `
    <div class="dia-wrap">
      <div class="dia-title">📅 DÍA ${d.dia || ""}</div>
      <table>
        <thead>
          <tr>
            <th style="width:9%">Ámbito</th>
            <th style="width:9%">Núcleo</th>
            <th style="width:20%">Objetivo de Aprendizaje</th>
            <th style="width:14%">Contenidos</th>
            <th style="width:24%">Propuestas de Experiencias de Aprendizaje</th>
            <th style="width:12%">Orientaciones Pedagógicas</th>
            <th style="width:12%">Evaluaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${d.ambito || ""}</td>
            <td>${d.nucleo || ""}</td>
            <td>
              <div class="exp-block"><strong>OA:</strong><br>${d.oa || ""}</div>
              ${d.oa_especificado ? `<div class="exp-block"><strong>OA Especificado:</strong><br>${d.oa_especificado}</div>` : ""}
              ${d.oat ? `<div class="exp-block"><strong>OAT (Desarrollo Personal y Social):</strong><br>${d.oat}</div>` : ""}
            </td>
            <td>
              <div class="exp-block"><strong>Conceptual:</strong><br>${d.contenido_conceptual || ""}</div>
              <div class="exp-block"><strong>Procedimental:</strong><br>${d.contenido_procedimental || ""}</div>
              <div class="exp-block"><strong>Actitudinal:</strong><br>${d.contenido_actitudinal || ""}</div>
            </td>
            <td>
              <div class="exp-block"><strong>Inicio:</strong><br>${d.inicio || ""}</div>
              <div class="exp-block"><strong>Desarrollo:</strong><br>${d.desarrollo || ""}</div>
              <div class="exp-block"><strong>Cierre:</strong><br>${d.cierre || ""}</div>
            </td>
            <td>${d.orientaciones || ""}</td>
            <td>${d.evaluacion || ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `).join("");

  const bodyHtml = `
    <div class="no-print" style="background:#fbeaf0;padding:10px 16px;border-radius:8px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;font-family:sans-serif">
      <span style="font-size:13px;color:#72243E;font-weight:500">✦ Planificación secuenciada lista para imprimir</span>
      <button onclick="window.print()" style="background:#e5608a;color:white;border:none;border-radius:6px;padding:7px 16px;font-size:13px;cursor:pointer;font-weight:500">🖨 Imprimir / Guardar PDF</button>
    </div>
    <h1>"${secuencia.titulo || "Experiencia Secuenciada"}"</h1>
    <div class="subtitle">Planificación de Experiencia Secuenciada · ${(secuencia.dias||[]).length} días</div>
    <div class="meta">
      <span>🏫 ${meta.estab}</span><span>👤 ${meta.edu}</span><span>👥 ${meta.curso}</span>
      <span>📚 ${meta.nivel}</span><span>📅 ${meta.fecha}</span>
    </div>
    ${diasHtml}
  `;

  let iframe = document.getElementById("__print_frame__");
  if (iframe) iframe.remove();
  iframe = document.createElement("iframe");
  iframe.id = "__print_frame__";
  iframe.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:9999;background:#fff";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Planificación Secuenciada</title><style>${css}</style></head><body>${bodyHtml}</body></html>`);
  doc.close();

  const closeBtn = doc.createElement("button");
  closeBtn.className = "no-print";
  closeBtn.textContent = "✕ Cerrar vista previa";
  closeBtn.style.cssText = "position:fixed;bottom:16px;right:16px;background:#333;color:white;border:none;border-radius:6px;padding:8px 14px;font-size:13px;cursor:pointer;font-family:sans-serif;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,0.3)";
  closeBtn.onclick = () => iframe.remove();
  doc.body.appendChild(closeBtn);
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("setup"); // setup | lobby | gen | output | ideas | ideasList

  // ── Generador de Ideas (Experiencias y Secuencias) ──
  const [ideaModo, setIdeaModo] = useState("tematica"); // tematica | libre
  const [ideaTematica, setIdeaTematica] = useState("");
  const [ideaNivel, setIdeaNivel] = useState("medio");
  const [ideaSecuenciada, setIdeaSecuenciada] = useState(false);
  const [ideaDias, setIdeaDias] = useState(3);
  const [ideasGeneradas, setIdeasGeneradas] = useState([]); // [{titulo, desarrollo}]
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [ideasError, setIdeasError] = useState("");

  // ── Planificación secuenciada (formato tabla 7 columnas) ──
  const [secuencia, setSecuencia] = useState(null); // {titulo, dias:[{...7 columnas}]}
  const [secuenciaLoading, setSecuenciaLoading] = useState(false);
  const [secuenciaError, setSecuenciaError] = useState("");
  const [ideaElegida, setIdeaElegida] = useState(null); // idea sobre la que se decide el modo
  // Objetivos personalizados por día: [{ambito, nucleo, oa}] (uno por día)
  const [objetivosDias, setObjetivosDias] = useState([]);
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

  // ── Helper: llamada genérica a la API de Claude
  const callClaude = async (prompt, maxTokens = 4000) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!res.ok) throw new Error("Error HTTP " + res.status);
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const txt = data.content?.[0]?.text || "";
    if (!txt) throw new Error("La IA no devolvió respuesta.");
    return txt;
  };

  // ── API call: generar ideas de experiencias / secuencias
  const generarIdeas = useCallback(async () => {
    if (ideaModo === "tematica" && !ideaTematica.trim()) {
      setIdeasError("Escribe una temática o cambia a Modo Libre.");
      return;
    }
    setIdeasError(""); setIdeasLoading(true); setIdeasGeneradas([]);
    setView("ideasList");

    const nivelLabel = NIVELES[ideaNivel] || ideaNivel;
    const tematicaTxt = ideaModo === "libre"
      ? "MODO LIBRE: tú eliges una temática apropiada, realista y significativa para el nivel, propia de la realidad de un jardín infantil chileno."
      : `Temática entregada por la educadora: "${ideaTematica}".`;

    const secuenciaTxt = ideaSecuenciada
      ? `Cada idea debe ser una EXPERIENCIA SECUENCIADA de ${ideaDias} días: un hilo conductor progresivo donde cada día aborda un aspecto distinto y complementario del tema (por ejemplo, para "cepillado de dientes": día 1 las partes de la boca, día 2 los utensilios y el procedimiento, día 3 la importancia del cepillado). En el desarrollo describe brevemente qué se trabaja cada día.`
      : `Cada idea es una experiencia de aprendizaje independiente de un solo día.`;

    const prompt = `Eres una experta en educación parvularia chilena con profundo conocimiento del BCEP 2018. Tu tarea es proponer ideas de experiencias de aprendizaje creativas, realistas y pertinentes para una educadora de párvulos.

CONTEXTO:
- Nivel BCEP: ${nivelLabel}
- ${tematicaTxt}
- ${secuenciaTxt}

INSTRUCCIONES:
- Genera EXACTAMENTE 5 ideas DISTINTAS entre sí.
- Cada idea debe tener un TÍTULO atractivo y pedagógico, y un DESARROLLO breve (2 a 4 oraciones) que describa de qué trata la experiencia${ideaSecuenciada ? ` y cómo se distribuye a lo largo de los ${ideaDias} días` : ""}.
- Las ideas deben ser apropiadas para la edad del nivel indicado y coherentes con los principios del BCEP (juego, bienestar, protagonismo del niño/a).
- Usa un lenguaje cálido y claro, propio de la realidad chilena de educación parvularia.

Responde SOLO con JSON válido, sin markdown ni backticks, con esta estructura exacta:
{"ideas":[{"titulo":"...","desarrollo":"..."},{"titulo":"...","desarrollo":"..."},{"titulo":"...","desarrollo":"..."},{"titulo":"...","desarrollo":"..."},{"titulo":"...","desarrollo":"..."}]}`;

    try {
      const txt = await callClaude(prompt, 3000);
      const start = txt.indexOf("{");
      const end = txt.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No se recibió JSON válido de la IA.");
      const parsed = JSON.parse(txt.slice(start, end + 1));
      const lista = (parsed.ideas || []).map(i => ({ titulo: i.titulo || "", desarrollo: i.desarrollo || "" }));
      if (lista.length === 0) throw new Error("No se generaron ideas.");
      setIdeasGeneradas(lista);
    } catch(e) {
      setIdeasError("Error al generar ideas: " + e.message);
    }
    setIdeasLoading(false);
  }, [ideaModo, ideaTematica, ideaNivel, ideaSecuenciada, ideaDias]);

  // ── Llevar una idea seleccionada al planificador (opción B: día a día)
  const planificarIdea = (ideaSel) => {
    // Pre-cargar la idea en el planificador actual
    setIdea(`${ideaSel.titulo} — ${ideaSel.desarrollo}`);
    setNivel(ideaNivel);
    // Reiniciar selección de objetivos para que la educadora los escoja según el día
    setAmbito(""); setNucleo(""); setOa(""); setOat("");
    setPlan(null); setError("");
    setView("gen");
  };

  // ── API call: generar planificación secuenciada completa (formato tabla 7 columnas)
  const generarSecuencia = useCallback(async (ideaSel, objetivosPersonalizados = null) => {
    setSecuenciaError(""); setSecuenciaLoading(true); setSecuencia(null);
    setView("secuencia");

    const nivelLabel = NIVELES[ideaNivel] || ideaNivel;
    const catalogo = catalogoOAporNivel(ideaNivel);
    const catalogoOAT = catalogoOATporNivel(ideaNivel);

    // Si hay objetivos personalizados por día, se los pasamos a la IA como obligatorios
    let bloqueObjetivos = "";
    if (objetivosPersonalizados && objetivosPersonalizados.length > 0) {
      bloqueObjetivos = "\nOBJETIVOS OBLIGATORIOS POR DÍA (definidos por la educadora — respétalos EXACTAMENTE, no los cambies):\n";
      objetivosPersonalizados.forEach((o, i) => {
        const ambLabel = OAS[o.ambito]?.label || "";
        const nucLabel = OAS[o.ambito]?.nucleos[o.nucleo]?.label || "";
        const nucOatLabel = OAS.desarrollo.nucleos[o.nucleoOat]?.label || "";
        bloqueObjetivos += `  Día ${i+1}: Ámbito "${ambLabel}" / Núcleo "${nucLabel}" / OA: ${o.oa} || OAT (Desarrollo Personal y Social / ${nucOatLabel}): ${o.oat}\n`;
      });
    }

    const instruccionObjetivos = (objetivosPersonalizados && objetivosPersonalizados.length > 0)
      ? `- Usa EXACTAMENTE los objetivos indicados en "OBJETIVOS OBLIGATORIOS POR DÍA": para cada día están dados el OA y el OAT. Copia el ámbito, núcleo, OA y OAT tal cual se te entregan, sin inventar ni modificar. Además, redacta el "oa_especificado" adaptando el OA dado al tema del día.`
      : `- Para CADA día elige DOS objetivos: (a) un OA del CATÁLOGO OFICIAL DE OA (puede ser de cualquier ámbito), y (b) un OAT del CATÁLOGO OFICIAL DE OAT (siempre del ámbito Desarrollo Personal y Social). Copia ambos EXACTAMENTE como aparecen en sus catálogos. NO inventes objetivos, NO uses objetivos de otros niveles, NO modifiques su redacción. AMBOS son obligatorios en todos los días.`;

    const prompt = `Eres una experta en educación parvularia chilena con profundo conocimiento del BCEP 2018. Debes crear una PLANIFICACIÓN DE EXPERIENCIA SECUENCIADA completa de ${ideaDias} días, con un hilo conductor progresivo, siguiendo EXACTAMENTE el formato oficial de planificación chilena.

CONTEXTO:
- Establecimiento: ${estabName || "Establecimiento"}
- Educadora/or: ${cursoEdu || "Educadora"}
- Curso: ${cursoName || ""} — Nivel BCEP: ${nivelLabel}
- Idea base de la secuencia: "${ideaSel.titulo}" — ${ideaSel.desarrollo}
${bloqueObjetivos}
INSTRUCCIONES:
- Crea EXACTAMENTE ${ideaDias} experiencias (una por día), progresivas y conectadas por un hilo conductor.
${instruccionObjetivos}

⚠️ REGLA CRÍTICA E INNEGOCIABLE SOBRE LA COLUMNA "OBJETIVO DE APRENDIZAJE" ⚠️
Para CADA UNO de los ${ideaDias} días, la columna de objetivos DEBE contener SIEMPRE estos TRES elementos, sin excepción (si falta alguno, la planificación es inválida):
  1. "oa": el OA oficial, copiado EXACTAMENTE del catálogo de OA.
  2. "oa_especificado": el mismo OA pero adaptado al tema puntual del día. Ejemplo real del formato: si el OA oficial es "Reconocer las principales partes, características físicas de su cuerpo y sus funciones en situaciones cotidianas y de juego" y el día trata sobre la boca, el especificado es "Reconocer las principales partes, características físicas de la boca en situaciones cotidianas y de juego". Mantén la redacción del OA oficial y solo enfócala al contenido del día.
  3. "oat": un Objetivo de Aprendizaje Transversal, copiado EXACTAMENTE del CATÁLOGO OFICIAL DE OAT. El OAT SIEMPRE pertenece al ámbito "Desarrollo Personal y Social". NUNCA dejes este campo vacío. Cada día debe tener su OAT, complementario al OA de ese día.

- Los CONTENIDOS deben especificar las 3 dimensiones: conceptual (saber), procedimental (saber hacer) y actitudinal (saber ser), coherentes con el OA del día. Sé conciso y directo, extrayéndolos del propio OA.
- Las PROPUESTAS DE EXPERIENCIAS deben ser detalladas y realistas, con Inicio, Desarrollo y Cierre claramente descritos.
- Las EVALUACIONES deben incluir instrumento de evaluación, foco de evaluación e indicadores de evaluación.
- Usa un lenguaje cálido, claro y pedagógico propio de la realidad chilena de educación parvularia.

CATÁLOGO OFICIAL DE OA DEL BCEP 2018 PARA EL NIVEL "${nivelLabel}" (elige el OA SOLO de aquí):
${catalogo}

CATÁLOGO OFICIAL DE OAT (TRANSVERSALES) — ÁMBITO DESARROLLO PERSONAL Y SOCIAL, NIVEL "${nivelLabel}" (elige el OAT SOLO de aquí):
${catalogoOAT}

Responde SOLO con JSON válido, sin markdown ni backticks, con esta estructura EXACTA:
{
  "titulo": "Título general de la secuencia",
  "dias": [
    {
      "dia": 1,
      "ambito": "nombre del ámbito (copiado del catálogo)",
      "nucleo": "nombre del núcleo (copiado del catálogo)",
      "oa": "OA oficial completo copiado EXACTAMENTE del catálogo",
      "oa_especificado": "el OA adaptado al tema puntual de este día",
      "oat": "OAT transversal completo copiado EXACTAMENTE del catálogo de transversales",
      "contenido_conceptual": "qué van a saber",
      "contenido_procedimental": "qué van a saber hacer",
      "contenido_actitudinal": "qué actitud van a desarrollar",
      "inicio": "descripción detallada del inicio",
      "desarrollo": "descripción detallada del desarrollo",
      "cierre": "descripción detallada del cierre",
      "orientaciones": "orientaciones pedagógicas para el educador",
      "evaluacion": "instrumento de evaluación, foco de evaluación e indicadores de evaluación"
    }
  ]
}
Genera los ${ideaDias} días completos.`;

    try {
      const txt = await callClaude(prompt, 8000);
      const start = txt.indexOf("{");
      const end = txt.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No se recibió JSON válido de la IA.");
      const parsed = JSON.parse(txt.slice(start, end + 1));
      if (!parsed.dias || parsed.dias.length === 0) throw new Error("No se generaron los días de la secuencia.");
      // Respaldo: garantizar que cada día tenga OAT (y en modo personalizado, respetar lo elegido)
      const oatFallback = OAS.desarrollo.nucleos.identidad[ideaNivel] || OAS.desarrollo.nucleos.identidad.medio || [];
      parsed.dias = parsed.dias.map((d, i) => {
        const dia = { ...d };
        if (objetivosPersonalizados && objetivosPersonalizados[i]) {
          // En modo personalizado, forzar exactamente los objetivos elegidos por la educadora
          dia.oa = objetivosPersonalizados[i].oa || dia.oa;
          dia.oat = objetivosPersonalizados[i].oat || dia.oat;
        }
        if (!dia.oat || !dia.oat.trim()) {
          dia.oat = oatFallback[i % Math.max(oatFallback.length, 1)] || oatFallback[0] || "";
        }
        return dia;
      });
      setSecuencia(parsed);
    } catch(e) {
      setSecuenciaError("Error al generar la secuencia: " + e.message);
    }
    setSecuenciaLoading(false);
  }, [ideaNivel, ideaDias, estabName, cursoEdu, cursoName]);

  // ── Abrir la personalización de objetivos por día (Modo B)
  const abrirPersonalizacion = (ideaSel) => {
    setIdeaElegida(ideaSel);
    // Inicializar un objetivo vacío por cada día
    const inicial = Array.from({ length: ideaDias }, () => ({ ambito: "", nucleo: "", oa: "", nucleoOat: "identidad", oat: "" }));
    setObjetivosDias(inicial);
    setSecuenciaError("");
    setView("personalizarSec");
  };

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
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      if (!res.ok) throw new Error("Error HTTP " + res.status);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const txt = data.content?.[0]?.text || "";
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

        <button onClick={()=>setView("lobby")} disabled={!estabDone}
          style={{width:"100%",padding:"12px",background:estabDone?pink:"var(--color-background-secondary)",color:estabDone?"white":"var(--color-text-tertiary)",border:"none",borderRadius:8,fontSize:15,fontWeight:500,cursor:estabDone?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          ✦ Continuar →
        </button>
      </div>
    </div>
  );

  // ── RENDER LOBBY ──────────────────────────────────────────────────────────
  if (view==="lobby") return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{textAlign:"center",marginBottom:"2rem"}}>
        <div style={{fontSize:26,fontWeight:500,color:"var(--color-text-primary)"}}>✦ ¿Qué quieres hacer hoy?</div>
        <div style={{fontSize:13,color:"var(--color-text-secondary)",marginTop:4}}>{estabName} · elige una opción para comenzar</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* Botón 1 — Generador de Planificaciones */}
        <div onClick={()=>setView("gen")}
          style={{background:"var(--color-background-primary)",border:`1px solid ${pinkBorder}`,borderRadius:14,padding:"1.75rem 1.25rem",cursor:"pointer",textAlign:"center",transition:"all .15s",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}
          onMouseEnter={e=>{e.currentTarget.style.background=pinkLight;e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="var(--color-background-primary)";e.currentTarget.style.transform="translateY(0)";}}>
          <div style={{width:60,height:60,borderRadius:16,background:pinkLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>📋</div>
          <div style={{fontSize:17,fontWeight:600,color:"#72243E"}}>Generador de Planificaciones</div>
          <div style={{fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.5}}>Crea una planificación completa de una experiencia de aprendizaje, con OA, OAT, evaluación y PDF.</div>
        </div>

        {/* Botón 2 — Generador de Experiencias y Secuencias */}
        <div onClick={()=>{setIdeasGeneradas([]);setIdeasError("");setView("ideas");}}
          style={{background:"var(--color-background-primary)",border:`1px solid ${pinkBorder}`,borderRadius:14,padding:"1.75rem 1.25rem",cursor:"pointer",textAlign:"center",transition:"all .15s",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}
          onMouseEnter={e=>{e.currentTarget.style.background=pinkLight;e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="var(--color-background-primary)";e.currentTarget.style.transform="translateY(0)";}}>
          <div style={{width:60,height:60,borderRadius:16,background:pinkLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>💡</div>
          <div style={{fontSize:17,fontWeight:600,color:"#72243E"}}>Generador de Experiencias y Secuencias</div>
          <div style={{fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.5}}>¿Sin ideas? Genera propuestas de experiencias (individuales o secuenciadas por días) y planifícalas al instante.</div>
        </div>
      </div>

      <div style={{textAlign:"center",marginTop:"1.5rem"}}>
        <button onClick={()=>setView("setup")}
          style={{background:"transparent",border:"none",color:"var(--color-text-secondary)",fontSize:13,cursor:"pointer"}}>
          ← Volver a configuración
        </button>
      </div>
    </div>
  );

  // ── RENDER GENERADOR DE IDEAS (formulario) ────────────────────────────────
  if (view==="ideas") return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{textAlign:"center",marginBottom:"1.25rem"}}>
        <div style={{fontSize:22,fontWeight:500}}>💡 Generador de Experiencias y Secuencias</div>
        <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:3}}>BCEP 2018 · {estabName}</div>
      </div>

      <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"1.25rem"}}>

        {/* Modo: temática propia vs libre */}
        <div style={{marginBottom:"1rem"}}>
          <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>¿Cómo quieres empezar?</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div onClick={()=>setIdeaModo("tematica")}
              style={{border:`1px solid ${ideaModo==="tematica"?pink:"var(--color-border-secondary)"}`,borderRadius:10,padding:12,cursor:"pointer",background:ideaModo==="tematica"?pinkLight:"var(--color-background-primary)"}}>
              <div style={{fontSize:14,fontWeight:600,color:ideaModo==="tematica"?"#72243E":"var(--color-text-primary)"}}>✏️ Con temática propia</div>
              <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:2}}>Tú escribes el tema y la IA propone las ideas.</div>
            </div>
            <div onClick={()=>setIdeaModo("libre")}
              style={{border:`1px solid ${ideaModo==="libre"?pink:"var(--color-border-secondary)"}`,borderRadius:10,padding:12,cursor:"pointer",background:ideaModo==="libre"?pinkLight:"var(--color-background-primary)"}}>
              <div style={{fontSize:14,fontWeight:600,color:ideaModo==="libre"?"#72243E":"var(--color-text-primary)"}}>🎲 Modo libre</div>
              <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:2}}>La IA inventa todo desde cero según el curso.</div>
            </div>
          </div>
        </div>

        {/* Temática (solo si modo temática) */}
        {ideaModo==="tematica" && (
          <div style={{marginBottom:"1rem"}}>
            <Field label="Temática de la experiencia *" full>
              <input style={{...inputStyle,fontSize:15}} value={ideaTematica} onChange={e=>setIdeaTematica(e.target.value)}
                placeholder="Ej: El cepillado de dientes / Los animales de la granja / Las emociones"/>
            </Field>
          </div>
        )}

        {/* Curso / Nivel */}
        <div style={{marginBottom:"1rem"}}>
          <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Curso / Nivel</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {[["medio","Nivel Medio"],["transicion","Transición"],["sala_cuna","Sala Cuna"]].map(([v,l])=>(
              <button key={v} onClick={()=>setIdeaNivel(v)}
                style={{padding:"6px 16px",borderRadius:20,fontSize:13,fontWeight:500,cursor:"pointer",border:`0.5px solid ${ideaNivel===v?pink:"var(--color-border-secondary)"}`,background:ideaNivel===v?pink:"transparent",color:ideaNivel===v?"white":"var(--color-text-secondary)"}}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Experiencia secuenciada */}
        <div style={{marginBottom:"1.25rem",borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:"1rem"}}>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,color:"var(--color-text-primary)",fontWeight:500}}>
            <input type="checkbox" checked={ideaSecuenciada} onChange={e=>setIdeaSecuenciada(e.target.checked)} style={{width:"auto"}}/>
            Experiencia secuenciada (varios días con un hilo conductor)
          </label>
          {ideaSecuenciada && (
            <div style={{marginTop:12,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <span style={{fontSize:13,color:"var(--color-text-secondary)"}}>¿Cuántos días quieres planificar?</span>
              <div style={{display:"flex",gap:6}}>
                {[2,3,4,5].map(d=>(
                  <button key={d} onClick={()=>setIdeaDias(d)}
                    style={{width:38,height:38,borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",border:`0.5px solid ${ideaDias===d?pink:"var(--color-border-secondary)"}`,background:ideaDias===d?pink:"transparent",color:ideaDias===d?"white":"var(--color-text-secondary)"}}>
                    {d}
                  </button>
                ))}
              </div>
              <span style={{fontSize:12,color:"var(--color-text-tertiary)"}}>días</span>
            </div>
          )}
        </div>

        {ideasError && <div style={{color:"#A32D2D",fontSize:13,marginBottom:8,padding:"8px 12px",background:"#FCEBEB",borderRadius:8}}>{ideasError}</div>}

        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setView("lobby")}
            style={{border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",borderRadius:8,padding:"12px 18px",fontSize:14,cursor:"pointer"}}>
            ← Volver
          </button>
          <button onClick={generarIdeas} disabled={ideasLoading}
            style={{flex:1,padding:"13px",background:ideasLoading?"var(--color-background-secondary)":pink,color:ideasLoading?"var(--color-text-tertiary)":"white",border:"none",borderRadius:8,fontSize:15,fontWeight:500,cursor:ideasLoading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {ideasLoading ? "⏳ Generando ideas..." : "💡 Generar 5 ideas con IA"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── RENDER LISTA DE IDEAS GENERADAS ───────────────────────────────────────
  if (view==="ideasList") return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:18,fontWeight:500}}>💡 Ideas generadas</div>
          <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:2}}>
            {ideaModo==="libre" ? "Modo libre" : `Temática: ${ideaTematica}`} · {NIVELES[ideaNivel]}
            {ideaSecuenciada ? ` · Secuencia de ${ideaDias} días` : " · Experiencia individual"}
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setView("ideas")}
            style={{border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer"}}>
            ← Volver
          </button>
          {!ideasLoading && ideasGeneradas.length>0 && (
            <button onClick={generarIdeas}
              style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer"}}>
              ↻ Generar otras
            </button>
          )}
        </div>
      </div>

      {ideasLoading && (
        <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"2rem",textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:10}}>💡</div>
          <div style={{fontSize:15,color:"var(--color-text-secondary)"}}>La IA está pensando ideas para ti...</div>
          <div style={{fontSize:13,color:"var(--color-text-tertiary)",marginTop:5}}>Esto puede tomar unos segundos</div>
        </div>
      )}

      {ideasError && !ideasLoading && (
        <div style={{color:"#A32D2D",padding:"1rem",background:"#FCEBEB",borderRadius:8,fontSize:14,marginBottom:12}}>{ideasError}</div>
      )}

      {!ideasLoading && ideasGeneradas.length>0 && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:13,color:"var(--color-text-secondary)",background:pinkLight,padding:"10px 14px",borderRadius:8}}>
            ✨ Puedes <strong>editar</strong> el título o el desarrollo de cualquier idea antes de planificarla. Cuando te guste una, presiona <strong>"Planificar esta idea"</strong>.
          </div>
          {ideasGeneradas.map((idea,i)=>(
            <div key={i} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"1.1rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:pinkLight,color:"#72243E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,flexShrink:0}}>{i+1}</div>
                <input value={idea.titulo}
                  onChange={e=>{const n=[...ideasGeneradas];n[i]={...n[i],titulo:e.target.value};setIdeasGeneradas(n);}}
                  style={{...inputStyle,fontSize:15,fontWeight:600,color:"#72243E",border:"none",background:"transparent",padding:"2px 0"}}/>
              </div>
              <textarea value={idea.desarrollo}
                onChange={e=>{const n=[...ideasGeneradas];n[i]={...n[i],desarrollo:e.target.value};setIdeasGeneradas(n);}}
                rows={ideaSecuenciada?4:3}
                style={{...inputStyle,fontSize:13,lineHeight:1.6,resize:"vertical",marginBottom:10}}/>
              {ideaSecuenciada ? (
                <div style={{display:"flex",gap:8,justifyContent:"flex-end",flexWrap:"wrap"}}>
                  <button onClick={()=>planificarIdea(idea)}
                    style={{background:"var(--color-background-primary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:8,padding:"9px 14px",fontSize:13,fontWeight:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>
                    📋 Día por día
                  </button>
                  <button onClick={()=>abrirPersonalizacion(idea)}
                    style={{background:"var(--color-background-primary)",color:"#72243E",border:`1px solid ${pink}`,borderRadius:8,padding:"9px 14px",fontSize:13,fontWeight:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>
                    ⚙️ Personalizar objetivos
                  </button>
                  <button onClick={()=>generarSecuencia(idea)}
                    style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"9px 14px",fontSize:13,fontWeight:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>
                    ⚡ Secuencia rápida ({ideaDias} días)
                  </button>
                </div>
              ) : (
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <button onClick={()=>planificarIdea(idea)}
                    style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"9px 18px",fontSize:14,fontWeight:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>
                    📋 Planificar esta idea →
                  </button>
                </div>
              )}
            </div>
          ))}
          {ideaSecuenciada && (
            <div style={{fontSize:12,color:"var(--color-text-tertiary)",textAlign:"center",padding:"4px 0",lineHeight:1.5}}>
              📋 <strong>Día por día:</strong> planificas un día a la vez con el planificador normal.<br/>
              ⚙️ <strong>Personalizar objetivos:</strong> tú eliges el OA de cada día y la IA arma la tabla respetándolos.<br/>
              ⚡ <strong>Secuencia rápida:</strong> la IA elige los objetivos (solo del BCEP) y genera los {ideaDias} días en tabla, listos para PDF.
            </div>
          )}
        </div>
      )}
    </div>
  );

  // ── RENDER PERSONALIZAR SECUENCIA (elegir OA por día — Modo B) ─────────────
  if (view==="personalizarSec") {
    const todosCompletos = objetivosDias.length>0 && objetivosDias.every(o=>o.ambito && o.nucleo && o.oa && o.oat);
    return (
      <div style={{maxWidth:820,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:500}}>⚙️ Personalizar objetivos por día</div>
            <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:2}}>
              {ideaElegida?.titulo} · {NIVELES[ideaNivel]} · {ideaDias} días
            </div>
          </div>
          <button onClick={()=>setView("ideasList")}
            style={{border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer"}}>
            ← Volver
          </button>
        </div>

        <div style={{fontSize:13,color:"var(--color-text-secondary)",background:pinkLight,padding:"10px 14px",borderRadius:8,marginBottom:"1rem"}}>
          Elige el <strong>Ámbito, Núcleo, OA y OAT</strong> de cada día. Todos vienen directo de las Bases Curriculares (BCEP 2018) para el nivel <strong>{NIVELES[ideaNivel]}</strong>. La IA generará la tabla respetando exactamente lo que elijas.
        </div>

        {objetivosDias.map((obj,i)=>{
          const nucleosD = obj.ambito && OAS[obj.ambito] ? Object.entries(OAS[obj.ambito].nucleos).map(([k,v])=>({value:k,label:v.label})) : [];
          const oasD = obj.ambito && obj.nucleo && OAS[obj.ambito]?.nucleos[obj.nucleo] ? (OAS[obj.ambito].nucleos[obj.nucleo][ideaNivel] || OAS[obj.ambito].nucleos[obj.nucleo].medio || []) : [];
          const oatsD = OAS.desarrollo.nucleos[obj.nucleoOat]?.[ideaNivel] || OAS.desarrollo.nucleos[obj.nucleoOat]?.medio || [];
          const diaCompleto = obj.ambito && obj.nucleo && obj.oa && obj.oat;
          const setObj = (campo,valor)=>{
            const n=[...objetivosDias];
            n[i]={...n[i],[campo]:valor};
            if(campo==="ambito"){n[i].nucleo="";n[i].oa="";}
            if(campo==="nucleo"){n[i].oa="";}
            if(campo==="nucleoOat"){n[i].oat="";}
            setObjetivosDias(n);
          };
          return (
            <div key={i} style={{background:"var(--color-background-primary)",border:`0.5px solid ${diaCompleto?green:"var(--color-border-tertiary)"}`,borderRadius:10,padding:"1rem",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:diaCompleto?greenLight:pinkLight,color:diaCompleto?"#085041":"#72243E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600}}>{diaCompleto?"✓":i+1}</div>
                <div style={{fontSize:14,fontWeight:600}}>Día {i+1}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                <SelectField label="Ámbito (OA)" value={obj.ambito} onChange={v=>setObj("ambito",v)}
                  options={[{value:"",label:"Seleccione ámbito"},...Object.entries(OAS).map(([k,v])=>({value:k,label:v.label}))]}/>
                <SelectField label="Núcleo (OA)" value={obj.nucleo} onChange={v=>setObj("nucleo",v)}
                  options={[{value:"",label:"Seleccione núcleo"},...nucleosD]}/>
              </div>
              {oasD.length>0 && (
                <div style={{marginBottom:10}}>
                  <Field label="Objetivo de Aprendizaje (OA)" full>
                    <select value={obj.oa} onChange={e=>setObj("oa",e.target.value)} style={inputStyle}>
                      <option value="">Seleccione un OA</option>
                      {oasD.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
              )}
              <div style={{borderTop:"0.5px dashed var(--color-border-secondary)",paddingTop:10}}>
                <div style={{fontSize:11,color:pink,fontWeight:600,marginBottom:6}}>Objetivo Transversal (OAT) · Desarrollo Personal y Social</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10}}>
                  <SelectField label="Núcleo Transversal" value={obj.nucleoOat} onChange={v=>setObj("nucleoOat",v)}
                    options={[{value:"identidad",label:"Identidad y Autonomía"},{value:"convivencia",label:"Convivencia y Ciudadanía"},{value:"corporalidad",label:"Corporalidad y Movimiento"}]}/>
                  <Field label="Selecciona el OAT" full>
                    <select value={obj.oat} onChange={e=>setObj("oat",e.target.value)} style={inputStyle}>
                      <option value="">Seleccione un OAT</option>
                      {oatsD.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
            </div>
          );
        })}

        {secuenciaError && <div style={{color:"#A32D2D",fontSize:13,marginBottom:8,padding:"8px 12px",background:"#FCEBEB",borderRadius:8}}>{secuenciaError}</div>}

        <button
          onClick={()=>{
            if(!todosCompletos){ setSecuenciaError("Completa el ámbito, núcleo, OA y OAT de todos los días antes de generar."); return; }
            generarSecuencia(ideaElegida, objetivosDias);
          }}
          disabled={!todosCompletos}
          style={{width:"100%",padding:"13px",background:todosCompletos?pink:"var(--color-background-secondary)",color:todosCompletos?"white":"var(--color-text-tertiary)",border:"none",borderRadius:8,fontSize:15,fontWeight:500,cursor:todosCompletos?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          📑 Generar secuencia con estos objetivos →
        </button>
      </div>
    );
  }

  // ── RENDER SECUENCIA (tabla generada) ─────────────────────────────────────
  if (view==="secuencia") {
    const meta = genMeta();
    return (
      <div style={{maxWidth:960,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:500}}>📑 Planificación Secuenciada</div>
            <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:2}}>
              {NIVELES[ideaNivel]} · {ideaDias} días · formato tabla
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {secuencia && !secuenciaLoading && (
              <button onClick={()=>printSecuencia(secuencia,meta)}
                style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5}}>
                📄 Exportar PDF
              </button>
            )}
            <button onClick={()=>setView("ideasList")}
              style={{border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer"}}>
              ← Volver
            </button>
          </div>
        </div>

        {secuenciaLoading && (
          <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"2rem",textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:10}}>📑</div>
            <div style={{fontSize:15,color:"var(--color-text-secondary)"}}>La IA está creando la secuencia completa de {ideaDias} días...</div>
            <div style={{fontSize:13,color:"var(--color-text-tertiary)",marginTop:5}}>Esto puede tardar un poco más por ser varios días</div>
          </div>
        )}

        {secuenciaError && !secuenciaLoading && (
          <div style={{color:"#A32D2D",padding:"1rem",background:"#FCEBEB",borderRadius:8,fontSize:14}}>{secuenciaError}</div>
        )}

        {secuencia && !secuenciaLoading && (
          <div>
            <div style={{background:pinkLight,borderRadius:10,padding:"1.1rem",marginBottom:"1rem"}}>
              <div style={{fontSize:18,fontWeight:600,color:"#72243E"}}>"{secuencia.titulo}"</div>
              <div style={{fontSize:12,color:"#993556",marginTop:4}}>Experiencia secuenciada de {(secuencia.dias||[]).length} días · {meta.curso}</div>
            </div>

            {(secuencia.dias||[]).map((d,i)=>(
              <div key={i} style={{marginBottom:"1.25rem",border:"0.5px solid var(--color-border-tertiary)",borderRadius:10,overflow:"hidden"}}>
                <div style={{background:pink,color:"white",padding:"8px 14px",fontSize:14,fontWeight:600}}>📅 Día {d.dia || i+1}</div>
                <div style={{padding:"1rem",display:"flex",flexDirection:"column",gap:10}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:pink,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Ámbito</div>
                      <div style={{fontSize:13}}>{d.ambito}</div>
                    </div>
                    <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:pink,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Núcleo</div>
                      <div style={{fontSize:13}}>{d.nucleo}</div>
                    </div>
                  </div>
                  <div style={{background:pinkLight,borderRadius:8,padding:10}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#72243E",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Objetivo de Aprendizaje (OA)</div>
                    <div style={{fontSize:13,color:"#72243E",marginBottom:d.oa_especificado?8:0}}>{d.oa}</div>
                    {d.oa_especificado && (
                      <>
                        <div style={{fontSize:10,fontWeight:700,color:"#72243E",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>OA Especificado</div>
                        <div style={{fontSize:13,color:"#72243E",fontStyle:"italic"}}>{d.oa_especificado}</div>
                      </>
                    )}
                  </div>
                  {d.oat && (
                    <div style={{background:"#E6F1FB",borderRadius:8,padding:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:"#0C447C",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Objetivo de Aprendizaje Transversal (OAT)</div>
                      <div style={{fontSize:12,color:"#0C447C",marginBottom:3}}>Desarrollo Personal y Social</div>
                      <div style={{fontSize:13,color:"#0C447C"}}>{d.oat}</div>
                    </div>
                  )}
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:pink,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>Contenidos</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                      {[["Conceptual",d.contenido_conceptual],["Procedimental",d.contenido_procedimental],["Actitudinal",d.contenido_actitudinal]].map(([t,c])=>(
                        <div key={t} style={{background:"var(--color-background-secondary)",borderRadius:8,padding:9}}>
                          <div style={{fontSize:10,fontWeight:600,color:"var(--color-text-secondary)",marginBottom:3}}>{t}</div>
                          <div style={{fontSize:12,lineHeight:1.5}}>{c}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:pink,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>Propuestas de Experiencias</div>
                    <p style={{fontSize:13,lineHeight:1.6,marginBottom:6}}><strong>Inicio:</strong> {d.inicio}</p>
                    <p style={{fontSize:13,lineHeight:1.6,marginBottom:6}}><strong>Desarrollo:</strong> {d.desarrollo}</p>
                    <p style={{fontSize:13,lineHeight:1.6}}><strong>Cierre:</strong> {d.cierre}</p>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:pink,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Orientaciones Pedagógicas</div>
                      <div style={{fontSize:12,lineHeight:1.5}}>{d.orientaciones}</div>
                    </div>
                    <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:pink,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Evaluaciones</div>
                      <div style={{fontSize:12,lineHeight:1.5}}>{d.evaluacion}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{textAlign:"center",padding:"8px 0 16px"}}>
              <button onClick={()=>printSecuencia(secuencia,meta)}
                style={{background:pink,color:"white",border:"none",borderRadius:8,padding:"11px 24px",fontSize:14,fontWeight:500,cursor:"pointer"}}>
                📄 Exportar los {(secuencia.dias||[]).length} días en un PDF
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── RENDER GENERATOR ──────────────────────────────────────────────────────
  if (view==="gen") return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
        <button onClick={()=>setView("lobby")}
          style={{background:"transparent",border:"0.5px solid var(--color-border-secondary)",color:"var(--color-text-secondary)",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer"}}>
          ← Inicio
        </button>
        <div style={{textAlign:"center",flex:1}}>
          <div style={{fontSize:22,fontWeight:500}}>✦ Generador de Planificaciones</div>
          <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:3}}>BCEP 2018 · {estabName}</div>
        </div>
        <div style={{width:70}}/>
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
