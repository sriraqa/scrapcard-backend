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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getUsersCollection } = require('../app');
// Create user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const users = getUsersCollection();
        yield users.insertOne(user);
        res.status(201).send({
            message: 'User created', user
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).send({
            error: 'Failed to create user'
        });
    }
}));
// Update user
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { id } = _a, update = __rest(_a, ["id"]);
        const users = getUsersCollection();
        const result = yield users.updateOne({ id }, { $set: update });
        if (result.matchedCount === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User updated', id, update });
    }
    catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to update user' });
    }
}));
// Delete user
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const users = getUsersCollection();
        const result = yield users.deleteOne({ id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User deleted', id });
    }
    catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to delete user' });
    }
}));
exports.default = router;
