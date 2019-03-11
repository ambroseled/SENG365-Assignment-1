const Users = require('../models/users.model');

exports.getUser = async function (req, res) {
    await Users.getOneUser(req.params.id)
        .then((userRow) => {
                // Below blocked used when not authenticated
            //TODO different result when authenticated
                let toDisplay =
                    {
                        "username" : userRow['username'],
                        "givenName" : userRow['given_name'],
                        "familyName" : userRow['family_name']
                };

                res.statusMessage = 'OK';
                res.json(toDisplay);
            },
            (err) => {
                if (err.message === 'Not Found') {
                    res.statusMessage = 'Not Found';
                    res.status(404).send('User: ' + req.params.id + ' Not Found');
                }
            }
        ).catch(
            (error) => {
                console.error(error);
                res.statusMessage = 'Internal Server Error';
                res.status(500).send('Internal Server Error');
            }
        );
};

exports.getReviews = async function (req, res) {
    await Users.getAllReviews(req.params.id)
        .then((reviewRows) => {

            let  reviews = [];
            if (reviewRows) {
                for (let i = 0; i < reviewRows.length; i++) {
                    reviews.push(
                        {
                            "reviewAuthor":
                                {
                                    "userID": reviewRows[i]['review_author_id'],
                                    "username": reviewRows[i]['username']
                                },
                            "reviewBody": reviewRows[i]['review_body'],
                            "starRating": reviewRows[i]['star_rating'],
                            "costRating": reviewRows[i]['cost_rating'],
                            "timePosted": reviewRows[i]['time_posted'],
                            "venue" :
                                {
                                    "venueId" : reviewRows['venue_id'],
                                    "venueName" : reviewRows['venue_name'],
                                    "categoryName" : reviewRows['category_name'],
                                    "city" : reviewRows['city'],
                                    "shortDescription" : reviewRows['short_description'],
                                    "primaryPhoto" : reviewRows['photo_filename']
                                }
                        }
                    )
                }
            }
            res.statusMessage = 'OK';
            res.send(reviews);
            },
            (err) => {
                if (err.message === 'Not Found') {
                    res.statusMessage = 'Not Found';
                    res.status(404).send('Review: ' + req.params.id + ' Not Found');
                }
            }
        ).catch(
            (error) => {
                console.error(error);
                res.statusMessage = 'Internal Server Error';
                res.status(500).send('Internal Server Error');
            }
        );
};

exports.register = async function(req, res) {
    //TODO
};

exports.updateDetails = async function(req, res) {
    //TODO
};

exports.getPhoto = async function(req, res) {
    await Users.getOnePhoto(req.params.id, req.params.photoFileName)
        .then((photoRow) => {
                res.statusMessage = 'OK';
                res.send(photoRow);
            },
            (err) => {
                if (err.message === 'Not Found') {
                    res.statusMessage = 'Not Found';
                    res.status(404).send('Photo: ' + req.params.photoFileName + ' Not Found');
                }
            }
        ).catch(
            (error) => {
                console.error(error);
                res.statusMessage = 'Internal Server Error';
                res.status(500).send('Internal Server Error');
            }
        );
};

exports.setPhoto = async function(req, res) {
    //TODO
};

exports.removePhoto = async function(req, res) {
    //TODO
};

exports.logout = async function(req, res) {
    //TODO
};

exports.login = async function(req, res) {
    //TODO
};