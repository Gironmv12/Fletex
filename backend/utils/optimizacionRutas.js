import GeneticAlgorithm from 'geneticalgorithm';

// Función para calcular la distancia total de la ruta
function calcularDistancia(ruta) {
    let distanciaTotal = 0;
    for (let i = 0; i < ruta.length - 1; i++) {
        distanciaTotal += Math.sqrt(
            Math.pow(ruta[i].latitud - ruta[i + 1].latitud, 2) +
            Math.pow(ruta[i].longitud - ruta[i + 1].longitud, 2)
        );
    }
    return distanciaTotal;
}

// Función para calcular el tiempo estimado de la ruta
function calcularTiempoEstimado(ruta) {
    // Suponiendo una velocidad constante, por ejemplo, 50 km/h
    const velocidad = 50; // km/h
    const distanciaTotal = calcularDistancia(ruta);
    const tiempoEstimado = distanciaTotal / velocidad; // tiempo en horas
    return tiempoEstimado;
}

// Función de cruce (crossover) para combinar dos rutas
function cruzarRutas(ruta1, ruta2) {
    const puntoCorte = Math.floor(Math.random() * ruta1.length);
    const nuevaRuta = ruta1.slice(0, puntoCorte).concat(ruta2.slice(puntoCorte));
    return nuevaRuta;
}

// Función de mutación para alterar una ruta
function mutarRuta(ruta) {
    const indice1 = Math.floor(Math.random() * ruta.length);
    const indice2 = Math.floor(Math.random() * ruta.length);
    const nuevaRuta = [...ruta];
    [nuevaRuta[indice1], nuevaRuta[indice2]] = [nuevaRuta[indice2], nuevaRuta[indice1]];
    return nuevaRuta;
}

// Función de fitness para calcular la distancia total de la ruta
function calcularFitness(ruta) {
    let distanciaTotal = 0;
    for (let i = 0; i < ruta.length - 1; i++) {
        distanciaTotal += Math.sqrt(
            Math.pow(ruta[i].latitud - ruta[i + 1].latitud, 2) +
            Math.pow(ruta[i].longitud - ruta[i + 1].longitud, 2)
        );
    }
    return -distanciaTotal; // Queremos minimizar la distancia, así que devolvemos el negativo
}

// Genera una población inicial de rutas
function generarPoblacionInicial(puntosOrigen, destinatarios) {
    const puntosTotales = [...puntosOrigen, ...destinatarios];
    const poblacion = [];

    for (let i = 0; i < 100; i++) {
        const rutaAleatoria = puntosTotales.sort(() => Math.random() - 0.5);
        poblacion.push(rutaAleatoria);
    }

    return poblacion;
}

// Función para calcular la ruta óptima
function calcularRutaOptima(puntosOrigen, destinatarios) {
    // Crear una población inicial (permutaciones de los destinos)
    const poblacionInicial = generarPoblacionInicial(puntosOrigen, destinatarios);

    const ga = GeneticAlgorithm({
        mutationFunction: (ruta) => {
            return mutarRuta(ruta);
        },
        crossoverFunction: (ruta1, ruta2) => {
            return cruzarRutas(ruta1, ruta2);
        },
        fitnessFunction: (ruta) => {
            return calcularFitness(ruta, puntosOrigen, destinatarios);
        },
        population: poblacionInicial,
        populationSize: 100,
        mutationRate: 0.01,
        crossoverRate: 0.9,
    });

    const rutaOptima = ga.evolve();
    return rutaOptima;
}

export { calcularDistancia, calcularTiempoEstimado, cruzarRutas, mutarRuta, calcularFitness, generarPoblacionInicial, calcularRutaOptima };