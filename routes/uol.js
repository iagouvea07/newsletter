const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const request = require('request')

router.get('/', (req, res) =>{
    request('https://www.uol.com.br/', (err, response, uol) =>{
        var listUol = []
        var paginaUol = ''
        if(!err && res.statusCode === 200){
            let $ = cheerio.load(uol)
            $('.relatedList__container__item').each(function(a){
                listUol.push(`${$(this).html()}`)
            })
            while(listUol.length > 15){
                listUol.pop()
            }
            for(i = 0; i < listUol.length; i++){
                paginaUol += listUol[i].replace('<a', '<a target=_blank')
            }
            res.render('uol/uol', {paginaUol})
        }
    })
})

module.exports = router