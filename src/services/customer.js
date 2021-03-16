import axios from "axios";

const baseUrl = "https://localhost:5001/nw/customer";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
// request vakioon axios.get ja url parametriksi
// return palauttaa requestin arvon ja se sisältää responsen (vastauksen)
// Ei otetata koko responsea vaan otetaan response.data

// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
const create = (newCustomer) => {
  return axios.post(baseUrl, newCustomer); // ensimmäinen parametri mihin lähetetään ja toinen mitä lähetetään (pyynnön body-osassa)
};

const remove = (id) => axios.delete(`${baseUrl}/${id}`); // tätä kutsutaan customerservice.remove ja tälle lähetetään id. Sitten Axios metodi Delete ja sille url apiin sisältäen id:n

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove };
