const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const request = require('request')

router.get('/', (req, res) =>{
    request('https://www.cnnbrasil.com.br/', (err, response, cnn) =>{
        var listCNN = []
        var paginaCNN = ''
        if(!err && res.statusCode === 200){
            let $$ = cheerio.load(cnn)
            $$('.home__post').each(function(b){
                $$('li').each(function(c) {
                    listCNN.push(`${$$(this).html()}`)
                })
            })
            listCNN.splice(0, 30)
            while(listCNN.length > 15){
                listCNN.pop()
            }
            for(n = 0; n < listCNN.length; n++){
                paginaCNN += listCNN[n].replace('<a', '<a target="_blank"')
            }
            res.render('cnn/cnn', {paginaCNN})
        }
    })
})

module.exports = router