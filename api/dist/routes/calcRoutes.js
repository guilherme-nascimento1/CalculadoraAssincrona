"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calcController_1 = require("../controllers/calcController");
const router = (0, express_1.Router)();
router.post('/calc', calcController_1.createCalculation);
router.get('/calc/:id', calcController_1.getCalculationResult);
exports.default = router;
