import { initReveal } from './components/reveal.js';

initReveal();

const page = document.body.dataset.page;

if (page === 'home') {
  import('./animations/tree.js').then((m) => m.initTree());
}

if (page === 'home' || page === 'estimate') {
  import('./pages/estimate.js').then((m) => m.initEstimator());
}

if (page === 'projects') {
  import('./pages/projects.js').then((m) => m.initProjects());
}

if (page === 'contact') {
  import('./pages/contact.js').then((m) => m.initContact());
}
