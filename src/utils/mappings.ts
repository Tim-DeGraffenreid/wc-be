import {
  student_gender_enum,
  grades,
  educationLevel,
  veteranStatus,
  housingStatus,
} from '@prisma/client'; 

export const genderMapping: Record<string, student_gender_enum> = {
  'Male': student_gender_enum.Male,
  'Female': student_gender_enum.Female,
  'Non-Binary': student_gender_enum.NonBinary,
  'Prefer Not To Say': student_gender_enum.PreferNotToSay,
};

export const gradeMapping: Record<string, grades> = {
    '1st': grades.First,
    '2nd': grades.Second,
    '3rd': grades.Third,
    '4th': grades.Fourth,
    '5th': grades.Fifth,
    '6th': grades.Sixth,
    '7th': grades.Seventh,
    '8th': grades.Eighth,
    'Freshman': grades.Freshman,
    'Sophomore': grades.Sophomore,
    'Senior': grades.Senior,
}

export const educationLevelMapping: Record<string, educationLevel> = {
    'No Schooling': educationLevel.NoSchooling,
    'Some High School or less': educationLevel.SomeHighSchoolOrLess,
    'High School Graduate/GED': educationLevel.HighSchoolGraduateGED,
    'Some College': educationLevel.SomeCollege,
    'Associate\'s Degree': educationLevel.AssociatesDegree,
    'BachelorsDegree': educationLevel.BachelorsDegree,
    'SomeGraduateSchool': educationLevel.SomeGraduateSchool,
    'MastersDegree': educationLevel.MastersDegree,
    'Doctoral Degree': educationLevel.DoctoralDegree,
  };

  export const veteranStatusMapping: Record<string, veteranStatus> = {
    'I am not a veteran': veteranStatus.NotAVeteran,
    'I belong to several classifications of protected veterans': veteranStatus.BelongToSeveralClassifications,
    'I am NOT a protected veteran': veteranStatus.NotProtectedVeteran,
    'I choose not to identify my veteran status': veteranStatus.ChooseNotToIdentify,
  };

  export const housingStatusMapping: Record<string, housingStatus> = {
    'Rent': housingStatus.Rent,
    'Own': housingStatus.Own,
    'Currently Displaced': housingStatus.CurrentlyDisplaced,
  };

  export const YesNoBooleanMapping: Record<string, boolean> = {
    'Yes': true,
    'No': false,
  };