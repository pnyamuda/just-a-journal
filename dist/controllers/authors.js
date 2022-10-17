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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = void 0;
const author_1 = require("../models/author");
let getAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authors = yield author_1.Author.find({});
        return res.json(authors);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAuthors = getAuthors;