import React from 'react'
import styles from './FrontPage.module.css'
import { LoremIpsum } from 'react-lorem-ipsum';

import FrontImage from '../../Components/ImageHolder/ImageHolder'
import ImageLink from '../../Components/Elements/LinkOnImage/Link'
import ImageGallery from 'react-image-gallery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faStore } from "@fortawesome/free-solid-svg-icons";

import images from './images'

const storeImage = 'https://image.freepik.com/foto-gratis/fila-camisetas-colores-tienda_117930-230.jpg'
const aboutImage = 'https://image.freepik.com/vector-gratis/papel-tapiz-fondo-poligono-geometrico-abstracto-forma-triangular-polly-baja_206846-1103.jpg'


const FrontPage = () => {
    return (
        <div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Dikaas</h1>
            </div>
            <div className={styles.textContainer}>
                <p>¡Bienvenidos a todos a la web oficial de dikaas, una tienda online donde podrás comprar camisetas con diseños propios y anillos hechos a mano! Tendrás la opción de poder elegir tu diseño favorito a un precio asequible.</p>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.galleryContainer}>
                    <h3>Algunos de nuestros diseños:</h3>
                    <ImageGallery items={images} showThumbnails={false} />
                </div>
            </div>
            <ImageLink external={false} link={'/store'} image={storeImage}>Compra nuestras camisetas ya! <FontAwesomeIcon icon={faStore} /></ImageLink>
            <ImageLink external={false} link={'/about'} image={aboutImage}>Aprende mas sobre nosotros <FontAwesomeIcon icon={faInfoCircle} /></ImageLink>
        </div>
    )
}

export default FrontPage