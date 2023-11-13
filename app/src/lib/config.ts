import { dev } from "$app/environment"

export const title = "Ham's Hub"
export const description = "A site by an ECE student who also happens to be an Independent Developer."
export const url = dev ? "http://localhost:5173" : "https://kodski.com"
export const themes = [
  { type: 'skeleton', name: 'Skeleton', icon: '💀' },
  { type: 'wintry', name: 'Wintry', icon: '🌨️' },
  { type: 'modern', name: 'Modern', icon: '🤖' },
  { type: 'rocket', name: 'Rocket', icon: '🚀' },
  { type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
  { type: 'vintage', name: 'Vintage', icon: '📺' },
  { type: 'sahara', name: 'Sahara', icon: '🏜️' },
  { type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
  { type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
  { type: 'crimson', name: 'Crimson', icon: '⭕' }
  // { type: 'seasonal', name: 'Seasonal', icon: '🎆' }
  // { type: 'test', name: 'Test', icon: '🚧' },
];