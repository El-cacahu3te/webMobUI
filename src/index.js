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
}

const setupOfflineMode = () => {

}

const connectServiceWorkers = () => {
  
}

window.addEventListener('hashchange', router)
//recharge la composante à chaque changement de hash

router()
setupOfflineMode()
connectServiceWorkers()