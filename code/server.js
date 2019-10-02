const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));


const url = 'mongodb://localhost:27017/class';
const studentSchema = new mongoose.Schema ({
  name: String,
  major: String
});
const Student = mongoose.model('Student', studentSchema);

//Get all students from the satabase
app.get('/getAllStudents', function(req, res) {
  var response = '<h1>Students in this class:</h1>';

  mongoose.connect(url, function(err) {
    if (err) {
      throw err;
    } else {
      console.log ("Successfully connected to DB!(Get All Students)");
    }

    Student.find(function(err, doc) {
      if (err) {
        throw err;
      } else {
        console.log(doc);
        doc.forEach(student => {
          response += 'name: ' + student.name + ' major: ' + student.major + '<br>';
        });
        return res.status(200).send(response);
      }
    });
  });
});

//Create new Student record
app.get('/newStudent/:name/:major', function(req, res) {
  var nStudent = new Student ({
    name: req.params['name'],
    major: req.params['major']
  });

  mongoose.connect(url, function(err) {
    if (err) {
      throw err;
    } else {
      console.log ("Successfully connected to DB!(Get All Students)");
    }

    nStudent.save(function(err, doc) {
      if(err) {
        throw err;
      } else {
        console.log("Sucessfully saved!");
        var response = nStudent.name + ' majoring ' + nStudent.major + ' added to the DB.';
        return res.status(200).send(response);
      }
    });
  });
});

//Delete Student record
app.get('/deleteStudent/:name', function(req, res) {
  mongoose.connect(url, function(err) {
    if(err) {
      throw err;
    } else {
      console.log ("Successfully connected to DB!(Get All Students)");
    }

    Student.findOneAndDelete({ name: req.params['name']}, function(err, result) {
      if(err) {
        throw err;
      }

      if (!result) {
        return res.send('Student ' + req.params['name'] + ' does not exist!');
      } else {
        return res.send('Student ' + req.params['name'] + ' successfully deleted!');
      }
    });
  });
});

//Default Path
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000, function() {
  console.log("Server running on port 8000!");
});
