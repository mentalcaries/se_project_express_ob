import React from 'react';
import ItemCard from "./ItemCard";
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';

const Profile = (props) => {

  const cards = () => {
    let items = []
    for (let i = 0; i <= props.cardContent.length - 1; i++) {
      items.push(props.cardContent[i])

    }
    return items.map((item) => {
      return (
        <ItemCard
          key={item._id}
          name={item.name}
          weather={item.weather}
          imageUrl={item.imageUrl}
          handleClick={(x, y, z) => {
            props.toggleItemModal(item._id, x, y, z);
          }}
        ></ItemCard>
      );
    });
  }

  return (
    <div className='profile'>
      <SideBar></SideBar>
      <ClothesSection addButton={props.addButton} cards={cards()}></ClothesSection>
    </div>
  )
}

export default Profile
