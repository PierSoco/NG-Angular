import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Pregunta {
  texto: string;
  opciones: string[];
  correcta: number;
  detalle: string;
}

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {
  preguntas: Pregunta[] = [
    {
      texto: '¿Qué lenguaje potencia el desarrollo con Angular?',
      opciones: ['JavaScript', 'TypeScript', 'Python'],
      correcta: 1,
      detalle: 'Angular utiliza TypeScript para ofrecer tipado estático y herramientas modernas.'
    },
    {
      texto: '¿Qué equipo mantiene Angular?',
      opciones: ['Facebook', 'Google', 'Microsoft'],
      correcta: 1,
      detalle: 'El equipo de Angular en Google coordina lanzamientos y roadmap.'
    },
    {
      texto: '¿Qué comando genera un componente standalone?',
      opciones: ['ng make component', 'ng g component nombre --standalone', 'npm run component'],
      correcta: 1,
      detalle: 'Los generadores de la CLI permiten crear componentes standalone con `ng g component`.'
    },
    {
      texto: '¿Qué característica facilita la navegación?',
      opciones: ['Angular Router', 'NgAudio', 'NgCanvas'],
      correcta: 0,
      detalle: 'Angular Router maneja rutas, lazy loading, guards y animaciones.'
    },
    {
      texto: '¿Dónde definimos las rutas en este proyecto?',
      opciones: ['app.routes.ts', 'index.html', 'styles.css'],
      correcta: 0,
      detalle: 'app.routes.ts describe el mapa de navegación usando las APIs standalone.'
    }
  ];

  indiceActual = 0;
  respuestaActual?: number;
  respuestasSeleccionadas: number[] = [];
  puntaje = 0;
  mostrarResultado = false;

  get preguntaActual(): Pregunta {
    return this.preguntas[this.indiceActual];
  }

  get progreso(): number {
    return ((this.indiceActual + (this.respuestaActual !== undefined ? 1 : 0)) / this.preguntas.length) * 100;
  }

  seleccionarRespuesta(indice: number): void {
    if (this.respuestaActual !== undefined) {
      return;
    }

    this.respuestaActual = indice;
    this.respuestasSeleccionadas[this.indiceActual] = indice;
    if (indice === this.preguntaActual.correcta) {
      this.puntaje++;
    }
  }

  avanzar(): void {
    if (this.respuestaActual === undefined) {
      return;
    }

    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
      this.respuestaActual = undefined;
    } else {
      this.finalizarTrivia();
    }
  }

  finalizarTrivia(): void {
    this.mostrarResultado = true;
  }

  reiniciarTrivia(): void {
    this.indiceActual = 0;
    this.respuestaActual = undefined;
    this.respuestasSeleccionadas = [];
    this.puntaje = 0;
    this.mostrarResultado = false;
  }

  respuestaEsCorrecta(pregunta: Pregunta, indice: number | undefined): boolean {
    return indice === pregunta.correcta;
  }
}
