import Client from '../models/client.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const clientSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log('email:', req.body);
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
  

  const newClient = new Client({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newClient.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const clientSignin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const validClient = await Client.findOne({ email });
    if (!validClient) {
      return next(errorHandler(404, 'Client not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validClient.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validClient._id},
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validClient._doc;

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

export const clientGoogle = async (req, res, next) => {
  const { username, email, googlePhotoUrl } = req.body;
  try {
    const client = await Client.findOne({ email });
    if (client) {
      const token = jwt.sign(
        { id: client._id },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = client._doc;
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
      const newClient = new Client({
        username:
          username.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newClient.save();
      const token = jwt.sign(
        { id: newClient._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newClient._doc;
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