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
  titulo = '¿Qué es Angular y por qué se adapta tan bien a proyectos educativos y empresariales?';
  descripcion =
    'Angular es un framework open-source mantenido por Google que combina TypeScript, herramientas oficiales y una arquitectura basada en componentes standalone para crear experiencias web fluidas y escalables.';

  stats: Stat[] = [
    { label: 'Versión estable', value: '17+', detail: 'Actualizaciones semestrales vía ng update.' },
    { label: 'Arquitectura', value: 'Standalone', detail: 'Component-first con lazy routes y signals.' },
    { label: 'Comunidad', value: '+1M devs', detail: 'Documentación y recursos creados por la comunidad.' },
    { label: 'Rendimiento', value: '40%+', detail: 'Mejoras de Lighthouse combinando SSR + hydration.' }
  ];

  usos: DatoAngular[] = [
    {
      titulo: 'Aplicaciones educativas',
      detalle: 'Paneles, aulas virtuales y experiencias interactivas que requieren SPA rápidas.'
    },
    {
      titulo: 'Dashboards empresariales',
      detalle: 'Componentes reutilizables para monitorear métricas, flujos y reportes.'
    },
    {
      titulo: 'Integraciones API',
      detalle: 'Servicios y HTTP interceptors listos para consumir REST y GraphQL.'
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
      detalle: 'Herramientas para internacionalización, ARIA y buenas prácticas UX.'
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
      description: 'Nuevo motor de renderizado que habilita compilaciones más ligeras.'
    },
    {
      year: '2023',
      title: 'Standalone APIs',
      description: 'Adiós NgModules obligatorios, hola componentes autocontenidos.'
    },
    {
      year: '2024',
      title: 'Hydration + SSR',
      description: 'Experiencias universales con tiempos de carga optimizados.'
    }
  ];
}
