import { db } from "../database.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const regexValidator = (data) => {
  const regex = {
    username: /^[A-Za-z0-9]{3,16}$/,
    email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    password: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/,
  };

  for (const key in data) {
    if (regex[key]) {
      if (!regex[key].test(data[key])) {
        return false;
      }
    } else {
      continue;
    }
    return true;
  }
};

export const register = (req, res) => {
    const userInfo = req.body;

    const regexData = {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password
    };

    let regex = regexValidator(regexData);

    if (!regex) {
      return res.status(404).json({ message: "اطلاعات معتبر نیستند" });
    }

    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [userInfo.email, userInfo.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");
    
        //Hash the password and create a user
        var hash = CryptoJS.AES.encrypt(userInfo.password, process.env.CRYPTO_KEY).toString();

        const q = `INSERT INTO users(username, email, password, first_name, last_name) VALUES (?)`;
        const values = [userInfo.username, userInfo.email, hash,
              userInfo.first_name, userInfo.last_name];
    
        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("User has been created.");
        });

    });
}

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const decrypted = CryptoJS.AES.decrypt(data[0].password, process.env.CRYPTO_KEY);

    const pass = decrypted.toString(CryptoJS.enc.Utf8);

    if (req.body.password !== pass)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id, isAdmin: data[0].isAdmin }, process.env.JWT_KEY, {
        expiresIn: '7d'
    });
    const { password, isAdmin, created_at, updated_at, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({...other, token});
  });
}

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
}