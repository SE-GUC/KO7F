const uuid = require('uuid')
 class FAQs {
    



    constructor(FAQ_id, content)
    {
        this.FAQ_id = FAQ_id;
        this.reply='';
        this.content=content;
        this.id = uuid.v4();
    }
}

module.exports = FAQs;
