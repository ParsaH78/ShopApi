import jwt from "jsonwebtoken";


export const protect = async (req, res, next) => {
  let token

  if ( req.cookies.access_token ) {
    try {
      // Get token from header
      token = req.cookies.access_token;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = decoded;
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
    if (req.user.id === req.body.user_id) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  protect(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};