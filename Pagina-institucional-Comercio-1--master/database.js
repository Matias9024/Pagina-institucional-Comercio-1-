// Base de datos de noticias y avisos
const noticiasDatabase = [
    {
        id: 1,
        titulo: "Examen Final de Matemáticas",
        contenido: "Se recuerda a todos los estudiantes del 3er año que el examen final de matemáticas se realizará el próximo viernes 25 de abril a las 8:00 AM. Estudiar los temas del último bimestre.",
        categoria: "academico",
        fecha: "2024-04-15",
        autor: "Prof. María González",
        imagen: "https://picsum.photos/seed/matematicas/400/250.jpg",
        destacado: true
    },
    {
        id: 2,
        titulo: "Feria de Ciencias 2024",
        contenido: "La escuela organiza su tradicional Feria de Ciencias el día 30 de abril. Los estudiantes interesados en participar deben inscribirse con su profesor de ciencia antes del 20 de abril.",
        categoria: "eventos",
        fecha: "2024-04-10",
        autor: "Departamento de Ciencias",
        imagen: "https://picsum.photos/seed/feria/400/250.jpg",
        destacado: true
    },
    {
        id: 3,
        titulo: "Mantenimiento de Sistema Informático",
        contenido: "El próximo sábado 20 de abril se realizará mantenimiento del sistema informático de 9:00 AM a 12:00 PM. Durante este tiempo no habrá acceso a la plataforma educativa.",
        categoria: "avisos",
        fecha: "2024-04-12",
        autor: "Departamento de TI",
        imagen: "https://picsum.photos/seed/mantenimiento/400/250.jpg",
        destacado: false
    },
    {
        id: 4,
        titulo: "Nuestros Estudiantes Ganan Concurso Nacional",
        contenido: "¡Felicidades a nuestro equipo de debate que obtuvo el primer lugar en el Concurso Nacional de Debate Escolar! Representaron a la escuela con excelencia.",
        categoria: "logros",
        fecha: "2024-04-08",
        autor: "Dirección",
        imagen: "https://picsum.photos/seed/premio/400/250.jpg",
        destacado: true
    },
    {
        id: 5,
        titulo: "Inscripciones Abiertas para Talleres Extraescolares",
        contenido: "Ya están abiertas las inscripciones para los talleres de robótica, música y teatro. Cupos limitados. Informes en secretaría.",
        categoria: "eventos",
        fecha: "2024-04-14",
        autor: "Coordinación de Actividades",
        imagen: "https://picsum.photos/seed/talleres/400/250.jpg",
        destacado: false
    },
    {
        id: 6,
        titulo: "Nuevo Programa de Tutorías",
        contenido: "Implementamos un nuevo programa de tutorías gratuitas para estudiantes que necesiten apoyo académico. Horarios: Lunes a Miércoles de 3:00 PM a 5:00 PM.",
        categoria: "academico",
        fecha: "2024-04-11",
        autor: "Departamento Pedagógico",
        imagen: "https://picsum.photos/seed/tutorias/400/250.jpg",
        destacado: false
    },
    {
        id: 7,
        titulo: "Reunión de Padres de Familia",
        contenido: "Se convoca a reunión de padres de familia el próximo miércoles 24 de abril a las 6:00 PM para tratar temas importantes sobre el plan de estudios.",
        categoria: "avisos",
        fecha: "2024-04-13",
        autor: "Dirección",
        imagen: "https://picsum.photos/seed/reunion/400/250.jpg",
        destacado: true
    },
    {
        id: 8,
        titulo: "Campeonato Deportivo Intercolegial",
        contenido: "Nuestros equipos de fútbol y voleibol participarán en el campeonato intercolegial que se realizará del 2 al 5 de mayo. ¡Vamos a ganar!",
        categoria: "eventos",
        fecha: "2024-04-09",
        autor: "Departamento de Educación Física",
        imagen: "https://picsum.photos/seed/deporte/400/250.jpg",
        destacado: false
    },
    {
        id: 9,
        titulo: "Mejora en Laboratorio de Informática",
        contenido: "Hemos actualizado todo el equipamiento del laboratorio de informática con 30 nuevas computadoras de última generación.",
        categoria: "logros",
        fecha: "2024-04-07",
        autor: "Departamento de TI",
        imagen: "https://picsum.photos/seed/laboratorio/400/250.jpg",
        destacado: false
    },
    {
        id: 10,
        titulo: "Plazo de Entrega de Trabajos Prácticos",
        contenido: "Recordar que el plazo para entregar todos los trabajos prácticos del bimestre vence el viernes 26 de abril. No se aceptarán entregas tardías.",
        categoria: "academico",
        fecha: "2024-04-16",
        autor: "Coordinación Académica",
        imagen: "https://picsum.photos/seed/trabajos/400/250.jpg",
        destacado: false
    }
];

// Función para formatear fecha
function formatearFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
}

// Función para obtener noticias por categoría
function obtenerNoticiasPorCategoria(categoria = 'todos') {
    if (categoria === 'todos') {
        return noticiasDatabase;
    }
    return noticiasDatabase.filter(noticia => noticia.categoria === categoria);
}

// Función para obtener noticias destacadas
function obtenerNoticiasDestacadas() {
    return noticiasDatabase.filter(noticia => noticia.destacado);
}

// Función para buscar noticias
function buscarNoticias(termino) {
    const terminoLower = termino.toLowerCase();
    return noticiasDatabase.filter(noticia => 
        noticia.titulo.toLowerCase().includes(terminoLower) ||
        noticia.contenido.toLowerCase().includes(terminoLower)
    );
}

// Función para obtener noticia por ID
function obtenerNoticiaPorId(id) {
    return noticiasDatabase.find(noticia => noticia.id === id);
}

// Función para agregar una nueva noticia (simulación de base de datos)
function agregarNoticia(noticia) {
    const nuevaNoticia = {
        id: noticiasDatabase.length + 1,
        ...noticia,
        fecha: new Date().toISOString().split('T')[0],
        destacado: noticia.destacado || false
    };
    noticiasDatabase.unshift(nuevaNoticia);
    return nuevaNoticia;
}

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        noticiasDatabase,
        formatearFecha,
        obtenerNoticiasPorCategoria,
        obtenerNoticiasDestacadas,
        buscarNoticias,
        obtenerNoticiaPorId,
        agregarNoticia
    };
}
