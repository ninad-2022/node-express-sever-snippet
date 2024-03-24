import jwt from "jsonwebtoken"

export const generateToken = (data, options) => {
    const opt = { expiresIn: options?.expiry || "2h" };
    return jwt.sign(data, process.env.SECRET_KEY, opt);
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
};