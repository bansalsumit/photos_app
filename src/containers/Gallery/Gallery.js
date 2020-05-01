import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import constants from '../../constants';
import axios from 'axios';
import Search from '../../components/UI/Search/Search';
import PhotoGrid from '../PhotoGrid/PhotoGrid';
import styles from './Gallery.module.css';

class Gallery extends Component {
    state = {
        searchInput: null,
        imageList: []
    }

    searchInputHandler = (event) => {
        this.setState({searchInput: event.target.value});
    }

    searchHandler = (event) => {
        const url = constants.BASE_URL + "&text=" + this.state.searchInput;
        axios.get(url)
            .then(response => {
                this.setState({imageList: response.data.photos.photo});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render () {
        let photogrid = null;
        if (this.state.imageList.length > 0) {
            photogrid = <PhotoGrid images={this.state.imageList}/>
        }
        return (
            <Aux>
                <div className={styles.Nav}>
                    <Search
                        searchInputHandler={this.searchInputHandler}
                        searchHandler={this.searchHandler}/>
                </div>
                {photogrid}
            </Aux>
        );
    }
}

export default Gallery;
