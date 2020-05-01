import React, { Component } from 'react';
import Photo from '../../components/Photo/Photo';

class PhotoGrid extends Component {
    render () {
        return (
            <ul>
                {this.props.images.map((image, index) => {
                    return <Photo key={index} image={image}/>
                })};
            </ul>
        );
    }
}

export default PhotoGrid;
