var express = require('express');
var router = express.Router();
import multer from 'multer'
import { addImages, updateImages } from '../controllers/imageController';

const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

router.post('/crear', upload.array('image'), async function (req, res) {
    const images = req.files
    const prodId = req.body.prodId
    console.log(images)
    const imgToUpload = []
    images.forEach((image) => {
        imgToUpload.push({productId: Number(prodId), url: image.filename})
    })
    const uploaded = await addImages(imgToUpload)
    if (uploaded != 'Images not uploaded')
        res.status(201).send()
    else
        res.status(400).send()
})


router.put('/actualizar', upload.array('image'), async function (req, res) {
    const images = req.files
    const prodId = req.body.prodId
    console.log(images)
    const imgToUpload = []
    images.forEach((image) => {
        imgToUpload.push({productId: Number(prodId), url: image.filename})
    })
    const uploaded = await updateImages(imgToUpload)
    if (uploaded != 'Images not uploaded')
        res.status(200).send()
    else
        res.status(400).send()
})

module.exports = router;