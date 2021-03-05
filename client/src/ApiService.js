const BASE_URL = 'http://localhost:3500';

const apiService = {};


apiService.getFamily = () => {
  return fetch(`${BASE_URL}/members`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch(err => console.log(err, 'error in getfamily api'));
}

export default apiService;