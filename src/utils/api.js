//what are we doing with this 3001 end port
//wtf is items, should the name be clothing items.
//wtf is the api even grabbing from is it db.json 


const baseUrl = 'http://localhost:3001';

const getCards = () => {
  return fetch(`${baseUrl}/items`)
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      return results;
    });
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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        return result;
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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => result)

  };

export { getCards, addCard, deleteCard };

