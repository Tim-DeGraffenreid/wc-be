// import axios from 'axios'

// // Define Salesforce configuration in environment variables
// const tokenUrl = process.env.SALESFORCE_TOKEN_URL // Salesforce token endpoint URL
// const clientId = process.env.SALESFORCE_CLIENT_ID // Salesforce client ID
// const clientSecret = process.env.SALESFORCE_CLIENT_SECRET // Salesforce client secret
// const username = process.env.SALESFORCE_USERNAME // Salesforce username
// const password = process.env.SALESFORCE_PASSWORD // Salesforce password
// const securityToken = process.env.SALESFORCE_SECURITY_TOKEN // Salesforce security token

// // Function to obtain an access token using the Salesforce user-password flow
// const getAccessToken = async () => {
//   try {
//     const response = await axios.post(
//       tokenUrl,
//       new URLSearchParams({
//         grant_type: 'password',
//         client_id: clientId,
//         client_secret: clientSecret,
//         username: `${username}`,
//         password: `${password}${securityToken}`,
//       }).toString(),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     )
//     return response.data.access_token
//   } catch (error) {
//     console.error('Access token retrieval failed:', error)
//     throw error
//   }
// }

// // Create the API client instance
// const apiClient = axios.create({
//   baseURL: process.env.SALESFORCE_INSTANCE_URL, // Replace with Salesforce instance_url from environment variables
// })

// // Add the access token and authorization date to the request headers
// apiClient.interceptors.request.use(async (config) => {
//   const accessToken = await getAccessToken()
//   config.headers.Authorization = `Bearer ${accessToken}`
//   config.headers['X-Authorization-Date'] = new Date().toUTCString()
//   return config
// })

// // Function to handle API requests and error handling
// const handleRequest = async (request) => {
//   try {
//     const response = await request
//     return response.data
//   } catch (error) {
//     console.error('API request failed:', error)
//     throw error
//   }
// }

// // Function to add a new Contact in Salesforce
// export const addContact = async (contactData) => {
//   return handleRequest(
//     apiClient.post('/services/data/v52.0/sobjects/Contact', contactData)
//   )
// }

// // Function to update a Contact in Salesforce
// export const updateContact = async (contactId, contactData) => {
//   return handleRequest(
//     apiClient.patch(`/services/data/v52.0/sobjects/Contact/${contactId}`, contactData)
//   )
// }

// // Function to add a student and create a relationship with parent and child
// export const addStudent = async (compositeData) => {
//   return handleRequest(apiClient.post('/services/data/v58.0/composite', compositeData))
// }

// // Function to get student dashboard data
// export const getStudentDashboardData = async (email) => {
//   return handleRequest(
//     apiClient.get(
//       `/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName+FROM+Contact+WHERE+Email='${email}'`
//     )
//   )
// }

// // Function to fetch dashboard data
// export const getDashboardData = async (email) => {
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
//         url: `/services/data/v58.0/query?q=SELECT+Id,FirstName+FROM+Contact+WHERE+Id+IN+(SELECT+npe4__Contact__c+FROM+npe4__Relationship__c+WHERE+npe4__RelatedContact__c='${refContact.Id}')`,
//       },
//     ],
//   }

//   return handleRequest(apiClient.post('/services/data/v58.0/composite', json))
// }

// // Function to fetch contact and related students
// export const getStudents = async (email) => {
//   const compositeJSON = {
//     allOrNone: false,
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
//         url: `/services/data/v58.0/query?q=SELECT+Id,FirstName,LastName,MobilePhone,Name,Email,Birthdate,Grade__c,School__c,Gender__c,MailingPostalCode,Emergency_Contact__c+FROM+Contact+WHERE+Id+IN+(SELECT+npe4__Contact__c+FROM+npe4__Relationship__c+WHERE+npe4__RelatedContact__c='${refContact.Id}')`,
//       },
//     ],
//   }

//   return handleRequest(apiClient.post('/services/data/v58.0/composite', compositeJSON))
// }

// export default apiClient
