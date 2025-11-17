import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Caracteristica {
  nombre: string;
  detalle: string;
  beneficio: string;
}

interface Categoria {
  titulo: string;
  descripcion: string;
  chips: string[];
}

@Component({
  selector: 'app-caracteristicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent {
  titulo = 'Pilares que hacen a Angular ideal para productos modernos';

  listaCaracteristicas: Caracteristica[] = [
    {
      nombre: 'Componentes reutilizables',
      detalle: 'Cada pieza encapsula logica, vista y estilos con inputs y outputs claros.',
      beneficio: 'Disminuye deuda tecnica y mejora el onboarding.'
    },
    {
      nombre: 'Data binding reactivo',
      detalle: 'Sincroniza automaticamente vistas y estados con Change Detection optimizada.',
      beneficio: 'Reduce errores al manipular el DOM manualmente.'
    },
    {
      nombre: 'Inyeccion de dependencias',
      detalle: 'Servicios compartidos listos para pruebas unitarias y mocking sencillo.',
      beneficio: 'Escenarios complejos resultan mas testeables.'
    },
    {
      nombre: 'Router avanzado',
      detalle: 'Lazy loading, guards, resolvers y navegacion accesible.',
      beneficio: 'Optimiza la experiencia en aplicaciones SPA.'
    },
    {
      nombre: 'Herramientas oficiales',
      detalle: 'Angular CLI, analiticas, builders y actualizaciones guiadas.',
      beneficio: 'Entregas constantes sin romper funcionalidades.'
    }
  ];

  categorias: Categoria[] = [
    {
      titulo: 'Performance',
      descripcion: 'Ivy, hydration y estrategias de cambio para apps veloces.',
      chips: ['Standalone APIs', 'Signals', 'SSR']
    },
    {
      titulo: 'UX & UI',
      descripcion: 'Componentes accesibles, animaciones listas y Material 3 adaptable.',
      chips: ['Angular Material', 'CDK', 'Animations']
    },
    {
      titulo: 'Productividad',
      descripcion: 'CLI, esquemas Nx-ready y tooling VS Code.',
      chips: ['Generators', 'Schematics', 'Testing']
    }
  ];
}
