import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Photo from '../../components/Photo/Photo';

class PhotoGrid extends Component {
    render () {
        let rowBreak = null;
        let images = this.props.images.map((image, index) => {
            rowBreak = false;
            if (((index+1) % this.props.columns) === 0) {
                rowBreak = true;
            }
            return (
                <Aux>
                    <Photo key={index} image={image}/>
                    { rowBreak ? <br /> : null }
                </Aux>
            )
        });
        return (
            <ul>
                {images}
            </ul>
        );
    }
}

export default PhotoGrid;
