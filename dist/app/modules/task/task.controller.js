'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TaskController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const task_constant_1 = require('./task.constant');
const task_service_1 = require('./task.service');
const create = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // get user email from request object
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    // attach user email to request body
    req.body.userEmail = email;
    const result = yield task_service_1.TaskService.create(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: 'Task created successfully',
      data: result,
    });
  }),
);
const getAll = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // get user email from request object
    const email = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
    const filters = (0, pick_1.default)(
      req.query,
      task_constant_1.taskFilterableFields,
    );
    const options = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result = yield task_service_1.TaskService.getAll(
      email,
      filters,
      options,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Tasks fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }),
);
const getById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield task_service_1.TaskService.getById(
      req.params.id,
      (_c = req.user) === null || _c === void 0 ? void 0 : _c.email,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Task fetched successfully',
      data: result,
    });
  }),
);
const update = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const result = yield task_service_1.TaskService.update(
      req.params.id,
      (_d = req.user) === null || _d === void 0 ? void 0 : _d.email,
      req.body,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Task updated successfully',
      data: result,
    });
  }),
);
const deleteById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const result = yield task_service_1.TaskService.deleteById(
      req.params.id,
      (_e = req.user) === null || _e === void 0 ? void 0 : _e.email,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Task deleted successfully',
      data: result,
    });
  }),
);
exports.TaskController = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
