import { parent, student } from '@prisma/client'
import axios from 'axios'
import prisma from '../utils/prisma'
// //FixThis: Put these in vercel environment variables when you switch out of
const tokenUrl = 'https://test.salesforce.com/services/oauth2/token' // Salesforce token endpoint URL (sandbox:test.salesforce.com/services/oauth2/token , org:login.salesforce.com/services/oauth2/token)
const clientId = process.env.SFCLIENTID //  Salesforce client ID
const clientSecret = process.env.SFCLIENTSECRET // Salesforce client secret
const username = process.env.SFUSERNAME // Salesforce username
const password = process.env.SFPASSWORD //Salesforce password
const securityToken = process.env.SFSECURITYTOKEN //Salesforce security token

// Function to obtain an access token using the Salesforce user-password flow
const getAccessToken = async () => {
  const response = await axios.post(
    tokenUrl,
    new URLSearchParams({
      grant_type: 'password',
      client_id: clientId,
      client_secret: clientSecret,
      username: `${username}`,
      password: `${password}${securityToken}`,
    }).toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  return response.data.access_token
}

// Create the API client instance
const apiClient = axios.create({
  baseURL: 'https://wecodekc--eventtest.sandbox.my.salesforce.com', // Replace with SF instance_url from Postman
})

// Add the access token and authorization date to the request headers
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken()
  config.headers.Authorization = `Bearer ${accessToken}`
  config.headers['X-Authorization-Date'] = new Date().toUTCString()
  return config
})

export const addStudentToSalesforce = async (student: student) => {
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
    }
    const response = await apiClient.post('/services/data/v52.0/sobjects/Contact', data) // and this is the common endpoint

    return response.data
  } catch (error: any) {
    console.error('Creation of Student to salesforce failed:', error)

    if (error.response) {
      console.error('Response error:', error.response.data[0]?.errorCode)

      throw error.response.data[0]?.errorCode
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Request setup error:', error.message)
    }
    throw error
  }
}

export const addParentToSalesforce = async (parent: parent) => {
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
    }

    const response = await apiClient.post('/services/data/v52.0/sobjects/Contact', data)

    return response.data
  } catch (error: any) {
    // console.error('Creation of parent to salesforce failed:', error)

    if (error.response) {
      // console.error('Response error:', error.response.data[0]?.errorCode)

      throw error.response.data[0]?.errorCode
    } else if (error.request) {
      // console.error('No response received:', error.request)
    } else {
      // console.error('Request setup error:', error.message)
    }
    throw error
  }
}

export const updateStudentSalesforce = async (id: string, student: student) => {
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
    }

    await apiClient.patch(`/services/data/v52.0/sobjects/Contact/${id}`, data)

    return 'successfully updated'
  } catch (error) {
    console.error('Update of student to salesforce failed:', error)
    throw error
  }
}

export const updateParentSalesforce = async (id: string, parent: parent) => {
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
    }
    await apiClient.patch(`/services/data/v52.0/sobjects/Contact/${id}`, data)

    return 'successfully updated'
  } catch (error) {
    console.error('Update of student to salesforce failed:', error)
    throw error
  }
}

export const deleteUser = async (id: string, type: 'parent' | 'student') => {
  try {
    await deleteRelationship(id, type)
    const response = await apiClient.delete(`/services/data/v58.0/sobjects/Contact/${id}`)

    console.log(response.data)

    return true
  } catch (error) {
    console.error('Deletion of salesforce failed:', error)
    throw error
  }
}

const deleteRelationship = async (id: string, type: 'parent' | 'student') => {
  try {
    const url =
      type === 'parent'
        ? `/services/data/v58.0/query?q=SELECT+Id+FROM+npe4__Relationship__c+WHERE+npe4__RelatedContact__c='${id}'+limit 1`
        : `/services/data/v58.0/query?q=SELECT+Id+FROM+npe4__Relationship__c+WHERE+npe4__Contact__c='${id}'+limit 1`
    const response = await apiClient.get(url)

    const records = response.data?.records

    records.forEach(async (record: any) => {
      await apiClient.delete(
        `/services/data/v58.0/sobjects/npe4__Relationship__c/${record.Id}`
      )
    })
    console.log('Deleted relationships successfully')
  } catch (error) {
    console.log(`Error deleting relationships: ${error}`)
    throw error
  }
}

