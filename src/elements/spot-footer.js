customElements.define("spot-footer", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <a href="#home" class="active">
          <span class="material-icons">home</span>
          <span>Home</span>
        </a>
        <a href="#player">
          <span class="material-icons">subscriptions</span>
          <span>Lecteur</span>
        </a>
        <a href="#artists">
          <span class="material-icons">library_music</span>
          <span>Musique</span>
        </a>
        <a href="#favorites">
          <span class="material-icons">favorite</span>
          <span>Favoris</span>
        </a>
      </nav>
    `
    //le #player avec href est mis à la suite du lien normal c'est pas ajouté mais juste mis 

    this.hashChange = this.hashChange.bind(this)
    window.addEventListener("hashchange", this.hashChange)
//le hashchange est un événement qui est déclenché à chaque fois que le hash de l'url change, c'est à dire à chaque fois que l'on clique sur un lien dans le footer
//dans une fonction dans une classe le this fait référence à la classe donc on précises que hashChange doit être connecté au this de la classe pour que le this dans hashChange fasse référence à la classe et pas à l'élément qui a déclenché l'événement
//si non le this ferait référence a window et pas à la classe et on ne pourrait pas accéder à la classe dans hashChange
    this.hashChange()
  }

  hashChange() {
    // on prend la première partie du hash
    const current = window.location.hash.split('/')[0]

    // on cherche l'élément actif, si on le trouve, la classe "active" est enlevée
    this.querySelector(`nav a.active`)?.classList.remove('active')

    // on cherche le nouvel élément correspondant à l'url en cours et si on le trouve,
    // la classe "active" est ajoutée
    this.querySelector(`nav a[href="${current}"]`)?.classList.add('active')
    //le css défini dans spot-footer.css fait que l'élément qui est actif est en bleu 
  }
})
