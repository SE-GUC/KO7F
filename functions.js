const axios= require('axios')

const functions={
    getevents: async()=>{
        return axios({
        method: 'get',
        url:'https://mun-website.herokuapp.com/api/Event/'
        })
    },
    Rateevents: async(id)=>{
        return axios({
            method:'post',
            url:'https://mun-website.herokuapp.com/api/Event/RateEvents/'+""+id
        })
    }
}

module.exports= functions;