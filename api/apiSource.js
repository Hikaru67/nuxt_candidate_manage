export function apiGetSource (axios) {
  return axios.get('/sources')
    .then(res => res.data)
    .catch(xhr => xhr)
}

export function apiGetSourceById (axios, id) {
  return axios.get('/sources/' + id)
    .then(res => res.data)
    .catch(xhr => xhr)
}
