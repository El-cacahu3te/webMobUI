import { getArtists } from '../api.js'
customElements.define("page-artists", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h4>Artistes</h4>

      <artist-list>
      </artist-list>
    `
    const artistList = this.querySelector('artist-list')

    // Itérer le tableau d'artistes reçus et créer les éléments correspondants
    getArtists() //récupère le tableau d'artistes en json
      .then((artists) => {
        console.log(artists); 
        //retourne le tableau de tout les artistes 
        artists.forEach(artist => {
          //passe les artistes un par un et pour chaque artiste on ajoute un élément artist-cover dans le artist-list avec les informations de l'artiste
          // concatène les différent truc texte 
          artistList.innerHTML += `
          <artist-cover id="${artist.id}" name="${artist.name}" cover="${artist.image_url}" />`
          
        });
      })
  }
})
