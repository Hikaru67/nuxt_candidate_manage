export function apiGetEmailTemplates (axios) {
  return axios.get('/email-templates')
    .then(res => res.data)
    .catch(xhr => xhr)
}

export function apiGetEmailTemplatesById (axios, id) {
  return axios.get('/email-templates/' + id)
    .then(res => res.data)
    .catch(xhr => xhr)
}
