import Disegno from './assets/images/disegno-tecnico.webp'


export const ConfigData = {
    images: {
        summaryHeader: Disegno
    },
  /* Opzioni configurabili */
  doorThicknessOptions: ['40', '44', '50'],
  wallThicknessOptions: ['10', '12.5', '15'],
  measureTypes: [
    { label: 'Misura luce', value: 'luce' },
    { label: 'Misura porta', value: 'porta' },
    { label: 'Apertura muro', value: 'muro' }
  ],
  fixedWidths: [600, 700, 800, 900],
  fixedHeights: [2000, 2100, 2200],

  /* Stile centralizzato moderno */
  colors: {
    primary: '#1f2937',        // colore principale testo
    secondary: '#3b82f6',      // blu accent
    background: '#f3f4f6',     // sfondo app chiaro
    completedStep: '#10b981',  // verde step completato
    activeStep: '#facc15',     // giallo step corrente
    buttonBg: '#ffffff',
    buttonHover: '#e5e7eb',
    buttonActive: '#3b82f6',
    buttonActiveText: '#ffffff',
    cardBg: '#ffffff',
    cardShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }
}
