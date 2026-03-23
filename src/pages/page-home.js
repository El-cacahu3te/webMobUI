customElements.define("page-home", class extends HTMLElement {
  connectedCallback() {
    //connected call back est appelé à chaque fois que la composante est ajoutée au DOM/html
    this.innerHTML = `
      <h1 class="hero">Bienvenue</h1>
      <h4>Playlists</h4>
    `
  }//le page-home ajoute le bienvenu et playlise sur la page d'acceuil
})
