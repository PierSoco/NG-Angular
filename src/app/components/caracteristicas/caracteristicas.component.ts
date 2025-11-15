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
  titulo = 'Características y ventajas que hacen a Angular ideal para productos modernos';

  listaCaracteristicas: Caracteristica[] = [
    {
      nombre: 'Componentes reutilizables',
      detalle: 'Cada pieza encapsula lógica, vista y estilos.',
      beneficio: 'Disminuye deuda técnica y mejora el onboarding.'
    },
    {
      nombre: 'Data binding reactivo',
      detalle: 'Sincroniza automáticamente vistas y estados.',
      beneficio: 'Reduce errores al manipular el DOM manualmente.'
    },
    {
      nombre: 'Inyección de dependencias',
      detalle: 'Servicios compartidos listos para pruebas unitarias.',
      beneficio: 'Escenarios complejos resultan más testeables.'
    },
    {
      nombre: 'Router avanzado',
      detalle: 'Lazy loading, guards, resolvers y navegación accesible.',
      beneficio: 'Optimiza la experiencia en aplicaciones SPA.'
    },
    {
      nombre: 'Herramientas oficiales',
      detalle: 'Angular CLI, analíticas, builders y actualizaciones guiadas.',
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
      descripcion: 'Componentes accesibles, animaciones listas y Material 3.',
      chips: ['Angular Material', 'CDK', 'Animations']
    },
    {
      titulo: 'Productividad',
      descripcion: 'CLI, esquemas Nx-ready y tooling VS Code.',
      chips: ['Generators', 'Schematics', 'Testing']
    }
  ];
}
