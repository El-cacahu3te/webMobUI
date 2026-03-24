// Elements
import './elements/artist-cover.js'
import './elements/song-item.js'
import './elements/search-bar.js'
import './elements/spot-footer.js'
// Pages
import './pages/page-artists.js'
import './pages/page-home.js'
import './pages/page-player.js'
import './pages/page-songs.js'
import './pages/page-artist-songs.js'
import './pages/page-search-songs.js'
import './pages/page-favorite-songs.js'


const router = () => {
  const main = document.querySelector('main')
  const hashs = (window.location.hash || '#home').split('/')
  //location.hash récupère la partie de l'url après le #, ou #home par défaut

  if (hashs[0] == '#home')
    //on ajoute l'élément page-home au DOM et le connectedCallback de page-home est appelé
    main.innerHTML = '<page-home />'
  
  else if (hashs[0] == '#player')
    main.innerHTML = '<page-player />'
  
  else if (hashs[0] == '#artists' && !hashs[1]) 
  //si on est sur la page des artistes pas sur la page d'un artiste en particulier
  //donc on veut afficher la page des artistes avec la liste de tous les artistes on veut que la page artiste soit uniquement #artiste et rien d'autre après le #artiste
    main.innerHTML = '<page-artists />'
  else if (hashs[0] == '#artists')
    main.innerHTML = `<page-artist-songs artist-id="${hashs[1]}" />`
 // la on ira sur la page spécifique à un artiste 
  // autres routes
  else if(hashs[0] == '#search')
    main.innerHTML = `<page-search-songs query="${decodeURIComponent(hashs[1])}" />` 
  //recherche de chanson avec la query passée dans l'url après le #search/ et on affiche les résultats de la recherche dans la page de recherche de chanson
  else if(hashs[0] == '#favorites')
    main.innerHTML = `<page-favorite-songs />`
}

const setupOfflineMode = () => {
  const body = document.querySelector('body'); 
  const searchButton = document.querySelector('#search-trigger');
  const searchInput = document.querySelector('#search-input');

  window.addEventListener('offline', () => {
    body.classList.add('offline');
    searchButton.setAttribute('disabled', ""); //désactive le bouton de recherche lorsque l'utilisateur est hors ligne pour éviter les erreurs de recherche qui ne fonctionnerait pas sans connexion internet
    searchInput.classList.remove('active'); //masque le champ de recherche lorsque l'utilisateur est hors ligne pour éviter les erreurs de recherche qui ne fonctionnerait pas sans connexion internet
  }); 
  window.addEventListener('online', () => {
    body.classList.remove('offline');
    searchButton.removeAttribute('disabled'); //réactive le bouton de recherche lorsque l'utilisateur est de nouveau en ligne pour lui permettre de faire des recherches à nouveau
  }); 
}; 

const connectServiceWorkers = () => {
  navigator.serviceWorker.register('/OneSignalSDKWorker.js'); 
  //tout ce qui est dans publique va se retrouver à la racine du site 
  
}

window.addEventListener('hashchange', router)
//recharge la composante à chaque changement de hash

router()
setupOfflineMode()
connectServiceWorkers()