const db = require("../../config/db");


exports.makePhotoPrimary = async function (id) {
    //TODO
};

exports.removePhoto = async function (id) {
    //TODO
};

/**
 * Gets a photo from that database using the passed venue id and filename
 * @param id the venue id of the photo
 * @param filename the filename of the photo
 * @returns {Promise<*|undefined>}
 */
exports.getOnePhoto = async function (id, filename) {
    let queryString = "Select photo_description FROM VenuePhoto WHERE venue_id = ? AND photo_filename = ?";
    try {
        let photoRows = await db.getPool().query(queryString, [id, filename]);

        if (photoRows.length === 0) {
            return Promise.reject(new Error('Not Found'));
        }
        return Promise.resolve(photoRows[0]);
    } catch(err) {
        return Promise.reject(err);
    }
};

exports.addNewPhoto = async function () {
    //TODO
};

/**
 * Gets all categories out of the database
 * @returns {Promise<*|undefined>}
 */
exports.getAllCategories = async function () {
    let queryString = "Select * FROM VenueCategory";
    try {
        let categoryRows = await db.getPool().query(queryString);

        return Promise.resolve(categoryRows);
    } catch(err) {
        return Promise.reject(err);
    }
};

exports.updateVenue = async function (venueBody, id) {
    let queryString = "UPDATE TABLE Venue SET venue_name = ?, category_id = ?, city = ?, short_description = ?," +
        "long_description = ?, address = ?, latitude = ?, longitude = ? WHERE venue_id = ?";

    let values = [venueBody['venueName'], venueBody['categoryId'], venueBody['city'], venueBody['shortDescription'],
        venueBody['longDescription'], venueBody['address'], venueBody['latitude'], venueBody['longitude'], id];

    try {
        let result = await db.getPool().query(queryString, values);

        return Promise.resolve(result);
    } catch(err) {
        return Promise.reject(err);
    }
};

exports.getVenue = async function (id) {
    let queryString = "SELECT venue_name, admin_id, username, Venue.category_id, category_name, category_description, " +
        "city, short_description, long_description, date_added, address, latitude, longitude FROM Venue JOIN User ON " +
        "Venue.admin_id = User.user_id JOIN VenueCategory ON Venue.category_id = VenueCategory.category_id WHERE " +
        "Venue.venue_id = ?";

    let photoQueryString = "SELECT photo_filename, photo_description, is_primary FROM VenuePhoto WHERE venue_id = ?";

    try {
        let venueRows = await db.getPool().query(queryString, id);

        if (venueRows.length === 0) {
            return Promise.reject(new Error('Not Found'));
        } else {
            let photoRows = db.getPool().query(photoQueryString, venueRows[0]['admin_id']);
            return Promise.resolve(venueRows[0], photoRows);
        }
    } catch(err) {
        return Promise.reject(err);
    }
};

exports.addNewVenue = async function (venueBody) {
    if (venueBody['city'] === '') {
        return Promise.reject('No City');
    } else if (venueBody['latitude'] > 90.0) {
        return Promise.reject('Invalid latitude');
    } else if (venueBody['longitude'] < -180.0) {
        return Promise.reject('Invalid longitude');
    }
    let queryString = "INSERT INTO Venue (venue_name, admin_id, category_id, city, short_description, long_description, address, " +
        "latitude, longitude) VALUES (?, ?, ?, ? ,?, ?, ?, ?, ?)";

    let values = [venueBody['venueName'], 1, venueBody['categoryId'], venueBody['city'], venueBody['shortDescription'],
    venueBody['longDescription'], venueBody['address'], venueBody['latitude'], venueBody['longitude']];

    try {
        let result = await db.getPool().query(queryString, values);
        return Promise.resolve(result);
    } catch(err) {
        return Promise.reject(err);
    }
};

exports.getAllVenues = async function (startIndex, count, city, q, categoryId, minStarRating, maxCostRating, adminId, sortBy, reverseSort, myLatitude, myLongitude) {
    let queryString = "Select * FROM Venue";
    try {
        let venueRows = await db.getPool().query(queryString);

        return Promise.resolve(venueRows);
    } catch(err) {
        return Promise.reject(err);
    }
};


exports.getOneReview = async function (id) {
    let queryString = "Select review_author_id, username, review_body, star_rating, cost_rating, time_posted " +
        "FROM Review JOIN User ON review_author_id = user_id WHERE reviewed_venue_id = ?";
    try {

        let reviewRows = await db.getPool().query(queryString, id);
        console.log('beans');
        if (reviewRows.length === 0) {
            return Promise.reject(new Error('Not Found'));
        }
        return Promise.resolve(reviewRows[0]);
    } catch(err) {
        return Promise.reject(err);
    }
};


exports.saveReview = async function (id) {
    //TODO
};

