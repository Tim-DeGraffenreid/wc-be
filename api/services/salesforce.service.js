"use strict";
// @ts-nocheck
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
exports.checkSalesforceForDuplicates = exports.getStudentId = exports.handleParentToChildren = exports.syncDatabaseAndSalesforce = exports.deleteFromDatabase = exports.deleteUser = exports.updateParentSalesforce = exports.updateStudentSalesforce = exports.addParentToSalesforce = exports.addStudentToSalesforce = void 0;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const tokenUrl = 'https://test.salesforce.com/services/oauth2/token'; // Salesforce token endpoint URL (sandbox:test.salesforce.com/services/oauth2/token , org:login.salesforce.com/services/oauth2/token)
const clientId = process.env.SFCLIENTID; //  Salesforce client ID
const clientSecret = process.env.SFCLIENTSECRET; // Salesforce client secret
const username = process.env.SFUSERNAME; // Salesforce username
const password = process.env.SFPASSWORD; //Salesforce password
const securityToken = process.env.SFSECURITYTOKEN; //Salesforce security token
// Function to obtain an access token using the Salesforce user-password flow
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(tokenUrl, new URLSearchParams({
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username: `${username}`,
        password: `${password}${securityToken}`,
    }).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data.access_token;
});
// Create the API client instance
const apiClient = axios_1.default.create({
    baseURL: 'https://wecodekc--eventtest.sandbox.my.salesforce.com', // Replace with SF instance_url from Postman
});
// Add the access token and authorization date to the request headers
apiClient.interceptors.request.use((config) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers['X-Authorization-Date'] = new Date().toUTCString();
    return config;
}));
const addStudentToSalesforce = (student) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const data = {
            Parent_or_Student__c: 'student',
            Email: student.email,
            LastName: student.lName,
            FirstName: student.fName,
            Phone: student.phoneNumber,
            Birthdate: student.birthday,
            Grade__c: GradeLevel[student.grade],
            School__c: student.schoolName,
            Gender__c: Gender[student.gender],
            MailingPostalCode: student.zipCode,
            Emergency_Contact__c: student.emergencyContact,
        };
        const response = yield apiClient.post('/services/data/v52.0/sobjects/Contact', data); // and this is the common endpoint
        return response.data;
    }
    catch (error) {
        console.error('Creation of Student to salesforce failed:', error);
        if (error.response) {
            console.error('Response error:', (_a = error.response.data[0]) === null || _a === void 0 ? void 0 : _a.errorCode);
            throw (_b = error.response.data[0]) === null || _b === void 0 ? void 0 : _b.errorCode;
        }
        else if (error.request) {
            console.error('No response received:', error.request);
        }
        else {
            console.error('Request setup error:', error.message);
        }
        throw error;
    }
});
exports.addStudentToSalesforce = addStudentToSalesforce;
const addParentToSalesforce = (parent) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const data = {
            Parent_or_Student__c: 'parent',
            Email: parent.email,
            LastName: parent.lName,
            FirstName: parent.fName,
            Phone: parent.phoneNumber,
            Birthdate: parent.birthday,
            Education_Level__c: EducationLevel[parent.educationLevel],
            Veteran_Status__c: VeteranStatus[parent.veteranStatus],
            Do_you_have_regular_transportation__c: parent.regularTransportation ? 'Yes' : 'No',
            Residence_Type__c: HousingStatus[parent.housingStatus],
        };
        const response = yield apiClient.post('/services/data/v52.0/sobjects/Contact', data);
        return response.data;
    }
    catch (error) {
        // console.error('Creation of parent to salesforce failed:', error)
        if (error.response) {
            // console.error('Response error:', error.response.data[0]?.errorCode)
            throw (_c = error.response.data[0]) === null || _c === void 0 ? void 0 : _c.errorCode;
        }
        else if (error.request) {
            // console.error('No response received:', error.request)
        }
        else {
            // console.error('Request setup error:', error.message)
        }
        throw error;
    }
});
exports.addParentToSalesforce = addParentToSalesforce;
const updateStudentSalesforce = (id, student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            Email: student.email,
            LastName: student.lName,
            FirstName: student.fName,
            Phone: student.phoneNumber,
            Birthdate: student.birthday,
            Grade__c: GradeLevel[student.grade],
            School__c: student.schoolName,
            Gender__c: Gender[student.gender],
            MailingPostalCode: student.zipCode,
            Emergency_Contact__c: student.emergencyContact,
        };
        yield apiClient.patch(`/services/data/v52.0/sobjects/Contact/${id}`, data);
        return 'successfully updated';
    }
    catch (error) {
        console.error('Update of student to salesforce failed:', error);
        throw error;
    }
});
exports.updateStudentSalesforce = updateStudentSalesforce;
const updateParentSalesforce = (id, parent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            Parent_or_Student__c: 'parent',
            Email: parent.email,
            LastName: parent.lName,
            FirstName: parent.fName,
            Phone: parent.phoneNumber,
            Birthdate: parent.birthday,
            Education_Level__c: EducationLevel[parent.educationLevel],
            Veteran_Status__c: VeteranStatus[parent.veteranStatus],
            Do_you_have_regular_transportation__c: parent.regularTransportation ? 'Yes' : 'No',
            Residence_Type__c: HousingStatus[parent.housingStatus],
        };
        yield apiClient.patch(`/services/data/v52.0/sobjects/Contact/${id}`, data);
        return 'successfully updated';
    }
    catch (error) {
        console.error('Update of student to salesforce failed:', error);
        throw error;
    }
});
exports.updateParentSalesforce = updateParentSalesforce;
const deleteUser = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id !== null) {
            yield deleteRelationship(id, type);
            const response = yield apiClient.delete(`/services/data/v58.0/sobjects/Contact/${id}`);
            console.log(response.data);
        }
        return true;
    }
    catch (error) {
        console.error('Deletion of salesforce failed:', error);
        throw error;
    }
});
exports.deleteUser = deleteUser;
const deleteRelationship = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const url = type === 'parent'
            ? `/services/data/v58.0/query?q=SELECT+Id+FROM+npe4__Relationship__c+WHERE+npe4__RelatedContact__c='${id}'+limit 1`
            : `/services/data/v58.0/query?q=SELECT+Id+FROM+npe4__Relationship__c+WHERE+npe4__Contact__c='${id}'+limit 1`;
        const response = yield apiClient.get(url);
        const records = (_d = response.data) === null || _d === void 0 ? void 0 : _d.records;
        yield Promise.all(records.map((record) => __awaiter(void 0, void 0, void 0, function* () {
            yield apiClient.delete(`/services/data/v58.0/sobjects/npe4__Relationship__c/${record.Id}`);
        })));
        console.log('Deleted relationships successfully');
    }
    catch (error) {
        console.log(`Error deleting relationships: ${error}`);
        throw error;
    }
});
const deleteFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.default.student.findMany();
        const parents = yield prisma_1.default.parent.findMany();
        students.map((student) => __awaiter(void 0, void 0, void 0, function* () {
            if (student.salesforceId === null) {
                yield prisma_1.default.student.delete({ where: { id: student.id } });
            }
        }));
        parents.map((parent) => __awaiter(void 0, void 0, void 0, function* () {
            if (parent.salesforceId === null) {
                yield prisma_1.default.parent.delete({ where: { id: parent.id } });
            }
        }));
        return;
    }
    catch (error) {
        console.log(`Error deleting from database: ${error}`);
        throw error;
    }
});
exports.deleteFromDatabase = deleteFromDatabase;
const syncDatabaseAndSalesforce = () => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const salesforceData = yield getDataFromSalesforce();
        console.log("Syncing data...");
        const salesforcePromise = (_e = salesforceData === null || salesforceData === void 0 ? void 0 : salesforceData.records) === null || _e === void 0 ? void 0 : _e.map((record) => __awaiter(void 0, void 0, void 0, function* () {
            const { Parent_or_Student__c } = record, data = __rest(record, ["Parent_or_Student__c"]);
            const convertedData = {
                email: data === null || data === void 0 ? void 0 : data.Email,
                lName: data === null || data === void 0 ? void 0 : data.LastName,
                fName: data === null || data === void 0 ? void 0 : data.FirstName,
                phoneNumber: data === null || data === void 0 ? void 0 : data.Phone,
                birthday: data === null || data === void 0 ? void 0 : data.Birthdate,
                educationLevel: data === null || data === void 0 ? void 0 : data.Education_Level__c,
                veteranStatus: data === null || data === void 0 ? void 0 : data.Veteran_Status__c,
                regularTransportation: data === null || data === void 0 ? void 0 : data.Do_you_have_regular_transportation__c,
                housingStatus: data === null || data === void 0 ? void 0 : data.Residence_Type__c,
                grade: data === null || data === void 0 ? void 0 : data.Grade__c,
                schoolName: data === null || data === void 0 ? void 0 : data.School__c,
                gender: data === null || data === void 0 ? void 0 : data.Gender__c,
                zipCode: data === null || data === void 0 ? void 0 : data.MailingPostalCode,
            };
            let savedData;
            console.log("record.Id:", record === null || record === void 0 ? void 0 : record.Id);
            console.log("record:", record);
            console.log("Converted data: ", convertedData);
            if (Parent_or_Student__c === 'parent') {
                savedData = yield prisma_1.default.parent.update({
                    where: { id: record.id, salesforceId: record === null || record === void 0 ? void 0 : record.id },
                    data: Object.assign({}, convertedData),
                });
            }
            else if ((record === null || record === void 0 ? void 0 : record.Parent_or_Student__) === 'student') {
                savedData = yield prisma_1.default.student.update({
                    where: { id: record.id, salesforceId: record === null || record === void 0 ? void 0 : record.id },
                    data: Object.assign({}, convertedData),
                });
            }
        }));
        yield Promise.all(salesforcePromise);
        return;
    }
    catch (error) {
        console.error('Error while syncing', error);
        throw error;
    }
});
exports.syncDatabaseAndSalesforce = syncDatabaseAndSalesforce;
const handleParentToChildren = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.parent.findMany({ include: { student: true } });
        const existingRelationships = yield getRelationshipsFromSalesforce();
        const relationshipPromise = data.map((parent) => __awaiter(void 0, void 0, void 0, function* () {
            for (const child of parent.student) {
                if ((parent === null || parent === void 0 ? void 0 : parent.salesforceId) && (child === null || child === void 0 ? void 0 : child.salesforceId)) {
                    const isExistingRelationship = existingRelationships.some((relationship) => relationship.npe4__Contact__c === child.salesforceId &&
                        relationship.npe4__RelatedContact__c === parent.salesforceId &&
                        relationship.npe4__Type__c === 'Parent');
                    if (!isExistingRelationship) {
                        yield apiClient.post(`/services/data/v58.0/sobjects/npe4__Relationship__c`, {
                            npe4__Contact__c: child.salesforceId,
                            npe4__RelatedContact__c: parent.salesforceId,
                            npe4__Type__c: 'Parent',
                        });
                        console.log('Added relationship to parent successfully');
                    }
                }
            }
        }));
        yield Promise.all(relationshipPromise);
        return;
    }
    catch (error) {
        console.error('Error saving relationship to Salesforce:', error);
    }
});
exports.handleParentToChildren = handleParentToChildren;
const getDataFromSalesforce = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiClient.get(`/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName,Email,CreatedDate,Parent_or_Student__c,Phone,BirthDate,Grade__c,School__c,Gender__c,MailingPostalCode,Education_Level__c,Veteran_Status__c,Do_you_have_regular_transportation__c,Residence_Type__c+FROM+Contact`);
        return response.data || [];
    }
    catch (error) {
        console.error('Error fetching data from salesforce:', error);
        throw error;
    }
});
const getRelationshipsFromSalesforce = () => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const response = yield apiClient.get('/services/data/v58.0/query?q=SELECT+npe4__Contact__c,npe4__RelatedContact__c,npe4__Type__c+FROM+npe4__Relationship__c');
        return (_f = response.data) === null || _f === void 0 ? void 0 : _f.records;
    }
    catch (error) {
        throw error;
    }
});
const GradeLevel = {
    First: '1st',
    Second: '2nd',
    Third: '3rd',
    Fourth: '4th',
    Fifth: '5th',
    Sixth: '6th',
    Seventh: '7th',
    Eighth: '8th',
    Freshman: 'Freshman',
    Sophomore: 'Sophomore',
    Junior: 'Junior',
    Senior: 'Senior',
};
const Gender = {
    Male: 'Male',
    Female: 'Female',
    NonBinary: 'Non-Binary',
    PreferNotToSay: 'Prefer Not To Say',
};
const EducationLevel = {
    NoSchooling: 'No Schooling',
    SomeHighSchoolOrLess: 'Some High School or less',
    HighSchoolGraduateGED: 'High School Graduate/GED',
    SomeCollege: 'Some College',
    AssociatesDegree: "Associate's Degree",
    BachelorsDegree: "Bachelor's Degree",
    SomeGraduateSchool: 'Some Graduate School',
    MastersDegree: "Master's Degree",
    DoctoralDegree: 'Doctoral Degree',
};
const VeteranStatus = {
    NotAVeteran: 'I am not a veteran',
    BelongToSeveralClassifications: 'I belong to one of the several classifications of protected veterans',
    NotProtectedVeteran: 'I am NOT a protected veteran',
    ChooseNotToIdentify: 'I choose not to identify my veteran status',
};
const HousingStatus = {
    Rent: 'Rent',
    Own: 'Own',
    CurrentlyDisplaced: 'Currently Displaced',
};
// export default apiClient
const getStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiClient.get("https://wecodekc--eventtest.sandbox.my.salesforce.com/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName,Parent_or_Student__c+FROM+Contact+WHERE+Parent_or_Student__c='student'");
        return response.data;
    }
    catch (error) {
        console.error('Encountered Error:', error);
    }
});
exports.getStudentId = getStudentId;
const checkSalesforceForDuplicates = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    // try {
    const salesforceData = yield getDataFromSalesforce();
    const exists = (_g = salesforceData === null || salesforceData === void 0 ? void 0 : salesforceData.records) === null || _g === void 0 ? void 0 : _g.some((record) => (record === null || record === void 0 ? void 0 : record.Email) === email || (record === null || record === void 0 ? void 0 : record.Phone) === phoneNumber);
    return exists;
    // } catch (error) {
    //   throw error
    // }
});
exports.checkSalesforceForDuplicates = checkSalesforceForDuplicates;
//# sourceMappingURL=salesforce.service.js.map