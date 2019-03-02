const express = require('express')
const router = express.Router()
const uuid = require('uuid');

const Announcement = require('../../models/Announcement')

const AnnouncementArr = 
[
    new Announcement(1,'Check this product'),
    new Announcement(2,'new product is launched')
];

//As an Authorized User I can create an announcement 
router.post('/Announcement', (req, res) => 
{
    const announcement_id=req.body.announcement_id;
    const title = req.body.title;
    
    
    if (!announcement_id || typeof announcement_id !== 'number') 
        return res.status(404).send({err:'You must enter the Announcement ID and as an integer'});
    if (!title) 
        return res.status(404).send({err: 'You must enter a title'});

    const Created_Announcement = 
    {
        announcement_id,
        title,
        id: uuid.v4(),
    };

    AnnouncementArr.push(Created_Announcement)
    res.send(AnnouncementArr)
});

//As an Authorized User I can update an announcement
router.put('/UpdateAnnouncement/:id',(req,res) => 
{
    const isEntered = AnnouncementArr.some(Event => Announcement.announcement_id===parseInt(req.params.id));
    if(isEntered)
    {
        const announcementUpdated=req.body;
        AnnouncementArr.forEach(Announcement => 
        {
            if (Announcement.announcement_id===parseInt(req.params.id))
            {
                Announcement.title=announcementUpdated.title?announcementUpdated.name:Announcement.name;
                res.json({msg: 'The announcement is updated successfully', Announcement});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Nothing have changed'})  
    }
});
//As an Authorized User I can read announcements
router.get('/Announcement', (req, res) => res.json({ data : AnnouncementArr }))

module.exports = router;