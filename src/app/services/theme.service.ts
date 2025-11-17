import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Tema = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'ng-angular-tema';
  private temaActual: Tema = 'dark';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initTheme();
  }

  toggleTheme(): Tema {
    const siguienteTema: Tema = this.temaActual === 'dark' ? 'light' : 'dark';
    return this.setTheme(siguienteTema);
  }

  setTheme(tema: Tema): Tema {
    this.temaActual = tema;
    this.document.documentElement.setAttribute('data-theme', tema);
    this.document.body.setAttribute('data-theme', tema);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, tema);
    }
    return tema;
  }

  getTheme(): Tema {
    return this.temaActual;
  }

  private initTheme(): void {
    const preferenciaGuardada = typeof localStorage !== 'undefined' ? (localStorage.getItem(this.storageKey) as Tema | null) : null;
    const prefiereOscuro = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const temaInicial: Tema = preferenciaGuardada ?? (prefiereOscuro ? 'dark' : 'light');
    this.setTheme(temaInicial);
  }
}
