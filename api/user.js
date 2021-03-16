export function apiGetUserInfo (axios, id) {
  return axios.get(`/get-user/${id}`)
    .then(res => res)
    .catch(xhr => xhr)
}
