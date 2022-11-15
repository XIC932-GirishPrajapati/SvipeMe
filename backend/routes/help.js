const {v4:uuid4}=require('uuid');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { memoryStorage } = require('multer')
const storage = memoryStorage()
const upload = multer({ storage })
const uploadFile = require('../Middleware/aws')



router.get('/',(req, res) => {
    res.json({ status:'200'})
})
router.post('/', upload.single('myfile'), async (req, res) => {
    const filename = uuid4();
    const bucketname = 'locus-files-2';
    const file = req.file.buffer
    // link is the returned object URL from S3
    const link = await uploadFile(filename, bucketname, file)
    
    res.json({fileLink: link})
})

module.exports = router;
   


