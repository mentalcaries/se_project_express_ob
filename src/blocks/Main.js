import React, { Component } from 'react';

function listItem(){
    
}

class Main extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        return(
            <main className=''>
                {/* {this.props.form} */}
                <ul>
                    {this.props.cardTemplate()}
                </ul>
                {this.props.weatherCards}

                {<br></br>}


            </main>
        )
    }
}

export {Main}
