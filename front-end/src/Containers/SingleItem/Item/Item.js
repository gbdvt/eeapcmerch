import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Item.module.css'

import ImageGallery from 'react-image-gallery';
import { toast } from 'react-toastify'
import OrderOptions from './OrderOptions/OrderOptions'
import { Link } from 'react-router-dom'

import { AddItem } from '../../../Utils/Redux/Actions/Cart'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import ImageLink from '../../../Components/Elements/LinkOnImage/Link'

const aboutImage = 'https://image.freepik.com/vector-gratis/papel-tapiz-fondo-poligono-geometrico-abstracto-forma-triangular-polly-baja_206846-1103.jpg'

const Item = ({ data, redux, dispatch }) => {

    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [status, setStatus] = useState(undefined)
    const history = useHistory()


    const AddToCart = () => {
        if (size == "") {
            toast.error("Please choose a size")
        } else if (color == "") {
            toast.error("Please choose a size")
        } else if (!redux.auth.isLoggedIn) {
            toast.error("Please log in before adding items to cart")
            history.push('/auth/login')
        } else {
            dispatch(AddItem({ item: data._id, size: size.value, price: data.price, color: color.value }))
            toast.success("Item added to cart")
            history.push('/user/cart')
        }
    }

    const adminOptions = () => (
        <Link to={`/user/modStock/${data._id}`} >
            <div className={styles.adminOption}>
                <h2>Modify this item</h2>
            </div>
        </Link>
    )

    return (
        <div>
            {redux.auth.isAdmin && adminOptions()}
            <div className={styles.imageContainer}>
                <ImageGallery showFullscreenButton={false} autoPlay={true} additionalClass={styles.galery} showThumbnails={false} items={data.images.map(image => ({ original: image }))} />
            </div>
            <div className={styles.outerContainer}>
                <div>
                    <div className={styles.infoContainer}>
                        <h3>Title:</h3>
                        <h2>{data.title}</h2>
                    </div>
                    <div className={styles.infoContainer}>
                        <h3>Description:</h3>
                        <h2>{data.description}</h2>
                    </div>
                    <div className={styles.infoContainer}>
                        <h3>Price:</h3>
                        <h2>{`${parseFloat(data.price / 100)} €`}</h2>
                    </div>
                </div>
                <ImageLink external={false} link={'/about'} image={aboutImage}><p className={styles.imageLinkText}>Aprende mas sobre el proceso de compra <FontAwesomeIcon icon={faInfoCircle} /></p></ImageLink>
                <div className={styles.formContainer}>
                    <h1 className={styles.orderButton}>Order Now:</h1>
                    <OrderOptions AddToCart={AddToCart} status={status} data={data} setSize={setSize} size={size} color={color} setColor={setColor} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Item)