
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import Manager from '../models/manager.model.js';
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
  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const validManager = await Manager.findOne({ email });
    if (!validManager) {
      return next(errorHandler(404, 'Manager not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validManager.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validManager._id},
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validManager._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
}

export const managerGoogle = async (req, res, next) => {
  const { username, email, googlePhotoUrl } = req.body;
  try {
    const manager = await Manager.findOne({ email });
    if (manager) {
      const token = jwt.sign(
        { id: manager._id },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = manager._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
    else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newManager = new Manager({
        username:
          username.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newManager.save();
      const token = jwt.sign(
        { id: newManager._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newManager._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  }
  catch (err) { }
}

export const findAllManagers = async (req, res, next) => {
  try {
      const managers = await Manager.find();
      res.json({ success: true, data: managers });
  } catch (error) {
      next(error); // Proper error handling via next()
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
