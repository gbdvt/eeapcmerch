import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import styles from './NewItem.module.css'

import SimpleTextInput from '../../../../Components/Forms/Input/SimpleTextInput/SimpleTextInput'
import SimpleButton from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'
import TextArea from '../../../../Components/Forms/Input/TextArea/TextArea'

import MultipleImageUplaod from './MultipleImageUplaod/MultipleImageUplaod'
import StockMatrix from '../../../../Components/Forms/StockMatrix/StockMatrix'

import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";


const NewItem = (props) => {

    const [title, setTitle] = useState("")
    const [thumb, setThumb] = useState("")
    const [desc, setDesc] = useState("")
    const [sizes, setSizes] = useState("")
    // const [images, setImages] = useState("")
    const [price, setPrice] = useState("")
    const [status, setStatus] = useState(undefined)
    const [images, setImages] = useState({})
    const [colors, setColors] = useState("")
    const [stock, setStock] = useState({})

    const history = useHistory()

    const RequestSave = async () => {
        setStatus('loading')
        const response = await axios.post('/api/items/saveItem', {
            title,
            thumbnail: thumb,
            description: desc,
            price: parseInt(Math.ceil(price * 100)),
            sizes: sizes.split(', ').map(size => size.trim()),
            images: Object.keys(images).map(key => images[key]),
            stock,
            colors: colors.split(', ').map(size => size.trim())
        }, {
            headers: {
                authorization: props.redux.auth.token
            }
        }).catch(e => {
            setStatus(undefined)
            toast.error('Save unsuccessful, check the inputs and try again')
            console.log(e)
        })
        if (response && response.status === 200) {
            setStatus(undefined)
            toast.success('Saved successfuly', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            history.push('/user')
        }
    }

    const uploadImage = async (image) => {

        const response = await axios.post('/api/media/upload', { image }, {
            headers: {
                authorization: props.redux.auth.token
            }
        }
        ).catch((e) => {
            toast.error(`An error occurred: ${e.response.data} `)
        })

        if (response && response.status === 200) {

            return response.data
        }
    }

    const handleImageChange = async (newImages) => {
        let newImageState = {}
        await newImages.forEach(async img => {
            if (images[img.info.name]) {
                newImageState[img.info.name] = images[img.info.name]
            } else {
                const url = await uploadImage(img.data)
                newImageState[img.info.name] = url
            }
        });
        setImages(newImageState)
    }

    const handleThumbChange = async (newThumb) => {
        if (newThumb != []) {
            const url = await uploadImage(newThumb[0].data)
            setThumb(url)
        }
    }


    return (
        <div>
            <form className={styles.NewForm}>
                <SimpleTextInput value={title} onChange={setTitle} placeholder={"title"} label={"Title:"} />
                <TextArea value={desc} onChange={setDesc} placeholder={"description"} label={"Description:"} />
                {/* <SimpleTextInput value={thumb} onChange={setThumb} placeholder={"url of the image of the thumbnail"} label={"Thumbnail:"} />
                <p>For now upload the images into a service like <a href={'https://es.imgbb.com/'}>ImgBB</a></p> */}
                <MultipleImageUplaod label={'Thumbnail Upload'} single={true} handleImageChange={handleThumbChange} />
                <SimpleTextInput value={price} onChange={setPrice} placeholder={"The price of the item, a number with 2 decimals."} label={"Price:"} />
                <TextArea value={sizes} onChange={setSizes} placeholder={"Enter the sizes, separated by a comma and a space ', '"} label={"Sizes:"} />
                <TextArea value={colors} onChange={setColors} placeholder={"Enter the sizes, separated by a comma and a space ', '"} label={"Colors:"} />
                <MultipleImageUplaod label={'Image Upload'} single={false} handleImageChange={handleImageChange} />
                <StockMatrix stock={stock} setStock={setStock} sizes={sizes.split(', ').map(size => size.trim()).filter(el => el != "")} colors={colors.split(', ').map(size => size.trim()).filter(el => el != "")} />
                <SimpleButton disabled={status == "loading"} submit={RequestSave} >Save   <FontAwesomeIcon icon={faCloudUploadAlt} /></SimpleButton>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(NewItem)