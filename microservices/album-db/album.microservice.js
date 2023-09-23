const mongo = require('mongodb');
const AlbumModel = require('./album.model');
const check = require('check-types');
const httpStatusCodes = require('http-status-codes').StatusCodes;

/**
 * @class AlbumDbMicroservice
 * @classdesc Album Database Microservice
 */
class AlbumDbMicroservice {
  /***************************************************************
   ********************* STANDARD METHODS ************************
   ***************************************************************/

  /**
   * @summary Create new document
   * @description Create and insert a new document in a collection.
   * @param {express.Request} req is the request of the operation
   * @param {express.Response} res is the response of the operation
   * @param {express.Next} next is the middleware to continue with code execution
   * @returns {Array} with created document
   */
  create = async (req, res, next) => {
    if (check.not.assigned(req.body) || check.not.object(req.body) || check.emptyObject(req.body)) {
      const error = new Error('A non-empty JSON body is mandatory.');
      next(error);
      return;
    }

    try {
      const album = new AlbumModel(req.body);
      const createdDocument = await album.save();

      res.status(httpStatusCodes.OK).send(createdDocument);
    } catch (error) {
      next(error);
      return;
    }
  }

  /**
   * @summary Find documents from a collection
   * @description Get documents
   * @param {express.Request} req is the request of the operation
   * @param {express.Response} res is the response of the operation
   * @param {express.Next} next is the middleware to continue with code execution
   * @returns {Array} with all documents matching the conditions
   */
  find = async (req, res, next) => {
    try {
      const findQuery = { _id: { $ne: null } };

      const findResult = await AlbumModel.find(findQuery).lean().exec();

      res.status(httpStatusCodes.OK).send(findResult);
    } catch (error) {
      next(error);
      return;
    }
  }

  /**
  * @summary Find document by id from a collection
  * @description Get document
  * @param {express.Request} req is the request of the operation
  * @param {express.Response} res is the response of the operation
  * @param {express.Next} next is the middleware to continue with code execution
  * @returns {Object} with document
  */
  findbyId = async (req, res, next) => {
    try {
      const findOneQuery = { _id: req.params.id };

      const findOneResult = await AlbumModel.findOne(findOneQuery);


      res.status(httpStatusCodes.OK).send(findOneResult);
    } catch (error) {
      next(error);
      return;
    }
  }

  /**
   * @summary Update a document
   * @description Update a document by id
   * @param {express.Request} req is the request of the operation
   * @param {express.Response} res is the response of the operation
   * @param {express.Next} next is the middleware to continue with code execution
   * @returns {Object} Empty object if the operation went well
   */
  updateById = async (req, res, next) => {
    if (check.not.assigned(req.body) || check.not.object(req.body) || check.emptyObject(req.body)) {
      const error = new Error('A non-empty JSON body is mandatory.');
      next(error);
      return;
    }

    try {
      const updateId = req.params.id;
      const updateData = req.body;

      await AlbumModel.findByIdAndUpdate(updateId, updateData);

      res.status(httpStatusCodes.OK).send({});


    } catch (error) {
      next(error);
      return;
    }
  }

  /**
   * @summary Delete a document
   * @description Delete a document by id
   * @param {express.Request} req is the request of the operation
   * @param {express.Response} res is the response of the operation
   * @param {express.Next} next is the middleware to continue with code execution
   * @returns {Object} Empty object if the operation went well
   */
  deleteById = async (req, res, next) => {



    try {
      const documentId = req.params.id;
      const documentQuery = { _id: documentId };

      await AlbumModel.findOneAndDelete(documentQuery);
      res.status(httpStatusCodes.OK).send({});

    } catch (error) {
      next(error);
      return;
    }
  }
  /**
    * @summary scores an album
    * @description Creates a rating for an album which is added to the ratings array
    * @param {express.Request} req is the request of the operation
    * @param {express.Response} res is the response of the operation
    * @param {express.Next} next is the middleware to continue with code execution
    * @returns {Object} Empty object if the operation went well
    */

  scoreAlbum = async (req, res, next) => {
    try {
      const albumId = req.params.id;
      const rating = req.body.rating;

      const updatedScore = await AlbumModel.findByIdAndUpdate(albumId, { $push: { ratings: rating } },
        { new: true })

      const totalRatings = updatedScore.ratings.length;
      const totalScore = updatedScore.ratings.reduce((acc, val) => acc + val, 0);
      const averageScore = totalScore / totalRatings;

      const updatedAlbum = await AlbumModel.findByIdAndUpdate(albumId, { $set: { score: averageScore } },
        { new: true });

      res.status(httpStatusCodes.OK).send(updatedAlbum);
    } catch (error) {

    }
  }
}

module.exports = AlbumDbMicroservice;
