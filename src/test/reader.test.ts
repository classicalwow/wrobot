import {expect} from "chai";
import "mocha";
import moment = require("moment");
import { luaReader } from "../reader";

describe("reader test", () => {
    it("lua reader", async () => {
        console.info('aaaa',JSON.stringify(await luaReader(__dirname+'/assets/ItemRack.lua')));
    });
});
