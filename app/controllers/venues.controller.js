const Venues = require('../models/venues.model');

exports.viewAll = async function (req, res) {
    try {
        let startIndex = req.query.startIndex;
        let count = req.query.count;
        let city = req.query.city;
        let q = req.query.q;
        let categoryId = req.query.categoryId;
        let minStarRating = req.query.minStarRating;
        let maxCostRating = req.query.maxCostRating;
        let adminId = req.query.adminId;
        let sortBy = req.query.sortBy;
        let reverseSort = req.query.reverseSort;
        let myLatitude = req.query.myLatitude;
        let myLongitude = req.query.myLongitude;


        let result = await Venues.getAllVenues(startIndex, count, city, q, categoryId, minStarRating, maxCostRating, adminId, sortBy, reverseSort, myLatitude, myLongitude);
        res.statusMessage = 'OK';
        res.status(200)
            .json(result)
            .send();
    } catch (err) {
        if (!err.hasBeenLogged) console.error(err);
        res.statusMessage = 'Bad Request';
        res.status(400)
            .send();
    }
};

exports.addNew = async function (req, res) {
    try {
        await Venues.addNewVenue();
        res.statusMessage = 'Created';
        res.status(201)
            .send();
    } catch (err) {
        // #TODO Create error responses - see spec
    }
};

exports.getOne = async function (req, res) {
    try {
        await Venues.getVenue(req.params.id, function(err, result) {
            if (err) {
                res.statusMessage = 'Not Found';
                res.status(404).send(err);
            } else {
                res.statusMessage = 'OK';
                res.status(200)
                    .json(result[0]);
            }
        });

    } catch (err) {
        if (!err.hasBeenLogged) console.error(err);

    }
};

exports.updateDetails = async function (req, res) {
    try {
        await Venues.updateVenue();
        res.statusMessage = 'OK';
        res.status(200)
            .send();
    } catch (err) {
        // #TODO Create error responses - see spec
    }
};

exports.getCategories = async function (req, res) {
    try {
        let result = await Venues.getAllCategories();
        res.statusMessage = 'OK';
        res.status(200)
            .json(result[0])
            .send();
    } catch (err) {
        // #TODO Create error responses
    }
};

exports.addPhoto = async function (req, res) {
    try {
        await Venues.addNewPhoto();
        res.statusMessage = 'OK';
        res.status(201)
            .send();
    } catch (err) {
        // #TODO Create error responses
    }
};


exports.getPhoto = async function (req, res) {
    try {
        let id = req.query.id;
        let filename = req.query.photoFilename;

        let result = await Venues.getOnePhoto(id, filename);
        res.statusMessage = 'OK';
        res.status(200)
            .send();
    } catch (err) {
        console.error(err);
        res.statusMessage = 'Not Found';
        res.status(404)
            .send();
    }
};


exports.deletePhoto = async function (req, res) {
    try {
        await Venues.removePhoto(req.params.id);
        res.statusMessage = 'OK';
        res.status(200)
            .send();
    } catch (err) {
        console.error(err);
        // TODO error messages
    }
};


exports.setPrimaryPhoto = async function (req, res) {
    try {
        await Venues.makePhotoPrimary(req.params.id);
        res.statusMessage = 'OK';
        res.status(200)
            .send();
    } catch (err) {
        console.error(err);
        // TODO error messages
    }
};


exports.getReview = async function (req, res) {
    try {
        let result = await Venues.getReview(req.params.id);
        res.statusMessage = 'OK';
        res.status(200)
            .json(result)
            .send();
    } catch (err) {
        console.error(err);
        // TODO error messages
    }
};


exports.addReview = async function (req, res) {
    try {
        await Venues.saveReview(req.query.id);
        res.statusMessage = 'OK';
        res.status(200)
            .send();
    } catch (err) {
        console.error(err);
        // TODO error messages
    }
};


