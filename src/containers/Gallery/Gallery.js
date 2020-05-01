import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import constants from '../../constants';
import axios from 'axios';
import Search from '../../components/UI/Search/Search';
import PhotoGrid from '../PhotoGrid/PhotoGrid';
import styles from './Gallery.module.css';
import { scrollAreaAvailable, debounce, throttle, checkHttpStatus, parseJSON } from "../../utils";


class Gallery extends Component {
    state = {
        searchInput: null,
        imageList: {},
        columnsInGrid: 2,
        pageNumber: 1
    }

    componentDidMount() {
        /* Throttled scroll listener for infinite scrolling */
        window.onscroll = throttle(() => {
            if (scrollAreaAvailable()) return;
            this.scrollHandler();
        }, 1000);


		/* Debounced function for search based on input text to mimimize network request on every character typed */
		this.makeDebouncedSearch = debounce(() => {
			/* Save search query */
			this.state.queries.push(this.state.searchText);
			this.setState({ queries: this.state.queries }, this.updateLocalStorage());

			/* Make API call for the query */
			const url = constants.BASE_URL + "&text=" + this.state.searchText;
			fetch(url)
				.then(checkHttpStatus)
				.then(parseJSON)
				.then(resp => {
					this.setState({ imageList: resp.photos.photo });
				})
				.catch(err => {
					console.log(err);
				});
		}, 1000);
    }

    scrollHandler = (event) => {
        let url = constants.BASE_URL + "&text=" + this.state.searchInput + "&page=" + (this.state.pageNumber + 1);
		fetch(url)
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(resp => {
                let newArrayOfImages = [...this.state.imageList[this.state.searchInput], ...resp.photos.photo];
                let newImagesList = {...this.state.imageList}
                newImagesList[this.state.searchInput] = newArrayOfImages;
				this.setState({
					pageNumber: resp.photos.page,
					imageList: newImagesList
                });
			})
			.catch(err => {
				console.log(err);
			});
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


	componentWillUnmount() {
		// Remove the listener for cleanup
		window.onscroll = undefined;
	}
}

export default Gallery;
