"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterStudentData = exports.filterParentData = void 0;
const filterParentData = (data) => {
    const { email, fName, lName, phoneNumber, birthday, educationLevel, veteranStatus, regularTransportation, housingStatus, salesforceId, } = data;
    return {
        email,
        fName,
        lName,
        phoneNumber,
        birthday,
        educationLevel,
        veteranStatus,
        regularTransportation,
        housingStatus,
        salesforceId,
    };
};
exports.filterParentData = filterParentData;
const filterStudentData = (data) => {
    const { email, fName, lName, phoneNumber, birthday, grade, schoolName, gender, zipCode, salesforceId, emergencyContact, } = data;
    return {
        email,
        fName,
        lName,
        phoneNumber,
        birthday,
        grade,
        schoolName,
        gender,
        zipCode,
        salesforceId,
        emergencyContact,
    };
};
exports.filterStudentData = filterStudentData;
//# sourceMappingURL=mappingFilters.js.map