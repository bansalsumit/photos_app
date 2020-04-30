import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import constants from '../../constants';
import axios from 'axios';
import Search from '../../components/UI/Search/Search';
import PhotoGrid from '../PhotoGrid/PhotoGrid';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: null,
            imageList: []
        }
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
        return (
            <Aux>
                <Search
                    searchInputHandler={this.searchInputHandler}
                    searchHandler={this.searchHandler}/>
                <PhotoGrid />
            </Aux>
        );
    }
}

export default Gallery;
