import jwt from 'jsonwebtoken';

const isAuthenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    res.status(403).json({ error: 'Forbidden, Token not found.' });
    return;
  }

  const secret = process.env.JWT_SECRET || 'secret_key_12345'

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token no valid.' });
    return;
  }
};

export default isAuthenticate
