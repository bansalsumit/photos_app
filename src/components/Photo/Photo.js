import React from 'react';
import { getImageUrl } from "../../utils";

const photo = (props) => {
    const farm = props.image.farm;
    const server = props.image.server;
    const id = props.image.id;
    const secret = props.image.secret;
    return (
        <li>
            <img src={getImageUrl(farm, server, id, secret)} alt="" width="300px" />
        </li>
    );
}

export default photo;
