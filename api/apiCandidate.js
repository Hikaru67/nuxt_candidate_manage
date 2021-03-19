export function apiGetCandidateProfiles (axios) {
  return axios.get('/candidates-profiles')
    .then(res => res.data)
    .catch(xhr => xhr)
}

export function apiSearchCandidateProfiles (axios, condition) {
  return axios.get('/candidates-profiles', condition)
    .then(res => res.data)
    .catch(xhr => xhr)
}
