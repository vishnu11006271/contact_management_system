let app = require("express")();
let port = 3001;
let parser = require("body-parser");
let cors = require("cors");
let mongoClient = require("mongodb").MongoClient;
let dbUrl = "mongodb://localhost:27017";

// run the server
app.listen(port, () => console.log(`Server is running at ${port}`));

// body-parser and cors
app.use(parser.json());
app.use(cors());

// retreiving all the records /user
app.get("/profiles", (request, response) => {
    mongoClient.connect(dbUrl, {useNewUrlParser:true}, (err, client) => {
        if(err) {
            throw err;
        } else {
            //use the database name
            let db = client.db("contactdb");
            // retrieve all the documents
            let documentsCursor = db.collection("profiles").find();
            let user = [];
            // forEach is used to iterate the document, forEach(iteration, endOfIteration)
            documentsCursor.forEach((doc, err) => {
                if(err) throw err;
                user.push(doc); 
            }, () => {
                client.close();
                response.json(user);
            });
        }
    });
});
// storing the records /user
app.post("/profiles", (request, response) => {
    mongoClient.connect(dbUrl, {useNewUrlParser:true}, (err, client) => {
        if(err) throw err;
        let data = request.body;
        let db = client.db("contactdb");
        let userDoc;
        function generateId(sequence_id){
            let updatedDoc = db.collection("counters").findOneAndUpdate({_id: sequence_id},{$inc: {sequence_value: 1}}, (err, result) => {
                if(err) throw err;
                userDoc = result.value?.sequence_value +1;
                console.log(userDoc);
                data["_id"]= userDoc;
                let newObj = Object.assign({},data, {_id: userDoc});
                console.log(newObj);
                db.collection("profiles").insertOne(newObj, (err, res) => {
                    
                    if(err) {
                        response.status(404).json({"message":"User failed to store"});
                    }
                    else {
                        client.close();
                        response.status(201).json(res);
                    } 
                });
                return userDoc;
            });    
        }
        generateId("profile_id");
    });
});

app.post("/profiles/:id", (request, response) => {
    mongoClient.connect(dbUrl, {useNewUrlParser:true}, (err, client) => {
        if(err) throw err;
        let id = parseInt(request.params.id);
        let data = request.body;
        let db = client.db("contactdb");
        let userDoc;
        function generateId(sequence_id){
            let updatedDoc = db.collection("counters").findOneAndUpdate({_id: sequence_id},{$inc: {sequence_value: 1}}, (err, result) => {
                if(err) throw err;
                userDoc = result.value?.sequence_value +1;
                console.log(userDoc);
                data["_id"]= userDoc;
                let newObj = Object.assign({},data, {_id: userDoc});
                console.log(newObj);
                db.collection("profiles").findOneAndUpdate({_id:id},{$push: {mycontacts: newObj}}, (err, res) => {
                    
                    if(err) {
                        response.status(404).json({"message":"User failed to add contact"});
                    }
                    else {
                        client.close();
                        response.status(201).json(res);
                    } 
                });
                return userDoc;
            });    
        }
        generateId("contact_id");
    });
});

//to fetch user by id
app.get("/profiles/:name/:password",(req,res)=>{
    mongoClient.connect(dbUrl,{useNewUrlParser:true},(err,client)=>{
        if(err) throw err;
        let name1 = req.params.name;
        let password1 = req.params.password;
        let db = client.db('contactdb');
        let document=db.collection("profiles").find({name:name1, password: password1});
        let user=[];
        document.forEach((doc,err)=>{
            if(err)throw err;
            user.push(doc);
        },()=>{
            client.close();
            if(user.length == 0){
                res.json({msg:`User with id ${name1} not found !!`});
            }else{
                res.json(user);
            }
        })
    })
});

//to fetch user by id
app.get("/profiles/:id",(req,res)=>{
    mongoClient.connect(dbUrl,{useNewUrlParser:true},(err,client)=>{
        if(err) throw err;
        let id = parseInt(req.params.id);
        let db = client.db('contactdb');
        let document=db.collection("profiles").find({_id:id});
        let user={};
        document.forEach((doc,err)=>{
            if(err)throw err;
            user = doc;
        },()=>{
            client.close();
            if(user == undefined){
                res.json({msg:`User with id ${name1} not found !!`});
            }else{
                res.json(user);
            }
        })
    })
});

// updating the user age by id
app.put("/profiles/:id/:password", (request, response) => {
    let id = parseInt(request.params.id);
    let password1 = parseInt(request.params.password);
    mongoClient.connect(dbUrl,{useNewUrlParser:true},(err,client)=>{
        if(err) throw err;
        else {
            let db = client.db("contactdb");
            db.collection("profiles").updateOne({_id:id}, {$set:{password:password1}}, (err, res) => {
                client.close();
                if(err) throw err;
                response.json(res);
            });
        }
    });
});

// delete user by id
app.delete("/profiles/:id", (request, response) => {
    let id = parseInt(request.params.id);
    
    mongoClient.connect(dbUrl,{useNewUrlParser:true},(err,client)=>{
        if(err) throw err;
        else {
            let db = client.db("contactdb");
            db.collection("profiles").deleteOne({_id:id}, (err, res) => {
                client.close();
                if(err) throw err;
                response.json(res);
            });
        }
    });
});

app.delete("/profiles/:pid", (request, response) => {
    let id = parseInt(request.params.id);
    let pid = parseInt(request.params.pid);
    mongoClient.connect(dbUrl,{useNewUrlParser:true},(err,client)=>{
        if(err) throw err;
        else {
            let db = client.db("contactdb");
            db.collection("profiles").findOne({_id:pid}, (err, founduser) => {
                if(err) throw err;
                let cid = founduser._id;
                const id = founduser.mycontacts[0]
                db.collection("profiles").updateOne({_id: cid},{$pull :{mycontacts:{_id : id._id}}}, function(err, results){
                if(!err){
                    console.log("successfully deleted");
                    res.redirect("data")
                    } else {
                    console.log("error in deletion");
                    res.redirect("/2/showcontact");
                    }
                });
                client.close();
                
                
                response.json(result);

            });
        }
    });
});