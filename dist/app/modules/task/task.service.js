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
exports.TaskService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const task_constant_1 = require("./task.constant");
const task_model_1 = require("./task.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.create(payload);
    return result;
});
const getAll = (email, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    // calculate pagination options
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(options);
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    // prepare query object
    const andConditions = [];
    // filter via user email
    andConditions.push({ userEmail: email });
    // filter via search term
    if (searchTerm) {
        andConditions.push({
            $or: task_constant_1.taskSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // filter via other fields
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // prepare sort object
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // return whereConditions;
    const result = yield task_model_1.Task.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    // get total documents count
    const total = yield task_model_1.Task.countDocuments(whereConditions);
    return {
        data: result,
        meta: {
            total,
            page,
            limit,
        },
    };
});
const getById = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findById(id);
    // check if task exists
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    }
    // check if user is authorized to access this task
    if (result.userEmail !== email) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access this task');
    }
    return result;
});
const update = (id, email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findById(id);
    // check if task exists
    if (!task) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    }
    // check if user is authorized to access this task
    if (task.userEmail !== email) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access this task');
    }
    // update task
    const result = yield task_model_1.Task.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteById = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findById(id);
    // check if task exists
    if (!task) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    }
    // check if user is authorized to access this task
    if (task.userEmail !== email) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access this task');
    }
    // delete task
    const result = yield task_model_1.Task.findByIdAndDelete(id);
    return result;
});
exports.TaskService = {
    create,
    getAll,
    getById,
    update,
    deleteById,
};
