//what are we doing with this 3001 end port
//wtf is items, should the name be clothing items.
//wtf is the api even grabbing from is it db.json 
//


const baseUrl = 'http://localhost:3000';

const getCards = () =>{
    fetch(`${baseUrl}/items`).then((response) =>{
        console.log(response.ok)
        console.log(response)
    })
}

export default getCards
