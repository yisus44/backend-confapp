"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConferenceAttendance = void 0;
const typeorm_1 = require("typeorm");
const conference_model_1 = require("../conference/conference.model");
const user_model_1 = require("../user/user.model");
let ConferenceAttendance = class ConferenceAttendance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConferenceAttendance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conference_model_1.Conference, (conference) => conference.attendance),
    __metadata("design:type", conference_model_1.Conference)
], ConferenceAttendance.prototype, "conference", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.attendances),
    __metadata("design:type", user_model_1.User)
], ConferenceAttendance.prototype, "user", void 0);
ConferenceAttendance = __decorate([
    (0, typeorm_1.Entity)()
], ConferenceAttendance);
exports.ConferenceAttendance = ConferenceAttendance;
//# sourceMappingURL=attendance.model.js.map