export const syncDatabaseAndSalesforce = async () => {
  try {
    const salesforceData = await getDataFromSalesforce()

    salesforceData?.records?.forEach(async (record: any) => {
      const { Parent_or_Student__c, ...data } = record
      const convertedData = {
        email: data?.Email,
        lName: data?.LastName,
        fName: data?.FirstName,
        phoneNumber: data?.Phone,
        birthday: data?.Birthdate,
        educationLevel: data?.Education_Level__c,
        veteranStatus: data?.Veteran_Status__c,
        regularTransportation: data?.Do_you_have_regular_transportation__c,
        housingStatus: data?.Residence_Type__c,
        grade: data?.Grade__c,
        schoolName: data?.School__c,
        gender: data?.Gender__c,
        zipCode: data?.MailingPostalCode,
      }
      let savedData
      if (Parent_or_Student__c === 'parent') {
        savedData = await prisma.parent.update({
          where: { id: record.id, salesforceId: record?.id },
          data: { ...convertedData },
        })
      } else if (record?.Parent_or_Student__ === 'student') {
        savedData = await prisma.student.update({
          where: { id: record.id, salesforceId: record?.id },
          data: { ...convertedData },
        })
      }
    })

    return
  } catch (error) {
    console.error('Error while syncing', error)
    throw error
  }
}

export const handleParentToChildren = async () => {
  try {
    const data = await prisma.parent.findMany({ include: { student: true } })
    const existingRelationships = await getRelationshipsFromSalesforce()

    data.forEach(async (parent) => {
      for (const child of parent.student) {
        if (parent?.salesforceId && child?.salesforceId) {
          const isExistingRelationship = existingRelationships.some(
            (relationship: any) =>
              relationship.npe4__Contact__c === child.salesforceId &&
              relationship.npe4__RelatedContact__c === parent.salesforceId &&
              relationship.npe4__Type__c === 'Parent'
          )

          console.log(`${parent.salesforceId}: ${child.salesforceId}`)

          if (!isExistingRelationship) {
            await apiClient.post(`/services/data/v58.0/sobjects/npe4__Relationship__c`, {
              npe4__Contact__c: child.salesforceId,
              npe4__RelatedContact__c: parent.salesforceId,
              npe4__Type__c: 'Parent',
            })

            console.log('Added relationship to parent successfully')
          }
        }
      }
    })
    return
  } catch (error) {
    console.error('Error saving relationship to Salesforce:', error)
  }
}

const getDataFromSalesforce = async () => {
  try {
    const response = await apiClient.get(
      `/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName,Email,CreatedDate,Parent_or_Student__c,Phone,BirthDate,Grade__c,School__c,Gender__c,MailingPostalCode,Education_Level__c,Veteran_Status__c,Do_you_have_regular_transportation__c,Residence_Type__c+FROM+Contact`
    )
    return response.data || []
  } catch (error) {
    console.error('Error fetching data from salesforce:', error)
    throw error
  }
}

const getRelationshipsFromSalesforce = async () => {
  try {
    const response = await apiClient.get(
      '/services/data/v58.0/query?q=SELECT+npe4__Contact__c,npe4__RelatedContact__c,npe4__Type__c+FROM+npe4__Relationship__c'
    )

    return response.data?.records
  } catch (error) {
    throw error
  }
}

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
}

const Gender = {
  Male: 'Male',
  Female: 'Female',
  NonBinary: 'Non-Binary',
  PreferNotToSay: 'Prefer Not To Say',
}

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
}

const VeteranStatus = {
  NotAVeteran: 'I am not a veteran',
  BelongToSeveralClassifications:
    'I belong to one of the several classifications of protected veterans',
  NotProtectedVeteran: 'I am NOT a protected veteran',
  ChooseNotToIdentify: 'I choose not to identify my veteran status',
}

const HousingStatus = {
  Rent: 'Rent',
  Own: 'Own',
  CurrentlyDisplaced: 'Currently Displaced',
}

// export default apiClient
export const getStudentId = async () => {
  try {
    const response = await apiClient.get(
      "https://wecodekc--eventtest.sandbox.my.salesforce.com/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName,Parent_or_Student__c+FROM+Contact+WHERE+Parent_or_Student__c='student'"
    )
    return response.data
  } catch (error) {
    console.error('Encountered Error:', error)
  }
}

export const checkSalesforceForDuplicates = async (
  email?: string,
  phoneNumber?: string
) => {
  // try {
  const salesforceData = await getDataFromSalesforce()

  const exists = salesforceData?.records?.some(
    (record: any) => record?.Email === email || record?.Phone === phoneNumber
  )
  return exists
  // } catch (error) {
  //   throw error
  // }
}
