const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
//const mime = require('mime-types');

require('dotenv').config();
const app = express();

// Add this line to define bcrypt salt rounds
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/../uploads/'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5174',
}));

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error('MONGO_URI environment variable is not defined');
}
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          resolve(userData);
        });
      });
    }    

app.get('/api/test', (req, res) => {
    res.json('test ok');
});

app.post('/api/register', async (req,res) => {
  const {name,email,password} = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }

});
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/api/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/api/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/api/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body; // Expecting JSON with a "link" property
    if (!link) {
      return res.status(400).json({ error: 'No link provided' });
    }
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/../uploads/' + newName,
    });
    res.json(newName);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to download image' });
  }
});

const photosMiddleware = multer({ dest: __dirname + '/../uploads/' });
app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = [];
  for(let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace(__dirname + '/../uploads/', ''));
  }
  res.json(uploadedFiles);
});

app.post('/api/places', async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const { token } = req.cookies;
    const {
      title, address, addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxPeople, price,
    } = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      try {
        const placeDoc = await Place.create({
          owner: userData.id,
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxPeople,
          price,
        });
        res.json(placeDoc);
      } catch (error) {
        console.error('Error creating place:', error);
        res.status(500).json({ error: 'Failed to create place' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/user-places', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Place.find({owner:id}) );
  });
});

app.get('/api/places/:id', async (req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
});

app.put('/api/places', async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const { token } = req.cookies;
    const {
      id, title, address, addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxPeople, price,
    } = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      try {
        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
          return res.status(404).json({ error: 'Place not found' });
        }

        if (userData.id === placeDoc.owner.toString()) {
          placeDoc.set({
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxPeople, price,
          });
          await placeDoc.save();
          res.json('ok');
        } else {
          res.status(403).json({ error: 'Forbidden: You do not own this place' });
        }
      } catch (error) {
        console.error('Error updating place:', error);
        res.status(500).json({ error: 'Failed to update place' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/places/', async (req,res) => {
  res.json(await Place.find());
})

app.post('/api/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    place,checkIn,checkOut,numberOfPeople,name,phone,price,
  } = req.body;
  Booking.create({
    place,checkIn,checkOut,numberOfPeople,name,phone,price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

app.get('/api/bookings', async (req,res) => {
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') );
});

app.listen(4000);

