const db = require('./index');

// Build query models
const savePhoto = (imageData, callback) => {
  var queryString = 'INSERT INTO photos (image_url, title, explanation, date) VALUES (?, ?, ?, ?);';
  console.log("here is the imageData", imageData);
  var values = [imageData.image, imageData.title, imageData.explanation, imageData.date];
  db.query(
    queryString,
    values, // []
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(results);
        callback(null, results);
      }
    });
};

module.exports = {
  savePhoto,
};