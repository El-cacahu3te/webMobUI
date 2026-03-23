import { getFavorite, toggleFavorite } from '../local-storage.js'
import { playSong } from '../player.js'
export class PageSong extends HTMLElement {
  static observedAttributes = [] //on observe les changements de l'attribut pour mettre à jour l'affichage de la composante lorsque l'artiste change
  //met la page spécifique à l'artiste id 
  songs = [] //on stocke la liste des chansons de la page spécifique à l'artiste dans une variable de classe pour pouvoir y accéder facilement dans les fonctions de la page spécifique à l'artiste et éviter de devoir les récupérer à chaque fois dans le DOM

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    this.getSongsData()
      .then((songs) => {
        this.songs = songs //on stocke la liste des chansons de la page spécifique à l'artiste dans une variable de classe pour pouvoir y accéder facilement dans les fonctions de la page spécifique à l'artiste et éviter de devoir les récupérer à chaque fois dans le DOM
        this.innerHTML = `
        <h4>
        ${this.getTitle()} 
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
          songItem.setAttribute('favorite', getFavorite(song.id) ? 'true' : 'false'); 
          songItem.addEventListener('playsong', () => playSong(song, songs)) //passse fonction playsong avec paramètre sans l'appeler tout de suite, elle est appelée uniquement lorsque l'événement playsong est déclenché et pas à chaque fois que la page est rendue
          //ici a chaque fois qu'on l'appelle elle effecture la fonction au lieu de juste la passer  donc il faut présiser on crée un fonction et la passe en paramètre de l'eventListener pour que la fonction soit appelée uniquement lorsque l'événement playsong est déclenché et pas à chaque fois que la page est rendue
          //on veut pas lui passer que un son mais la lliste entière des chansons 
          songItem.addEventListener('favoritesong', () => {
            toggleFavorite(song);
            songItem.setAttribute ('favorite', getFavorite(song.id) ? 'true' : 'false');
          })
          songList.append(songItem)
        })
      })
  }
   async getSongsData() {
    return [];
  }
  getTitle() {
    return "title";
  }
};

