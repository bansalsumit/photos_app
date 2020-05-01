import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../Button/Button';
import styles from './Search.module.css'

const search = (props) => {
    return (
        <Aux>
            <Button clicked={props.searchHandler} btnType="SearchButton">search images</Button><br />
            <input onChange={props.searchInputHandler} className={styles.SearchInput}/>
        </Aux>
    );
};

export default search;
