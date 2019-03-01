const uuid = require('uuid')

class PortalLibrary
{
    constructor(portalLibrary_id,title, details)
    {
        this.portalLibrary_id = portalLibrary_id;
        this.title=title;
        this.details=details;
        this.id = uuid.v4();
    }
}

module.exports=PortalLibrary;