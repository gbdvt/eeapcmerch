import styles from './MultipleImageUplaod.module.css'
import React from 'react'

import ImageUploader from 'react-images-upload';
import Uploady from "@rpldy/uploady";
import UploadButton from  "@rpldy/upload-button";

const MultipleImageUplaod = (props) => {

    const onDrop = async (images, data) => {
        props.handleImageChange(images.map((value, index) => ({info: value, data: data[index]})))
    }

    return (
        <div>
            <h2>{props.label}</h2>
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                withPreview={true}
                withLabel={false}
                singleImage={props.single}
            />
        </div>
    )
}

export default MultipleImageUplaod