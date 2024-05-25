//
const baseUrl = 'http://localhost:3001';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

const getCards = () => {
  return fetch(`${baseUrl}/items`)
    .then((response) => {
      return checkResponse(response);
    })

};

const addCard = (data) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return checkResponse(response);
    })


};

const deleteCard = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return checkResponse(response);
    })

};

export { getCards, addCard, deleteCard };

