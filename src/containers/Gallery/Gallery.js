import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Search from '../../components/UI/Search/Search';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: null
        }
    }

    searchInputHandler = (event) => {
        this.setState({searchInput: event.target.value});
    }

    searchHandler = (event) => {
        console.log(this.state.searchInput);
    }

    render () {
        return (
            <Aux>
                <Search
                    searchInputHandler={this.searchInputHandler}
                    searchHandler={this.searchHandler}/>
            </Aux>
        );
    }
}

export default Gallery;
