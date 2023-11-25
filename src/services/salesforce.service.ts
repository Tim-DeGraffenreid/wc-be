import { parent, student } from '@prisma/client'
import axios from 'axios'
// //FixThis: Put these in vercel environment variables when you switch out of
const tokenUrl = 'https://test.salesforce.com/services/oauth2/token' // Salesforce token endpoint URL (sandbox:test.salesforce.com/services/oauth2/token , org:login.salesforce.com/services/oauth2/token)
const clientId =
  '3MVG9hz9IjkO5fmXfTXB7b8yqSriTKfV0s6_o7NY8LqV5QzqrAZfv1tr1R9lcGzhDTkuwhJeDtdCU4ABbyKTb' //  Salesforce client ID
const clientSecret = '5D0CD956812C248B312C5FCCD6D748A038D41F90EEBA7B7BC319C3DAE076DFB3' // Salesforce client secret
const username = 'timd061677@wecodekc.org.eventtest' // Salesforce username
const password = 'T1i2m3d4@sf' //Salesforce password
const securityToken = 'yz5NJ0qP3FanqJx0Awb8UqVJ3' //Salesforce security token

// // Function to obtain an access token using the Salesforce user-password flow
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
      CreatedDate: student.created_at,
      Email: student.email,
      LastName: student.lName,
      FirstName: student.fName,
      Phone: student.phoneNumber,
      Birthdate: student.birthday,
      Grade__c: student.grade,
      School__c: student.schoolName,
      Gender__c: student.gender,
      MailingPostalCode: student.zipCode,
      Id: student.id,
    }
    const response = await apiClient.post('/services/data/v52.0/sobjects/Contact', data)

    return response.data
  } catch (error) {
    console.error('Creation of student to salesforce failed:', error)
    throw error
  }
}

export const addParentToSalesforce = async (parent: parent) => {
  try {
    const data = {
      Parent_or_Student__c: 'parent',
      CreatedDate: parent.created_at,
      Email: parent.email,
      LastName: parent.lName,
      FirstName: parent.fName,
      Phone: parent.phoneNumber,
      Birthdate: parent.birthday,
      Education_Level__c: parent.educationLevel,
      Veteran_Status__c: parent.veteranStatus,
      Do_you_have_regular_transportation__c: parent.regularTransportation,
      Residence_Type__c: parent.housingStatus,
      Id: parent.id,
    }
    const response = await apiClient.post('/services/data/v52.0/sobjects/Contact', data)

    return response.data
  } catch (error) {
    console.error('Creation of student to salesforce failed:', error)
    throw error
  }
}

export const updateStudentSalesforce = async (id: string, student: student) => {
  try {
    const data = {
      CreatedDate: student.created_at,
      Email: student.email,
      LastName: student.lName,
      FirstName: student.fName,
      Phone: student.phoneNumber,
      Birthdate: student.birthday,
      Grade__c: student.grade,
      School__c: student.schoolName,
      Gender__c: student.gender,
      MailingPostalCode: student.zipCode,
    }

    const response = await apiClient.patch(
      `/services/data/v52.0/sobjects/Contact/${id}`,
      data
    )

    return response.data
  } catch (error) {
    console.error('Update of student to salesforce failed:', error)
    throw error
  }
}

export const updateParentSalesforce = async (id: string, parent: parent) => {
  try {
    const data = {
      CreatedDate: parent.created_at,
      Email: parent.email,
      LastName: parent.lName,
      FirstName: parent.fName,
      Phone: parent.phoneNumber,
      Birthdate: parent.birthday,
      Education_Level__c: parent.educationLevel,
      Veteran_Status__c: parent.veteranStatus,
      Do_you_have_regular_transportation__c: parent.regularTransportation,
      Residence_Type__c: parent.housingStatus,
    }
    const response = await apiClient.patch(
      `/services/data/v52.0/sobjects/Contact/${id}`,
      data
    )

    return response.data
  } catch (error) {
    console.error('Update of student to salesforce failed:', error)
    throw error
  }
}

export const deleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`/services/data/v52.0/sObjects/Contact/${id}`)

    return response.data
  } catch (error) {
    console.error('Deletion of salesforce failed:', error)
    throw error
  }
}

export const syncDatabaseAndSalesforce = async () => {
  try {
    const salesforceData = await getDataFromSalesforce()

    console.log(salesforceData)
  } catch (error) {
    console.error('Error while syncing', error)
    throw error
  }
}

