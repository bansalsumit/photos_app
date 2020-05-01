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
        imageList: {},
        columnsInGrid: 2
    }

    searchInputHandler = (event) => {
        this.setState({searchInput: event.target.value});
    }

    searchHandler = (event) => {
        if (!this.state.imageList[this.state.searchInput]) {
            const url = constants.BASE_URL + "&text=" + this.state.searchInput;
            axios.get(url)
                .then(response => {
                    let imageList = {
                        ...this.state.imageList
                    }
                    imageList[this.state.searchInput] = response.data.photos.photo;
                    this.setState({imageList: imageList});
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    columnChangeHandler = (event) => {
        this.setState({columnsInGrid: event.target.value});
    }

    render () {
        let photogrid = null;
        if (this.state.imageList[this.state.searchInput]) {
            photogrid = <PhotoGrid images={this.state.imageList[this.state.searchInput]} columns={this.state.columnsInGrid}/>
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
                        <label>Choose columns in grid:</label><br/>
                        <select className={styles.GridDropDown} onChange={this.columnChangeHandler}>
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
