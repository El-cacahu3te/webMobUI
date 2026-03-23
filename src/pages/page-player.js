import { audioPlayer, playSong, currentSong, playNextSong, playPreviousSong } from '../player.js'
import formatTimestamp from '../lib/formatTimestamp.js'

customElements.define("page-player", class extends HTMLElement {

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="player">
        <div id="player-thumbnail">
          <!-- utiliser l'id de cet élément pour changer la cover de la chanson -->
          <img src="http://placecats.com/200/300" id="player-thumbnail-image" />
        </div>

        <div id="player-infos">
          <div id="player-infos-song">
            <span class="material-icons">music_note</span>
            <!-- utiliser l'id de cet élément pour changer le titre de la chanson -->
            <span id="player-infos-song-title">
              -
            </span>
          </div>

          <div id="player-infos-artist">
            <span class="material-icons">person</span>
            <!-- utiliser l'id de cet élément pour changer le nom de l'artiste -->
            <span id="player-infos-artist-name">
              -
            </span>
          </div>
        </div>

        <div id="player-controls">
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur précédent -->
          <button type="button" class="player-control player-control-small" id="player-control-previous">
            <span class="material-icons">skip_previous</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur play/pause -->
          <button type="button" class="player-control" id="player-control-play">
            <span class="material-icons">play_arrow</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur suivant -->
          <button type="button" class="player-control player-control-small" id="player-control-next">
            <span class="material-icons">skip_next</span>
          </button>
        </div>

        <div id="player-progress">
          <input type="range" id="player-progress-bar" value="0" />
          <div id="player-times">
            <!-- utiliser l'id de cet élément pour changer le temps écoulé -->
            <span id="player-time-current">--:--</span>
            <!-- utiliser l'id de cet élément pour changer la durée totale -->
            <span id="player-time-duration">--:--</span>
          </div>
        </div>
      </div>
      `

    this.selectElements();
    this.addEventListeners();
    this.updatePlayerInfos();
  }

  // sélection des éléments HTML
  selectElements() {
    // infos de la chanson
    this.songImage = this.querySelector('#player-thumbnail-image');
    this.songTitle = this.querySelector('#player-infos-song-title');
    this.songArtist = this.querySelector('#player-infos-artist-name');

    // boutons principaux
    this.playButton = this.querySelector('#player-control-play');
    this.nextButton = this.querySelector('#player-control-next');
    this.prevButton = this.querySelector('#player-control-previous');

    // progress bar et affichage du temps
    this.progressBar = this.querySelector('#player-progress-bar');
    this.timeCurrent = this.querySelector('#player-time-current');
    this.timeDuration = this.querySelector('#player-time-duration');
  }

  // ajoute les eventListeners
  addEventListeners() {
    this.updatePlayerInfos = this.updatePlayerInfos.bind(this);
    this.updateCurrentTime = this.updateCurrentTime.bind(this);
    this.updatePlayButton = this.updatePlayButton.bind(this);

    // Change les infos quand une nouvelle chanson est chargée
    audioPlayer.addEventListener('loadeddata', this.updatePlayerInfos);

    // Change l'affichage du bouton play
    audioPlayer.addEventListener('play', this.updatePlayButton);
    audioPlayer.addEventListener('pause', this.updatePlayButton);

    // Change l'affichage du temps écoulé
    audioPlayer.addEventListener('timeupdate', this.updateCurrentTime)

    // Interaction avec les boutons principaux
    this.playButton.addEventListener('click', () => {
      if(!currentSong) return
    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause()
  }); 
  this.nextButton.addEventListener('click', playNextSong);
  this.prevButton.addEventListener('click', playPreviousSong);

    // Interaction avec la progress bar
  this.progressBar.addEventListener('input', () => {

  }

  // Mise à jour des différentes infos de la plage player d'après la chanson en cours
  updatePlayerInfos() {
    if (!currentSong) return //si pas de chanson en cours on retourne la fonction sans faire la suite 
    // infos de la chanson
    this.songImage.src = currentSong.artist.image_url; //on change la cover de la chanson avec l'image de l'artiste de la chanson en cours
    this.songTitle.textContent = currentSong.title; //on change le titre de la chanson avec le titre de la chanson en cours 
    //songTitle récupère l'élément texte content récupère le contenu textuel 
    this.songArtist.textContent = currentSong.artist.name; 
    // durée de la chanson
    this.timeDuration.textContent = formatTimestamp(audioPlayer.duration); //on change la durée totale de la chanson avec la durée de la chanson en cours formatée en minutes et secondes avec la fonction formatTimestamp
    this.progressBar.max = audioPlayer.duration; //on change la valeur maximale de la progress bar avec la durée de la chanson en cours pour que la progress bar soit à 100% à la fin de la chanson 
    this.updatePlayButton();
    this.updateCurrentTime();
    
  }

  // Mise à jour de l'affichage du temps écoulé
  updateCurrentTime() {
      this.timeCurrent.textContent = formatTimestamp(audioPlayer.currentTime); //on change le temps écoulé de la chanson avec le temps actuel  mais ne s'update pas encore de la chanson en cours formatée en minutes et secondes avec la fonction formatTimestamp
      this.progressBar.value = audioPlayer.currentTime; //on change la valeur de la progress bar avec le temps actuel de la chanson en cours pour que la progress bar avance au fur et à mesure que la chanson avance
      //element audio est des attributs propres dont currentTime qui correspond au temps actuel de la chanson en cours et duration qui correspond à la durée totale de la chanson en cours, ces attributs sont mis à jour automatiquement par le navigateur lorsque la chanson est jouée ou que l'utilisateur interagit avec la progress bar pour changer le temps actuel de la chanson en cours
  }

  // Mise à jour de l'affichage du bouton play/pause
  updatePlayButton() {
    this.playButton.querySelector('span').textContent = audioPlayer.paused ? 'play_arrow' :  'pause';
    
  }
})