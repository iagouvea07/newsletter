const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const request = require('request')

router.get('/', (req, res) =>{
    request('https://www.r7.com/', (err, response, r7) =>{
        var listR7 = []
        var paginaR7 = ''
        if(!err && res.statusCode === 200){
            let $$ = cheerio.load(r7)
            $$('h3').each(function(b){
                listR7.push(`${$$(this).html()}`)
            })
            while(listR7.length > 15){
                listR7.pop()
            }
            for(n = 0; n < listR7.length; n++){
            paginaR7 += listR7[n].replace('<a', '<a target="_blank"')
            }
            res.render('r7/r7', {paginaR7})
        }
    })
})

module.exports = router