"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const firebaseConfig_1 = __importDefault(require("./firebaseConfig"));
const appFirebase = (0, app_1.initializeApp)(firebaseConfig_1.default);
const db = (0, lite_1.getFirestore)(appFirebase);
const users = (0, lite_1.collection)(db, 'users');
exports.default = users;
