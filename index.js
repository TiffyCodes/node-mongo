const MongoClient = require('mongodb').MongoClient;
//will act as a client for the Mongo server, requires mongodb node driver, and from this the mongoclient object (we requiered from it)
const assert = require('assert').strict;
const dboper = require('./operations');
//dboper is short for db operation, we are using it to get access to the methods under opertaions.js

//to set up a connection to the mongodb server
const url = 'mongodb://localhost:27017/';
//this is the port # in which the mongodb server is running
//give the name of the db we want to connect to
const dbname = 'nucampsite';

//to access the server using these configs- must connect
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//above the MongoClient.connect has these arguments, and the last one is a CB fx with the parameters err onj and client (and obj which we will use to access the db on the const db=client.db line) and returns this
    //assert allows you to perform various checks     
    assert.strictEqual(err, null);
    //if err ==== null then this assert will fail and throw an error and terminate the entire applciation; if not (so err does have a null value), it will move on

    console.log('Connected correctly to server (MongoDB)');

    const db = client.db(dbname);
    //we set it above to nucampsite, so we will connect to this

    //first delete what's there and then insert a doc, and then list the docs in the collection using the find method (see your notes for week II)
    //you wouldn't do this normally, but this helps you so you don't have leftover docs from testing while learning

    //we use DROP in DB's versus DELETE
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        //you will assert that the error is not null, if that is true then we will continue on
        console.log('Dropped Collection', result);

        //**REMOVED BELOW SINCE NOW DOING THRU DBOPER module above **then recreate campsites and get access to it by setting const collection to below
        // const collection = db.collection('campsites');

        // now will insert a doc
        // collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        //we are CALLING dboper
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 
        //we are defining this fx
        'campsites', result => {
        
        // (err, result) => {
        //     assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);
            // //ops is a property short for operations, depending on the method it can contain diff values, for insert.one it will contain an array of the doc that was inserted
            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);
            
            dboper.updateDocument(db, { name: 'Breadcrumb Trail Campground' }, 
            { description: "Updated Test Description"}, 'campsites', 
            result => {
                console.log('Updated Document Count:',  result.result.nModified);

                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents:', docs);

                    dboper.removeDocument(db, { name: "Breadcrumb trail Campground"},
                    'campsites', result => {
                        console.log('Deleted Document Count:', result.deletedCount);
                        client.close();
                    });
                });
            });
            //we are sking it to look for the doc "Breadcrump Trail".. and then update it with updated test descrip.
            
            
            // //now print to the console all docs 
            // collection.find().toArray((err, docs) => {
            //     //toArray will convert the docs to an array of obj so we can console.log it
            //     assert.strictEqual(err, null);
            //     console.log('Found Documents:', docs);

                // client.close();
            //     //above will then close the client's connection to the db server
            });
            
        });
    });

});

//we're using CB fx's like this bc we're using asynchronous ops, when we're communicating between the node app here and the MongoDB server, it's not async.  It takes time for that comm to happen, no matter how small.  But the CB nesting we are doing isn't necessarily what we want to do but we'll talk about it later
