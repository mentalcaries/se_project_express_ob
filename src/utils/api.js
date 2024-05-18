//what are we doing with this 3001 end port
//wtf is items, should the name be clothing items.
//wtf is the api even grabbing from is it db.json 


const baseUrl = 'http://localhost:3001';

const getCards = () =>{
    return fetch(`${baseUrl}/items`).then((response) =>{
        return response.json()
    }).then((results) =>{
        return results;
    })
}

export default getCards
