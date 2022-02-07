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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamodb = new aws_sdk_1.default.DynamoDB({ region: "eu-west-1" });
const genTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: "pastes",
        KeySchema: [
            { AttributeName: "date", KeyType: "HASH" },
            { AttributeName: "title", KeyType: "RANGE" }, // Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "date", AttributeType: "S" },
            { AttributeName: "title", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
    };
    return dynamodb
        .createTable(params)
        .promise()
        .then((data) => console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2)))
        .catch((err) => {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    });
});
genTables();
