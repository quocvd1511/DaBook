module.exports = {
    multipleMongooseToObject: function (mongooses){
        return mongooses.map((mongoose => mongoose.toObject()));
    },

    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    // mongooseToObject = (doc) => { if (doc == null){ return null; } return doc.toObject(); 

    }
}