customElements.define("artist-cover", class extends HTMLElement {
  // observedAttributes observe les changements d'attributs sur l'élément, ici on observe les changements de id, name et cover $
  //qui lui appelera l'attributChangedCallback à chaque fois que l'un de ces attributs change pour mettre à jour l'affichage de la composante
  static observedAttributes = ['id', 'name', 'cover']

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }
//de base on aurait mit le code dans connectedCallback mais comme on veut que le code soit aussi appelé à chaque fois que les attributs changent 
// alors on a créé une fonction render qui est appelée dans connectedCallback et attributeChangedCallback pour que le code soit exécuté à chaque fois que la composante est ajoutée au DOM ou que les attributs changent
  render() {
    this.innerHTML = `
      <a href="#artists/${this.getAttribute('id')}">
        <img src="${this.getAttribute('cover')}" />
        <div class="artist-list-item-title">${this.getAttribute('name')}</div>
      </a>
     `
  }
  //ici si on met this ce serait l'artiste cover et pas les attributs de l'artiste cover donc on utilise getAttribute pour récupérer les attributs de l'artiste cover et les afficher dans la composante
})
