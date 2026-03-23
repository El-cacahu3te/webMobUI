const BASE_URL = 'https://webmob-ui-22-spotlified.herokuapp.com'
//récupère en json donc on doit faire un .then pour récupérer le json et le retourner en objet js
const fetchJson = (url) => fetch(`${BASE_URL}${url}`).then((response) => response.json())

const getArtists = () => fetchJson('/api/artists')

const getSongs = (id) => fetchJson(`/api/artists/${id}/songs`)

const search = (query) => fetchJson(`/api/songs/search/${query}`)

export { getArtists, getSongs, search }
