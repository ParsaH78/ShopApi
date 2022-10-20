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

    let regex = regexValidator(userInfo);

    if (!regex) {
      return res.status(404).json({ message: "اطلاعات معتبر نیستند" });
    }

    try {
        db.query(q, [userInfo.email, userInfo.username], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(409).json("User already exists!");
        
            //Hash the password and create a user
            var hash = CryptoJS.AES.encrypt(userInfo.password, process.env.CRYPTO_KEY);

            try {
                const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
                const values = [userInfo.username, userInfo.email, hash];
            
                db.query(q, [values], (err, data) => {
                  if (err) return res.status(500).json(err);
                  return res.status(200).json("User has been created.");
                });
            } catch (error) {
                return res.status(404).json({message: "خطا در ثبت نام (ثبت کاربر در پایگاه داده)"})
            }

          });
    } catch (error) {
        return res.status(404).json({message: "خطا در ثبت نام (یافتن کاربر در پایگاه داده)"})
    }
}

