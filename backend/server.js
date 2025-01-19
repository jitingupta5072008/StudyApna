const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const cors = require('cors');
const User = require('./models/user')
const Class = require('./models/class')
const Subject = require('./models/subject');
const Chapter = require('./models/chapter');
const Video = require('./models/video');
require('dotenv').config();
const _dirname = path.resolve()

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

//route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save new user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token, user: { id: user._id, email: user.email } });

      // res.status(200).json({  user: { id: user._id, email: user.email } });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});


app.post('/addclass', async (req, res) => {
  const { emoji, name } = req.body;
  try {
    const Classs = new Class({ emoji, name });
    await Classs.save();
    res.status(200).json({ message: 'Class Add Successfully.' });

  } catch (err) {
    res.status(500).json({ err });
  }
});


// Add a Class
app.post("/classes", async (req, res) => {
  const { name } = req.body;
  try {
    const newClass = new Class({ name });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add a Subject
app.post("/subjects", async (req, res) => {
  const { name, classId,teacher } = req.body;
  try {
    const newSubject = new Subject({ name, classId,teacher });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add a Video
app.post("/videos", async (req, res) => {
  const { title, url, chapterId,thumbnail } = req.body;
  try {
    const newVideo = new Video({ title, url, chapterId,thumbnail });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//Add a chapter
app.post("/chapters", async (req, res) => {
  const { name, subjectId } = req.body;
  try {
    const newChapter = new Chapter({ name, subjectId });
    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json(error);
  }
});


// Get All Classes
app.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Subjects by Class
app.get("/subjects/:classId", async (req, res) => {
  const { classId } = req.params;
  try {
    const subjects = await Subject.find({ classId }).populate("classId");
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Chapter
app.get("/chapters/:subjectId", async (req, res) => {
  const { subjectId } = req.params;
  try {
    const chapters = await Chapter.find({ subjectId });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json(error);
  }
})

app.get("/videos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find all videos for the given id
    const videos = await Video.find({chapterId: id });
    
    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found for this chapter." });
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ message: "Failed to fetch videos. Please try again later." });
  }
});
app.get("/watch-video/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find all videos for the given id
    const videos = await Video.findOne({_id: id });
    
    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found for this chapter." });
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ message: "Failed to fetch videos. Please try again later." });
  }
});

if (process.env.NODE_ENV === 'production') {
  // Serve static files from React app
  app.use(express.static(path.join(_dirname, "/frontend/dist")));

  // Serve index.html for any other requests (for React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, "frontend","dist","index.html"));
  });
}


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
