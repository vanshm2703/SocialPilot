
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import Manager from '../models/manager.model.js';
import ManagerInfo from '../models/managerInfo.model.js';
export const managerSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newManager = new Manager({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newManager.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const managerSignin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Find manager by email
    const validManager = await Manager.findOne({ email });
    if (!validManager) {
      return next(errorHandler(404, 'Manager not found'));
    }

    // Compare password with hashed password
    const validPassword = bcryptjs.compareSync(password, validManager.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Sign the JWT token
    const token = jwt.sign(
      { id: validManager._id },  // Payload
      process.env.JWT_SECRET,    // Secret key from environment
      { expiresIn: '1h' }       // Optional: Token expiration time (e.g., 1 hour)
    );

    // Omit password from response
    const { password: pass, ...rest } = validManager._doc;

    // Send response with token as cookie and user data (excluding password)
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,  // Makes the cookie inaccessible to JavaScript
        secure: process.env.NODE_ENV === 'production', // Set secure cookie in production
      })
      .json(rest);  // Send user data (excluding password)
  } catch (error) {
    next(error);  // Forward any errors to the error handling middleware
  }
}



export const findAllManagers = async (req, res, next) => {
  try {
    const managers = await ManagerInfo.find();

    if (!managers || managers.length === 0) {
      return res.status(404).json({ success: false, message: "No managers found" });
    }
    console.log(managers);
    
    return res.status(200).json({ managers });
  } catch (error) {
    next(error); 
    console.log(error);
    
  }
};


// Get manager by ID
export const findManager = async (req, res, next) => {
  const { id } = req.params;
  try {
      const manager = await Manager.findById(id);
      if (!manager) {
          return res.status(404).json({ success: false, message: 'Manager not found' });
      }
      res.json({ success: true, data: manager });
  } catch (error) {
      next(error);
  }
};

// Delete manager by ID
export const deleteManager = async (req, res, next) => {
  const { id } = req.params;
  try {
      const manager = await Manager.findByIdAndDelete(id);
      if (!manager) {
          return res.status(404).json({ success: false, message: 'Manager not found' });
      }
      res.json({ success: true, message: 'Manager deleted successfully' });
  } catch (error) {
      next(error);
  }
};

// Update manager by ID
export const updateManager = async (req, res, next) => {
  const { id } = req.params;
  try {
      const updatedManager = await Manager.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedManager) {
          return res.status(404).json({ success: false, message: 'Manager not found' });
      }
      res.json({ success: true, message: 'Manager updated successfully', data: updatedManager });
  } catch (error) {
      next(error);
  }
};
