import jwt from "jsonwebtoken";


export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      console.log(decoded);

      req.user = decoded.id;
      next();

    } catch (error) {
      return res.status(401).json({message : "not authorized"});
    }
  }

  if (!token) {
    return res.status(401).json({message: 'Not authorized, no token'});
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  protect(req, res, () => {
    if (req.user === req.body.user_id) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};