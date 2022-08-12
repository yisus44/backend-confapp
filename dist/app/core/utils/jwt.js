"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWT(payload) {
    const secretKey = process.env.SECRET;
    const token = jsonwebtoken_1.default.sign({ payload }, secretKey, { expiresIn: "3d" });
    return token;
}
exports.generateJWT = generateJWT;
function validateJWT(token) {
    try {
        const secretKey = process.env.SECRET;
        const isMatch = jsonwebtoken_1.default.verify(token, secretKey);
        return isMatch;
    }
    catch (error) {
        return false;
    }
}
exports.validateJWT = validateJWT;
//# sourceMappingURL=jwt.js.map