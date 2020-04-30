import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../Button/Button';

const search = (props) => {
    return (
        <Aux>
            <input onChange={props.searchInputHandler}/>
            <Button clicked={props.searchHandler}>Search</Button>
        </Aux>
    );
};

export default search;
