"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const lite_1 = require("firebase/firestore/lite");
const configDB_1 = require("./configDB");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userDocs = [];
    yield (0, lite_1.getDocs)(configDB_1.users).then((snapshot) => {
        snapshot.forEach((doc) => {
            userDocs.push({ id: doc.id, name: doc.data().name, age: doc.data().age });
            // userDocs.push({ id: doc.id, ...doc.data() });
        });
    });
    res.send(userDocs);
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    yield (0, lite_1.addDoc)(configDB_1.users, data);
    res.send({ message: 'User added' });
}));
app.patch('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    delete req.body.id;
    const dataUpdate = req.body;
    const docRef = (0, lite_1.doc)(configDB_1.db, 'users', id);
    yield (0, lite_1.updateDoc)(docRef, dataUpdate);
    res.send({ message: 'updated' });
}));
app.delete('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const docRef = (0, lite_1.doc)(configDB_1.db, 'users', id);
    yield (0, lite_1.deleteDoc)(docRef);
    res.send({ message: 'deleted' });
}));
app.listen(4000, () => {
    console.log('app listening on port 4000');
});
