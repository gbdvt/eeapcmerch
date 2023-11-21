import React from 'react'
import ImageLink from '../../Components/Elements/LinkOnImage/Link'
import styles from './About.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faEmail } from "@fortawesome/free-solid-svg-icons";

const instaImageURL = "https://wearesocial-net.s3.amazonaws.com/sg/wp-content/uploads/sites/9/2020/10/instagram-logo.jpg"
const instaURL = 'https://www.instagram.com/dikaasbrand'
const mainImage = "https://www.teenvio.com/es/wp-content/uploads/2018/03/inboud-marketing-email-marketing.jpg"

const About = () => {
    return (
        <div>
            <div className={styles.textContainier}>
                <h3>Nuestra página:</h3>
                <p>Para comenzar con el proyecto, hemos elegido camisetas hechas 100% de algodón de gramaje de 150 gr/m² . Actualmente, tenemos disponible únicamente el color blanco en todos los diseños, y en manga corta. </p>
                <p></p>
            </div>
            <div className={styles.textContainier}>
                <h3>Cual es el proceso de compra?</h3>
                <p>Como forma de pago, tenéis a vuestra disposición dos opciones. Al comprar un artículo en nuestra web, podréis tanto reservarla para recogerla y pagarla en mano, como rellenar de manera segura los datos necesarios para poder pagar con tarjeta de crédito, y de esta manera, se podrán realizar envíos.</p>
            </div>
            <div className={styles.textContainier}>
                <h3>Los diseños:</h3>
                <p>Los diseños de nuestras camisetas son diseñados a mano por nuestro equipo, por lo tanto, tenemos libertad para diseñar lo que más os guste. ¡Podéis contactar con nosotros si tenéis alguna idea y estaremos abiertos a probar cosas nuevas! </p>
            </div>
            <div className={styles.textContainier}>
                <h3>Las tallas:</h3>
                <img src={'https://i.ibb.co/Vw8dXt2/db69e276-cf06-4397-ac4e-7c6856cf0ab5.jpg'} />
            </div>
            <ImageLink image={instaImageURL} link={instaURL} external={true}>Follow us on Instagram! <FontAwesomeIcon icon={faExternalLinkAlt} /></ImageLink>
            <ImageLink image={mainImage} link={"mailto:dikaasbrand@gmail.com"} external={true}>Envianos un correo <FontAwesomeIcon icon={faExternalLinkAlt} /></ImageLink>
        </div>
    )
}

export default About