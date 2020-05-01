import React, { Component } from 'react';
import styles from './PhotoGrid.module.css';
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
                <Aux key={index}>
                    <Photo image={image}/>
                    { rowBreak ? <br /> : null }
                </Aux>
            )
        });
        return (
            <ul className={styles.ImagesList}>
                {images}
            </ul>
        );
    }
}

export default PhotoGrid;
