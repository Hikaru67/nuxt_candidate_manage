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

export function apiGetSourceById (axios, id) {
  return axios.get('/sources/' + id)
    .then(res => res.data)
    .catch(xhr => xhr)
}

export function apiGetEmailTemplates (axios) {
  return axios.get('/email-templates')
    .then(res => res.data)
    .catch(xhr => xhr)
}

export function apiGetCandidateProfiles (axios) {
  return axios.get('/candidates-profiles')
    .then(res => res.data)
    .catch(xhr => xhr)
}
