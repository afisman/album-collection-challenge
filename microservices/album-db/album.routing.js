const express = require('express');
const AlbumDbMicroservice = require('./album.microservice');
const albumDbMicroservice = new AlbumDbMicroservice();

const albumDbRouter = express.Router();

albumDbRouter.use(express.json({ limit: '50mb' }));

// CREATE
albumDbRouter.post('/create',
  (req, res, next) => {
    albumDbMicroservice.create(req, res, next);
  });

// READ 
//ALL
albumDbRouter.get('/',
  (req, res, next) => {
    albumDbMicroservice.find(req, res, next);
  });
//BY GENRE
albumDbRouter.get('/search/:genre', (req, res, next) => {
  albumDbMicroservice.findByGenre(req, res, next)
})
//BY TYPED STRING
albumDbRouter.get('/searchBy/:keyWord', (req, res, next) => {
  albumDbMicroservice.searchByKeyWord(req, res, next)
})


// UPDATE
//GET
albumDbRouter.get('/update/:id',
  (req, res, next) => {
    albumDbMicroservice.findById(req, res, next);
  });
//PUT
albumDbRouter.put('/update/:id',
  (req, res, next) => {
    albumDbMicroservice.updateById(req, res, next);
  });

// DELETE
albumDbRouter.delete('/delete/:id',
  (req, res, next) => {
    albumDbMicroservice.deleteById(req, res, next);
  });

//SCORE
albumDbRouter.put('/score/:id',
  (req, res, next) => {
    albumDbMicroservice.scoreAlbum(req, res, next);
  });

module.exports = albumDbRouter;