// utils.ts
import { Parent } from '../types/mappedParent';
import { Student } from '../types/mappedStudent'; 

export const filterParentData = (data: any): Parent => {
  const {
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
  } = data;
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

export const filterStudentData = (data: any): Student => {
  const {
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
  } = data;
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
