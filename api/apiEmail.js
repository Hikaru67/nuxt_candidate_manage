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

export function apiSearchEmailTemplates (axios, condition) {
  return axios.get('/email-templates?' + condition)
    .then(res => res.data)
    .catch(xhr => xhr)
}
