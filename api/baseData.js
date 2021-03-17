export function apiGetPositions (axios) {
  return axios.get('/positions')
    .then(res => res.data)
    .catch(xhr => xhr)
}

export function apiGetRoles (axios) {
  return axios.get('/roles')
    .then(res => res.data)
    .catch(xhr => xhr)
}

export function apiGetSource (axios) {
  return axios.get('/sources')
    .then(res => res.data)
    .catch(xhr => xhr)
}
