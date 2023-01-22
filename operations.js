const assert = require('assert').strict;
//4 methods to insert, find, remove, update docs and then export each
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    //expecting that the collection argument passed in will be a string like campsites and then use it to obtain a ref to the collection named campsites, so we can use the coll const coll to interact with a collection

    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
        //the above is a CB that is defined elsewhere where a call to this insert document is made, and we are delivering the result to this CB to do whatever it is called to do
    });
    //these methods are a part of the mongoDB API, go to the doc for details
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);

    coll.find().toArray((err, docs) => {
        //empty find means we want to find all docs in this collection, then use toArray to put them into an Array
        assert.strictEqual(err, null);
        //if no error, so err===null then we will do the CB
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    coll.deleteOne(document, (err, result) => {
        //the CB will have the err and result params to check the err with an assert
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);

    coll.updateOne(document, { $set: update }, null, (err, result) => {
        //using an update operator to pass to mongodb $set; null for third is for optional configs since we don't need it
    
    assert.strictEqual(err, null);
    callback(result);
    });
    
};