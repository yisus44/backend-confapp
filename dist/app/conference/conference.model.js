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
exports.Conference = void 0;
const typeorm_1 = require("typeorm");
const attendance_model_1 = require("../attendance/attendance.model");
const conference_review_model_1 = require("../conference-review/conference-review.model");
let Conference = class Conference {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Conference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], Conference.prototype, "conferenceName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], Conference.prototype, "presenter", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], Conference.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], Conference.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
    }),
    __metadata("design:type", Number)
], Conference.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
    }),
    __metadata("design:type", Number)
], Conference.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], Conference.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => conference_review_model_1.ConferenceReview, (conferenceReview) => conferenceReview.conference),
    __metadata("design:type", Array)
], Conference.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_model_1.ConferenceAttendance, (conferenceAttendance) => conferenceAttendance.conference),
    __metadata("design:type", Array)
], Conference.prototype, "attendance", void 0);
Conference = __decorate([
    (0, typeorm_1.Entity)()
], Conference);
exports.Conference = Conference;
//# sourceMappingURL=conference.model.js.map