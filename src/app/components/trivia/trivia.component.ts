import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

type TipoReto = 'mito' | 'multiple';

interface Reto {
  titulo: string;
  escenario: string;
  tipo: TipoReto;
  opciones?: string[];
  respuestaIndice?: number;
  esRealidad?: boolean;
  pista: string;
  detalle: string;
}

interface EstadisticasRonda {
  aciertos: number;
  errores: number;
  precision: number;
  rachaMaxima: number;
  energiaRestante: number;
}

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {
  private bancoRetos: Reto[] = [
    {
      titulo: 'Lazy loading en accion',
      escenario: 'Una ruta tiene children que cargan modulos pesados. La mejor practica es cargar todo al inicio para evitar latencia?',
      tipo: 'mito',
      esRealidad: false,
      pista: 'El objetivo es dividir el bundle inicial.',
      detalle: 'El lazy loading permite entregar el primer render rapido y traer vistas pesadas cuando se necesitan.'
    },
    {
      titulo: 'Signals vs Zone.js',
      escenario: 'Puedes usar Signals sin Zone.js para reducir change detection en Angular 17+?',
      tipo: 'multiple',
      opciones: ['No, Signals requieren Zone.js', 'Si, puedes deshabilitar Zone.js y usar Signals', 'Solo en SSR'],
      respuestaIndice: 1,
      pista: 'El nuevo `bootstrapApplication` puede configurar `zone: "noop"`.',
      detalle: 'Signals funcionan sin Zone.js; puedes optar por deteccion manual o `RxJS interop`.'
    },
    {
      titulo: 'Standalone everywhere',
      escenario: 'Los componentes standalone permiten omitir NgModule al 100% en nuevas apps y librerias nuevas?',
      tipo: 'multiple',
      opciones: ['Si, puedes evitar NgModule por completo', 'No, siempre necesitas al menos AppModule', 'Solo en librerias'],
      respuestaIndice: 0,
      pista: 'router, HttpClient, formularios funcionan con providers standalone.',
      detalle: 'NgModule ya no es obligatorio; los providers y rutas se declaran directamente en bootstrap o en componentes.'
    },
    {
      titulo: 'Mito del rendimiento',
      escenario: 'DetectChanges() manual siempre mejora el rendimiento de cualquier componente?',
      tipo: 'mito',
      esRealidad: false,
      pista: 'Piensa en simplicidad vs costo de mantenimiento.',
      detalle: 'Forzar deteccion manual indiscriminada puede complicar el codigo y no siempre mejora el rendimiento; Signals y zoneless ayudan.'
    },
    {
      titulo: 'Streams de UI',
      escenario: 'Necesitas combinar filtros y paginacion en una tabla. Que operador RxJS usarias para evitar suscripciones anidadas y recalcular la vista?',
      tipo: 'multiple',
      opciones: ['mergeMap', 'switchMap', 'combineLatest'],
      respuestaIndice: 2,
      pista: 'Une multiples fuentes reactivas y recalcula.',
      detalle: 'combineLatest escucha ambos streams (filtros y pagina) y emite una vista de datos consistente.'
    },
    {
      titulo: 'SSR y APIs',
      escenario: 'SSR siempre resuelve el CORS cuando llama a APIs externas?',
      tipo: 'mito',
      esRealidad: false,
      pista: 'CORS depende del servidor origen.',
      detalle: 'SSR ejecuta en el servidor pero CORS es una politica del servidor destino; debes configurarlo alli.'
    },
    {
      titulo: 'Estilos con variables',
      escenario: 'Es posible usar CSS variables reactivas al tema sin Tailwind o Sass?',
      tipo: 'multiple',
      opciones: ['Si, con custom properties y data-attributes', 'No, necesitas preprocesadores', 'Solo con Tailwind'],
      respuestaIndice: 0,
      pista: 'El atributo `data-theme` es tu aliado.',
      detalle: 'Las custom properties permiten cambiar paletas en runtime; basta con alternar data-attributes.'
    },
    {
      titulo: 'Preload selectivo',
      escenario: 'El preloadingStrategy "quicklink" carga todas las rutas lazy al inicio?',
      tipo: 'mito',
      esRealidad: false,
      pista: 'Observa solicitudes en uso real.',
      detalle: 'Quicklink precarga rutas detectadas en viewport o enlaces visibles; no descarga todo indiscriminadamente.'
    },
    {
      titulo: 'Iconos y performance',
      escenario: 'Usar un sprite SVG con `<use>` es mejor que muchas fuentes de iconos?',
      tipo: 'multiple',
      opciones: ['Si, reduces solicitudes y tamano', 'No, las webfonts son siempre mas ligeras', 'Solo si no hay cache'],
      respuestaIndice: 0,
      pista: 'Menos fuentes, menos reflow de texto.',
      detalle: 'Un sprite SVG evita multiples descargas y mejora nitidez en pantallas 2x.'
    },
    {
      titulo: 'Mito de produccion',
      escenario: 'Compilar con `ng serve --configuration production` es equivalente a `ng build --configuration production`?',
      tipo: 'mito',
      esRealidad: false,
      pista: 'Piensa en dev server.',
      detalle: '`ng serve` no genera los assets optimizados ni aplica todas las optimizaciones de build.'
    }
  ];

  retos: Reto[] = [];
  tamanoRonda = 5;
  rondaActual = 1;
  indiceActual = 0;
  respuestaActual?: number | boolean;
  respuestasSeleccionadas: (number | boolean | undefined)[] = [];
  puntaje = 0;
  mostrarResultado = false;
  rachaActual = 0;
  rachaMaxima = 0;
  energiaMax = 3;
  energia = this.energiaMax;
  multiplicador = 1;
  pistaActiva = false;
  estadisticas: EstadisticasRonda = {
    aciertos: 0,
    errores: 0,
    precision: 0,
    rachaMaxima: 0,
    energiaRestante: 0
  };

  ngOnInit(): void {
    this.prepararRonda();
  }

  get retoActual(): Reto {
    return this.retos[this.indiceActual];
  }

  get progreso(): number {
    return ((this.indiceActual + (this.respuestaActual !== undefined ? 1 : 0)) / this.tamanoRonda) * 100;
  }

  responderMultiple(indice: number): void {
    if (this.respuestaActual !== undefined) {
      return;
    }
    this.respuestaActual = indice;
    const esCorrecta = this.retoActual.respuestaIndice === indice;
    this.registrarResultado(esCorrecta);
    this.respuestasSeleccionadas[this.indiceActual] = indice;
  }

  responderMito(valor: boolean): void {
    if (this.respuestaActual !== undefined) {
      return;
    }
    this.respuestaActual = valor;
    const esCorrecta = this.retoActual.esRealidad === valor;
    this.registrarResultado(esCorrecta);
    this.respuestasSeleccionadas[this.indiceActual] = valor;
  }

  avanzar(): void {
    if (this.respuestaActual === undefined) {
      return;
    }

    if (this.indiceActual < this.tamanoRonda - 1 && this.energia > 0) {
      this.indiceActual++;
      this.respuestaActual = undefined;
      this.pistaActiva = false;
    } else {
      this.finalizarTrivia();
    }
  }

  mostrarPista(): void {
    this.pistaActiva = true;
  }

  reiniciarTrivia(): void {
    this.rondaActual = 1;
    this.prepararRonda();
  }

  siguienteRonda(): void {
    this.rondaActual++;
    this.prepararRonda();
  }

  respuestaEsCorrecta(reto: Reto, seleccion: number | boolean | undefined): boolean {
    if (reto.tipo === 'multiple') {
      return seleccion === reto.respuestaIndice;
    }
    return seleccion === reto.esRealidad;
  }

  private registrarResultado(esCorrecta: boolean): void {
    if (esCorrecta) {
      this.puntaje += this.multiplicador;
      this.rachaActual++;
      this.rachaMaxima = Math.max(this.rachaMaxima, this.rachaActual);
      this.multiplicador = Math.min(this.multiplicador + 1, 5);
    } else {
      this.rachaActual = 0;
      this.multiplicador = 1;
      this.energia = Math.max(0, this.energia - 1);
    }
  }

  private finalizarTrivia(): void {
    this.mostrarResultado = true;
    const total = this.retos.length || this.tamanoRonda;
    const precision = total ? Math.round((this.puntaje / total) * 100) : 0;
    const errores = this.respuestasSeleccionadas.filter(
      (sel, idx) => !this.respuestaEsCorrecta(this.retos[idx], sel)
    ).length;
    this.estadisticas = {
      aciertos: this.puntaje,
      errores,
      precision,
      rachaMaxima: this.rachaMaxima,
      energiaRestante: this.energia
    };
  }

  private prepararRonda(): void {
    this.retos = this.obtenerRetosAleatorios();
    this.indiceActual = 0;
    this.respuestaActual = undefined;
    this.respuestasSeleccionadas = [];
    this.puntaje = 0;
    this.mostrarResultado = false;
    this.rachaActual = 0;
    this.rachaMaxima = 0;
    this.energia = this.energiaMax;
    this.multiplicador = 1;
    this.pistaActiva = false;
    this.estadisticas = {
      aciertos: 0,
      errores: 0,
      precision: 0,
      rachaMaxima: 0,
      energiaRestante: this.energia
    };
  }

  private obtenerRetosAleatorios(): Reto[] {
    const barajados = [...this.bancoRetos].sort(() => Math.random() - 0.5);
    return barajados.slice(0, this.tamanoRonda);
  }
}
