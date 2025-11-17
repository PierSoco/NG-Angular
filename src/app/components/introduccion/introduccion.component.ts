import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DatoAngular {
  titulo: string;
  detalle: string;
}

interface Stat {
  label: string;
  value: string;
  detail: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-introduccion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.css']
})
export class IntroduccionComponent {
  titulo = 'Por que Angular es un aliado para crear productos modernos y educativos';
  descripcion =
    'Angular combina TypeScript, APIs standalone y tooling oficial para construir experiencias confiables, accesibles y listas para escalar desde un MVP hasta un campus digital o una suite empresarial.';

  stats: Stat[] = [
    { label: 'Version estable', value: '17+', detail: 'Actualizaciones guiadas via ng update.' },
    { label: 'Arquitectura', value: 'Standalone', detail: 'Component-first con lazy routes y signals.' },
    { label: 'Comunidad', value: '+1M devs', detail: 'Recetas, librerias y soporte activo.' },
    { label: 'Rendimiento', value: '40%+', detail: 'Mejora al combinar SSR, hydration y bundle splitting.' }
  ];

  usos: DatoAngular[] = [
    {
      titulo: 'Aplicaciones educativas',
      detalle: 'Aulas virtuales, paneles docentes y laboratorios interactivos listos para escalar.'
    },
    {
      titulo: 'Dashboards empresariales',
      detalle: 'Componentes reutilizables para monitorear metricas, flujos y reportes en tiempo real.'
    },
    {
      titulo: 'Integraciones API',
      detalle: 'Servicios e interceptors listos para REST, GraphQL y autenticacion.'
    }
  ];

  pilares: DatoAngular[] = [
    {
      titulo: 'Escalabilidad guiada',
      detalle: 'Estructura opinionated que evita decisiones repetidas en cada proyecto.'
    },
    {
      titulo: 'Productividad',
      detalle: 'CLI, generadores y pruebas integradas disminuyen el tiempo de delivery.'
    },
    {
      titulo: 'Accesibilidad',
      detalle: 'Herramientas para internacionalizacion, ARIA y buenas practicas UX.'
    }
  ];

  lineaDeTiempo: TimelineItem[] = [
    {
      year: '2016',
      title: 'Angular (2+) renace',
      description: 'Reescritura completa enfocada en componentes y TypeScript.'
    },
    {
      year: '2020',
      title: 'Ivy y rendimiento',
      description: 'Nuevo motor de renderizado que habilita compilaciones mas ligeras.'
    },
    {
      year: '2023',
      title: 'Standalone APIs',
      description: 'Adios NgModules obligatorios, hola componentes autocontenidos.'
    },
    {
      year: '2024',
      title: 'Hydration + SSR',
      description: 'Experiencias universales con tiempos de carga optimizados.'
    }
  ];
}
