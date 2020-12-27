# Jingsong Tan Journal

## What Have I learned
For this exploration, I chose to explore mongo DB and how to intergrate the database with node.js using express and mongoose.  Thus it will further my understanding of MEAN stack.

### The Application
My application is to manipulate the students inside a class.  It will be able to retrieve imformation from the database in order to display all the students with their majors; add students by giving a name and major;  and delete student from the class with a given name.

### Getting the database ready
I first installed MongoDB on my EC2 instance following the official MongoDB document.  Then I dived into the shell and created a new collection called "students" in a new database "class", using commands `use class` and `db.createCollection('students')`.  To insert some documents, use `db.collection.insert()`.  In MongoDB, each record is stored as a document inside a collection.

### Setting up the server
Now the database is up and running, I need to set up a Node.js server in order for a user to manipulate it.  In the project directory on the server, I ran `npm init` and install express with `npm install express --save` to be able to start a node server.  Then I created a .js file called server.js to configure my Node server.  The server is configured to run on port 8000 and 8080.

Using express, Node server can be easily congigured to do different thing upon http requests.  "GET" and "POST" can be sat up with `app.get()` and `app.post()` accordinglly.  A path will also be specifyed in the methods for routing purpose.

### Connecting to the database
In order to connect to the database, I used a js framework called "mongoose", install it along with body-parser with command `npm install mongoose body-parser --save`.  In mongoose, documents in a collection are represented by a `Model`, which implements a `Schema` that definesm its data structure.  For example, I have a `Student Schema` that defined to have a `name` and a `major`.  Therefore, the `Student Model` will implement the schema and know what attributes will a student have.  Database queries are all done by calling `Model` functions.  
- `Model.find()` will find documents from the collection with given conditions.  In my application, I used it to return all the students in the students collection.
- `Model.save()` will save the model as a new document into the collection.  In my application, I used it to add new students in the class.
- `Model.findOneAndDelete()` will try to find a document given certain condition.  If the document is located, it will delete the document.  I use this method instead of  `Model.delete()` because I want to tell the user if the student that he is trying to delete doesn't exist.

### Start the server
In order for the server to run continuously, I sat up a pm2 application following the tutorial on canvas.

## Challenges
The biggest challenge I faced was to connect the database with my server.  Since express, mongoose, and node.js are updating so rapidly, many of the online tutorials I found didn't work because they were outdated.  Therefore, in order to set up my server, I really needed to compare multiple tutorials, find the best method and framework to use, and dive into the official document of the framework in order to learn the correct way to implement it.

Another peoblem I faced was that after I restarted my EC2 instance, nothing showed up on my browser when I tried to access my website.  Upon talking with Proffesor Weregeles during his office hour, we figured that EC2 instance will change its public DNS everytime it is restarted.

## What do I want to learn more about this topic
The only missing piece right now in my MEAN stack is to connect Angular frontend with MongoDB.  I tried to figure it out by following several tutorials online, but Angular changes its modules and syntax so much that non of them actually yield the correct result.
