"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YesNoBooleanMapping = exports.housingStatusMapping = exports.veteranStatusMapping = exports.educationLevelMapping = exports.gradeMapping = exports.genderMapping = void 0;
const client_1 = require("@prisma/client");
exports.genderMapping = {
    'Male': client_1.student_gender_enum.Male,
    'Female': client_1.student_gender_enum.Female,
    'Non-Binary': client_1.student_gender_enum.NonBinary,
    'Prefer Not To Say': client_1.student_gender_enum.PreferNotToSay,
};
exports.gradeMapping = {
    '1st': client_1.grades.First,
    '2nd': client_1.grades.Second,
    '3rd': client_1.grades.Third,
    '4th': client_1.grades.Fourth,
    '5th': client_1.grades.Fifth,
    '6th': client_1.grades.Sixth,
    '7th': client_1.grades.Seventh,
    '8th': client_1.grades.Eighth,
    'Freshman': client_1.grades.Freshman,
    'Sophomore': client_1.grades.Sophomore,
    'Senior': client_1.grades.Senior,
};
exports.educationLevelMapping = {
    'No Schooling': client_1.educationLevel.NoSchooling,
    'Some High School or less': client_1.educationLevel.SomeHighSchoolOrLess,
    'High School Graduate/GED': client_1.educationLevel.HighSchoolGraduateGED,
    'Some College': client_1.educationLevel.SomeCollege,
    'Associate\'s Degree': client_1.educationLevel.AssociatesDegree,
    'BachelorsDegree': client_1.educationLevel.BachelorsDegree,
    'SomeGraduateSchool': client_1.educationLevel.SomeGraduateSchool,
    'MastersDegree': client_1.educationLevel.MastersDegree,
    'Doctoral Degree': client_1.educationLevel.DoctoralDegree,
};
exports.veteranStatusMapping = {
    'I am not a veteran': client_1.veteranStatus.NotAVeteran,
    'I belong to several classifications of protected veterans': client_1.veteranStatus.BelongToSeveralClassifications,
    'I am NOT a protected veteran': client_1.veteranStatus.NotProtectedVeteran,
    'I choose not to identify my veteran status': client_1.veteranStatus.ChooseNotToIdentify,
};
exports.housingStatusMapping = {
    'Rent': client_1.housingStatus.Rent,
    'Own': client_1.housingStatus.Own,
    'Currently Displaced': client_1.housingStatus.CurrentlyDisplaced,
};
exports.YesNoBooleanMapping = {
    'Yes': true,
    'No': false,
};
//# sourceMappingURL=mappings.js.map