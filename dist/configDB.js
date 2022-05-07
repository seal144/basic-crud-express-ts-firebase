"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.db = void 0;
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const firebaseConfig_1 = __importDefault(require("./firebaseConfig"));
const appFirebase = (0, app_1.initializeApp)(firebaseConfig_1.default);
exports.db = (0, lite_1.getFirestore)(appFirebase);
exports.users = (0, lite_1.collection)(exports.db, 'users');
