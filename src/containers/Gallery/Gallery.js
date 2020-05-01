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
        imageList: [],
        columnsInGrid: 2
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

    columnChangeHandler = (event) => {
        this.setState({columnsInGrid: event.target.value});
    }

    render () {
        let photogrid = null;
        if (this.state.imageList.length > 0) {
            photogrid = <PhotoGrid images={this.state.imageList} columns={this.state.columnsInGrid}/>
        }
        return (
            <Aux>
                <div className={styles.Nav}>
                    <Search
                        searchInputHandler={this.searchInputHandler}
                        searchHandler={this.searchHandler}/>
                </div>
                <div>
                    <div className={styles.ImagesSection}>
                        {photogrid}
                    </div>
                    <div className={styles.GridChangeSection}>
                        <label for="grid">Choose columns in grid:</label><br/>
                        <select id="grid" className={styles.GridDropDown} onChange={this.columnChangeHandler}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Gallery;
