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
const SampleAvatars = [
    {
        id: "avatar_1",
        imageUrl: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_19_dancing.png?alt=media&token=03c3e96f-9148-42f9-a667-e8aeeba6d558",
        name: "Avatar 1"
    },
    {
        id: "avatar_2",
        imageUrl: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_29_dancing.png?alt=media&token=507cc40a-a280-4f83-9600-69836b64522b",
        name: "Avatar 2"
    },
    {
        id: "avatar_3",
        imageUrl: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_32_dancing.png?alt=media&token=e7d9d5fa-b7bd-41d5-966e-817f147b63d7",
        name: "Avatar 3"
    },
    {
        id: "avatar_4",
        imageUrl: "https://dynamic-assets.gather.town/v2/sprite-profile/avatar-gV7nljNpXAGHgAEnbBWv.3ZnyOry7q9szgHCU1URo.GOIono5TlL1mMHqoryfb.R-mO0WjmRySf-DdFAMmb.qXZsUMXd6wr2ICupUTcz.png?d=.",
        name: "avatar_4",
    }
];
const maps = [
    {
        id: "map_1",
        width: 20,
        height: 20,
        name: "Map 1",
        thumbnail: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/remote-work%2Foffice-configuration%2Fscreenshots%2FSOURCE_SPACE_RW_6.png?alt=media",
    },
    {
        id: "map_2",
        width: 20,
        height: 20,
        name: "Map 2",
        thumbnail: "https://storytent-sam.s3.us-east-1.amazonaws.com/Screenshot+2025-03-13+at+11.06.30+PM.png",
    },
];
const src_1 = __importDefault(require("../src"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        SampleAvatars.forEach((a) => __awaiter(void 0, void 0, void 0, function* () {
            yield src_1.default.avatar.create({
                data: {
                    id: a.id,
                    name: a.name,
                    imageUrl: a.imageUrl,
                },
            });
        }));
        maps.forEach((m) => __awaiter(void 0, void 0, void 0, function* () {
            yield src_1.default.map.create({
                data: {
                    id: m.id,
                    width: m.width,
                    height: m.height,
                    name: m.name,
                    thumbnail: m.thumbnail,
                },
            });
        }));
    }
    catch (e) {
        console.log("Languages already persist in the DB!");
    }
}))();
