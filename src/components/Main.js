import React from 'react';

const Main = (props) => {
  return (
    <main className=''>
      {props.weatherCards}
      <ul>
        {/* //we need to run a test for 30+ items and make sure the modal stays in place */}
        {props.cardTemplate()}
      </ul>
      <br />
    </main>
  );
};

export { Main };
