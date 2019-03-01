const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const PortalLibrary = require('../../models/PortalLibrary')

const PortalLibraryArr = 
[
    new PortalLibrary(1,'1st Meeting', 'We agreed on ...'),
    new PortalLibrary(2,'2nd Meeting', 'We decided to ...')
];

//As an Authorized User I should be able to read the PortalLibrary
router.get('/PortalLibrary', (req, res) => res.json({ data : PortalLibraryArr }))

//As an Authorized User I should be able to add to the PortalLibrary
router.post('/PortalLibrary', (req, res) =>
{
    const portalLibrary_id=req.body.portalLibrary_id;
    const title = req.body.title;
    const details=req.body.details;
    
    if (!portalLibrary_id || typeof portalLibrary_id !== 'number') 
        return res.status(404).send({err:'You must enter the PortalLibrary ID and as an integer'});
    if (!title) 
        return res.status(404).send({err: 'You must enter a title'});
    if (!details) 
        return res.status(404).send({err: 'You must enter details'});

    const Created_PortalLibrary = 
    {
        portalLibrary_id,
        title,
        details,
        id: uuid.v4(),
    };

    PortalLibraryArr.push(Created_PortalLibrary)
    res.send(PortalLibraryArr)
});

module.exports = router