"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const task_controller_1 = require("./task.controller");
const task_validation_1 = require("./task.validation");
const router = express_1.default.Router();
router.post('/', auth_1.default, (0, validateRequest_1.default)(task_validation_1.TaskValidation.create), task_controller_1.TaskController.create);
router.get('/', auth_1.default, task_controller_1.TaskController.getAll);
router.get('/:id', auth_1.default, task_controller_1.TaskController.getById);
router.patch('/:id', auth_1.default, (0, validateRequest_1.default)(task_validation_1.TaskValidation.update), task_controller_1.TaskController.update);
router.delete('/:id', auth_1.default, task_controller_1.TaskController.deleteById);
exports.TaskRoutes = router;
