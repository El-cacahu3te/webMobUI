customElements.define('song-item', class extends HTMLElement {
  static observedAttributes = ['title']

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const icon = this.getAttribute('favorite') == 'true' ? 'favorite' : 'favorite_border'

    this.innerHTML = `
      <div class="list-item-title">${this.getAttribute('title')}</div>
      <div class="list-item-actions">
        <button type="button" class="icon-button favorite-button ">
          <span class="material-icons">${icon}</span>
        </button>
        <button type="button" class="icon-button play-button">
          <span class="material-icons">play_arrow</span>
        </button>
      </div>`

    // événements customs
    const playEvent = new CustomEvent('playsong')//tout minuscule tout collé ou _
    this.querySelector('.play-button') //on récupère le bouton play de la chanson
      .addEventListener('click', () => this.dispatchEvent(playEvent)) //le () crée une autre fonction qui est passée mais pas appelée tout de suite, elle est appelée uniquement lorsque le bouton play est cliqué et pas à chaque fois que la page est rendue
      //on lui ajoute un eventListener pour écouter les clics sur le bouton play
      //lorsque le bouton play est cliqué, on dispatch l'événement playEvent qui est un événement custom qui peut être écouté par d'autres éléments du DOM pour savoir quand une chanson est jouée
  }
})
