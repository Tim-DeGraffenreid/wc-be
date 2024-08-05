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
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config(config);
    const result = yield cloudinary_1.v2.uploader.upload(file.toString(), {
        folder: 'we-codekc',
    });
    return { secure_url: result.secure_url, public_id: result.public_id };
});
exports.uploadImage = uploadImage;
const deleteImage = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config(config);
    yield cloudinary_1.v2.uploader.destroy(public_id);
    return 'Image deleted';
});
exports.deleteImage = deleteImage;
//# sourceMappingURL=cloudinary.service.js.map