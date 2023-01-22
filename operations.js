// const assert = require('assert').strict;
//**No longer need above since using promise-based approach */
//4 methods to insert, find, remove, update docs and then export each
// exports.insertDocument = (db, document, collection, callback) => {
exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    //expecting that the collection argument passed in will be a string like campsites and then use it to obtain a ref to the collection named campsites, so we can use the coll const coll to interact with a collection

    //*** REPLACING WITH PROMISED BASED APPROACH, removed callback from the argument list */
    // coll.insertOne(document, (err, result) => {
    //     assert.strictEqual(err, null);
    //     callback(result);
    //     //the above is a CB that is defined elsewhere where a call to this insert document is made, and we are delivering the result to this CB to do whatever it is called to do
    // });
    //these methods are a part of the mongoDB API, go to the doc for details

    return coll.insertOne(document);
};

// exports.findDocuments = (db, collection, callback) => {
exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);

    //*** REPLACING WITH PROMISED BASED APPROACH, removed callback from the argument list */
    // coll.find().toArray((err, docs) => {
    //     //empty find means we want to find all docs in this collection, then use toArray to put them into an Array
    //     assert.strictEqual(err, null);
    //     //if no error, so err===null then we will do the CB
    //     callback(docs);
    // });

    return coll.find().toArray();
};

// exports.removeDocument = (db, document, collection, callback) => {
exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);

    //*** REPLACING WITH PROMISED BASED APPROACH, removed callback from the argument list */
    // coll.deleteOne(document, (err, result) => {
    //     //the CB will have the err and result params to check the err with an assert
    //     assert.strictEqual(err, null);
    //     callback(result);
    // });
    return coll.deleteOne(document);
};

// exports.updateDocument = (db, document, update, collection, callback) => {
exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);

        //*** REPLACING WITH PROMISED BASED APPROACH, removed callback from the argument list */
    // coll.updateOne(document, { $set: update }, null, (err, result) => {
    //     //using an update operator to pass to mongodb $set; null for third is for optional configs since we don't need it
    
    // assert.strictEqual(err, null);
    // callback(result);
    // });
    return coll.updateOne(document, { $set: update }, null);
};