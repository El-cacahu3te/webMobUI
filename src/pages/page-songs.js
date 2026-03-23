import { getSongs } from '../api.js'
import { playSong } from '../player.js'
customElements.define("page-artist-songs", class extends HTMLElement {
  static observedAttributes = ['artist-id'] //on observe les changements de l'attribut artist-id pour mettre à jour l'affichage de la composante lorsque l'artiste change
  //met la page spécifique à l'artiste id 

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const artistId = this.getAttribute('artist-id')

    getSongs(artistId)
    .then((songs) => {
      this.innerHTML = `
        <h4>
          Artistes > ${songs[0].artist.name}
        </h4>

        <div class="list">
        </div>
      `
      //ici on ne crée pas juste une list html directement dans le innerHTML parce qu'on aura besoind d'un eventListener
      //pour récupérer les chansons qu'on jouera plus tard plutot que d'aller les chercher à chque fois dans le DOM on les récupère une fois et on les ajoute à la liste des chansons de la page spécifique à l'artiste et on ajoute un eventListener à chaque chanson pour pouvoir les jouer plus tard 
      // on rajoute donc un élément mais on le met pas dans la page directement pour pouvoir mettre le eventlister dessus avant de l'ajouter à la page avec le .append() qui ajoute l'élément à la fin de la liste des éléments déjà présents dans la page
      const songList = this.querySelector('.list')
      // Itérer le tableau de chansons reçu et créer les éléments correspondants
      songs.forEach((song) => {
        const songItem = document.createElement('song-item')
        songItem.setAttribute('title', song.title)
        songItem.addEventListener('playsong', () => playSong(song, songs)) //passse fonction playsong avec paramètre sans l'appeler tout de suite, elle est appelée uniquement lorsque l'événement playsong est déclenché et pas à chaque fois que la page est rendue
        //ici a chaque fois qu'on l'appelle elle effecture la fonction au lieu de juste la passer  donc il faut présiser on crée un fonction et la passe en paramètre de l'eventListener pour que la fonction soit appelée uniquement lorsque l'événement playsong est déclenché et pas à chaque fois que la page est rendue
         //on veut pas lui passer que un son mais la lliste entière des chansons 
        songList.append(songItem)
      })
    })
  }
})

