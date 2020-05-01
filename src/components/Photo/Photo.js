import React from 'react';
import { getImageUrl } from "../../utils";
import styles from './Photo.module.css';

const photo = (props) => {
    const farm = props.image.farm;
    const server = props.image.server;
    const id = props.image.id;
    const secret = props.image.secret;
    return (
        <li className={styles.ImageProduct}>
            <img src={getImageUrl(farm, server, id, secret)} alt="" width="200px" height="200px" />
        </li>
    );
}

export default photo;
