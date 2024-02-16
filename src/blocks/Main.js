import React, { Component } from 'react';

class Main extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        return(
            <main className=''>
                {this.props.weatherCards}
                <ul> 
                    {/* //we need to run a test for 30+ items and make sure the modal stays in place */}
                    {this.props.cardTemplate()}
                </ul>

                {<br></br>}


            </main>
        )
    }
}

export {Main}