export const getDataFromSalesforce = async () => {
  try {
    const response = await apiClient.get(
      `/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName,Email,CreatedDate,Parent_or_Student__c,Phone,BirthDate,Grade__c,School__c,Gender__c,MailingPostalCode,Education_Level__c,Veteran_Status__c,Do_you_have_regular_transportation__c,Residence_Type__c+FROM+Contact`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching data from salesforce:', error)
    throw error
  }
}

// testing

// // Function to add a new Contact in Salesforce
// export const addContact = async (contactData: any) => {
// try {
//     const response = await apiClient.post(
//       '/services/data/v52.0/sobjects/Contact',
//       contactData
//     )
//     return response.data
//   } catch (error) {
//     console.error('Contact creation failed:', error)
//     throw error
//   }
// }

// export const updateStudent = async (contactId: string, contactData: any) => {
//   try {
//     const response = await apiClient.patch(
//       `/services/data/v52.0/sobjects/Contact/${contactId}`,
//       contactData
//     )
//     return response.data
//   } catch (error) {
//     console.error('Contact update failed:', error)
//     throw error
//   }
// }

// // Function to update a Contact in Salesforce
// export const updateContact = async (contactId: string, contactData: any) => {
//   try {
//     const response = await apiClient.patch(
//       `/services/data/v52.0/sobjects/Contact/${contactId}`,
//       contactData
//     )
//     return response.data
//   } catch (error) {
//     console.error('Contact update failed:', error)
//     throw error
//   }
// }

// //Function to add student and create relationship with parent and child
// export const addStudent = async (compositeData: any) => {
//   try {
//     const response = await apiClient.post('/services/data/v58.0/composite', compositeData)
//     return response.data
//   } catch (error) {
//     console.error('Add Student Failed: ', error)
//     throw error
//   }
// }

// export const getStudentDashboardData = async (email: string) => {
//   try {
//     const response = await apiClient.get(
//       `/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName+FROM+Contact+WHERE+Email='${email}'`
//     )
//     return response
//   } catch (error) {
//     console.error('Getting Student Dashboard failed: ', error)
//     throw error
//   }
// }

// export const getDashboardData = async (email: string) => {
//   const json = {
//     allOrNone: false,
//     collateSubrequests: false,
//     compositeRequest: [
//       {
//         method: 'GET',
//         url: `/services/data/v58.0/sobjects/Contact/Email/${email}?fields=Id,FirstName,LastName`,
//         referenceId: 'refContact',
//       },
//       {
//         method: 'GET',
//         referenceId: 'refStudents',
//         url: "/services/data/v58.0/query?q=SELECT+Id,FirstName+FROM+Contact+WHERE+Id+IN+(SELECT+npe4__Contact__c+FROM+npe4__Relationship__c+WHERE+npe4__RelatedContact__c='@{refContact.Id}')",
//       },
//     ],
//   }
//   try {
//     const response = await apiClient.post('/services/data/v58.0/composite', json)
//     const { data } = response
//     return data
//   } catch (error) {
//     console.log('Fetching dashboard data failed:', error)
//     throw error
//   }
// }
// export const getStudents = async (email: string) => {
//   const compositeJSON = {
//     allOrNone: false, //Set to false so even if subrequests fail, we still get the parent id
//     collateSubrequests: false,
//     compositeRequest: [
//       {
//         method: 'GET',
//         url: `/services/data/v58.0/sobjects/Contact/Email/${email}?fields=Id`,
//         referenceId: 'refContact',
//       },
//       {
//         method: 'GET',
//         referenceId: 'refStudents',
//         url: "/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName,MobilePhone,Name,Email,Birthdate,Grade__c,School__c,Gender__c,MailingPostalCode,Emergency_Contact__c+FROM+Contact+WHERE+Id+IN+(SELECT+npe4__Contact__c+FROM+npe4__Relationship__c+WHERE+npe4__RelatedContact__c='@{refContact.Id}')",
//       },
//     ],
//   }

//   try {
//     const response = await apiClient.post('/services/data/v58.0/composite', compositeJSON)
//     return response.data
//   } catch (error) {
//     console.error('Fetching contact and related students failed:', error)
//     throw error
//   }
// }

// export const testing_updateStudent = async () => {
//   try {
//     const response = await apiClient.get(
//       '/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName+FROM+Contact+WHERE+FirstName=Tim'
//     )

//     return response.data
//   } catch (error) {
//     console.error('Encountered Error:', error)
//   }
// }

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
