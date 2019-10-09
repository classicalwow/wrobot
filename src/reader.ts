import { readFile } from "fs";
import { promisify } from "util";

/**
 * 读取信息类
 */
export async function luaReader(path: string) {
    let content = await promisify(readFile)(path, "utf-8");
    let json = {};
    lua2JSON(require("luaparse").parse(content),json);
    return json;
}

function lua2JSON(node: any, store: any) {
    let children: [];
    switch (node.type) {
        case "Chunk":
            children = node.body;
            break;
        case "AssignmentStatement":
            store[node.variables[0].name] = [];
            store = store[node.variables[0].name];
            children = node.init;
            break;
        case "TableConstructorExpression":
            children = node.fields;
            break;
        case "TableKey":
            if (node.value === "TableConstructorExpression") {
                store[node.key.value] = [];
                store = store[node.key.value];
                children = node.value.fields;
            } else {
                store.push({key:node.key.value,value:node.value.value})
            }
            break;
        case "TableValue":
            store.push(node.value.value)
            break;
    }
    if (children && children.length > 0) {
        children.forEach(child => lua2JSON(child, store));
    }
}
