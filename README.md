# Hospital Appointment Scheduler API

## 📋 Content

<ol type="1">
  <li>Project Description</li>
  <li>Technical Requirements</li>
  <li>Base URL</li>
  <li>Database Documentation</li>
  <li>API Documentation
    <ul>
      <li>/api/v1/auth</li>
      <li>/api/v1/patients</li>
      <li>/api/v1/specializations</li>
      <li>/api/v1/doctors</li>
      <li>/api/v1/availabilities</li>
      <li>/api/v1/appointments</li>
    </ul>
  </li>
  <li>How To Install And Run The Project</li>
  <li>How To Dockerize The Project</li>
</ol>

</br>

## ✏️ Project Description

</br>

## ✔️ Technical Requirements

* **Programming languages**: <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
* **Frameworks**: <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/>
* **Database**: <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
* **Package manager**: <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"/>
* **Other technologies**: <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/> 

</br>

## 🔗 Base URL

`http://localhost:80`

</br>

## 🗄️ Database Documentation

<img style="width: 625px" src="https://github.com/user-attachments/assets/f8c4868e-95ce-4a95-8d92-006794cfd244"/>

</br>
</br>

<table>
  <tr>
    <td colspan="8"><strong>patients</strong></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>PK</td>
    <td>FK</td>
    <td>NN</td>
    <td>UQ</td>
    <td>Default</td>
    <td>Attributes</td>
  </tr>
  <tr>
    <td>id</td>
    <td>serial</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>username</td>
    <td>varchar(50)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td>✔️</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>first_name</td>
    <td>varchar(50)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>last_name</td>
    <td>varchar(50)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>email</td>
    <td>varchar(100)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td>✔️</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>password_hash</td>
    <td>varchar(250)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

</br>

<table>
  <tr>
    <td colspan="8"><strong>specializations</strong></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>PK</td>
    <td>FK</td>
    <td>NN</td>
    <td>UQ</td>
    <td>Default</td>
    <td>Attributes</td>
  </tr>
  <tr>
    <td>id</td>
    <td>serial</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>title</td>
    <td>varchar(50)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

</br>

<table>
  <tr>
    <td colspan="8"><strong>doctors</strong></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>PK</td>
    <td>FK</td>
    <td>NN</td>
    <td>UQ</td>
    <td>Default</td>
    <td>Attributes</td>
  </tr>
  <tr>
    <td>id</td>
    <td>serial</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>first_name</td>
    <td>varchar(50)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>last_name</td>
    <td>varchar(50)</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>specialization_id</td>
    <td>integer</td>
    <td></td>
    <td>✔️</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

</br>

<table>
  <tr>
    <td colspan="8"><strong>appointments</strong></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>PK</td>
    <td>FK</td>
    <td>NN</td>
    <td>UQ</td>
    <td>Default</td>
    <td>Attributes</td>
  </tr>
  <tr>
    <td>id</td>
    <td>serial</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>patient_id</td>
    <td>integer</td>
    <td></td>
    <td>✔️</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>doctor_id</td>
    <td>integer</td>
    <td></td>
    <td>✔️</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>specialization_id</td>
    <td>integer</td>
    <td></td>
    <td>✔️</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>appointment_date</td>
    <td>date</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>appointment_time</td>
    <td>time</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>duration</td>
    <td>integer</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

</br>

<table>
  <tr>
    <td colspan="8"><strong>availability</strong></td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>PK</td>
    <td>FK</td>
    <td>NN</td>
    <td>UQ</td>
    <td>Default</td>
    <td>Attributes</td>
  </tr>
  <tr>
    <td>id</td>
    <td>serial</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>doctor_id</td>
    <td>integer</td>
    <td></td>
    <td>✔️</td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>available_date</td>
    <td>date</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>available_time</td>
    <td>time</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>duration</td>
    <td>integer</td>
    <td></td>
    <td></td>
    <td>✔️</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

</br>

**Specializations -> Doctors (1:N)**

*One specialization can belong to many doctors*

</br>

**Appointments -> Patients (N:1)**

*Many appointments can belong to one patient*

</br>

**Appointments -> Doctors (N:1)**

*Many appointments can belong to one doctor*

</br>

**Appointments -> Specializations (N:1)**

*Many appointments can belong to one specialization*

</br>

**Doctors -> Availability (1:N)**

*One doctor can have many availability records*

</br>

## ℹ️ API Documentation

#### 1. Endpoint `/api/v1/auth`:

* POST **Endpoint `/api/v1/auth/register`**
  
  * The server should return a status of 201 if the registration was successful
  * The server should return a status of 400 if the registration was unsuccessful
  * The server should return a status of 409 if the patient already exists
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>username</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Username</td>
  </tr>
  <tr>
    <td><code>firstName</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>First Name</td>
  </tr>
  <tr>
    <td><code>lastName</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Last Name</td>
  </tr>
  <tr>
    <td><code>email</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Email</td>
  </tr>
  <tr>
    <td><code>password</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Password</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'POST' \\\ </br>
'/api/v1/auth/register' \\\ </br>
 { </br>
  &emsp;"username": "test", </br>
  &emsp;"firstName": "test", </br>
  &emsp;"lastName": "test", </br>
   &emsp;"email": "test@gmail.com", </br>
   &emsp;"password": "123456" </br>
 } </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"username": "test", </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"email": "test@gmail.com", </br>
    &emsp;"password_hash": "$2b$10$wmuav.usLKBtL1KHKzfldudG8LiikrOMgm74d/H6lnJEa9I0oeIGq" </br>
} </br>
</br>

* POST **Endpoint `/api/v1/auth/login`**

  * The server should return a status of 200 if the login was successful
  * The server should return a status of 400 if the registration was unsuccessful
  * The server should return a status of 401 if the patient credentials are not correct
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>username</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Username</td>
  </tr>
  <tr>
    <td><code>password</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Password</td>
  </tr>
</table>
</br>

**Request**

> curl -X 'POST' \\\ </br>
'/api/v1/auth/login' \\\ </br>
 { </br>
  &emsp;"username": "test", </br>
   &emsp;"password": "password" </br>
 } </br>

**Response body example** 

> { </br>
    &emsp;"message": "Patient logged in", </br>
    &emsp;"token": "token", </br>
} </br>
<br/>

* POST **Endpoint `/api/v1/auth/refresh`**

  Takes token from cookie and generates new tokens

  * The server should return a status of 200 if the tokens were successfully generated
  * The server should return a status of 400 if the generating was unsuccessful
  * The server should return a status of 401 if the patient is not logged in
</br>

**Request**


> curl -X 'POST' \\\ </br>
'/api/v1/auth/refresh' \\\ </br>

**Response body example** 

> "token"

<br/><br/>

#### 2. Endpoint: `/api/v1/patients`

* GET **Endpoint `/api/v1/patients/:id`**

  Finds patient by ID
  
  * The server should return a status of 200 if the patient was successfuly found
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the patient is not found
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Patient's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/auth/patients/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"username": "test", </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"email": "test@gmail.com", </br>
    &emsp;"password_hash": "$2b$10$wmuav.usLKBtL1KHKzfldudG8LiikrOMgm74d/H6lnJEa9I0oeIGq" </br>
} </br>
</br>

* GET **Endpoint `/api/v1/patients`**

  Finds all patients
  
  * The server should return a status of 200 if the patients were successfuly returned
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/auth/patients' \\\ </br>

**Response body example** 

> [{ </br>
    &emsp;"id": 1, </br>
    &emsp;"username": "test", </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"email": "test@gmail.com", </br>
    &emsp;"password_hash": "$2b$10$wmuav.usLKBtL1KHKzfldudG8LiikrOMgm74d/H6lnJEa9I0oeIGq" </br>
}, <br/>
> { </br>
    &emsp;"id": 2, </br>
    &emsp;"username": "test2", </br>
    &emsp;"first_name": "test2", </br>
    &emsp;"last_name": "test2", </br>
    &emsp;"email": "test2@gmail.com", </br>
    &emsp;"password_hash": "$2b$10$wmuav.usLKBtL1KHKzfldudG8LiikrOMgm74fsj65GSl7snfjcGwkd" </br>
}] </br>
</br>

* PATCH **Endpoint `/api/v1/patients/:id`**

  Updates patient with passed ID
  
  * The server should return a status of 200 if the patient was successfuly updated
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 403 if the patient updates data other than theirs
  * The server should return a status of 404 if the patient doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Patient's ID</td>
  </tr>
  <tr>
    <td><code>username</code></td>
    <td>string</td>
    <td></td>
    <td>Username</td>
  </tr>
  <tr>
    <td><code>firstName</code></td>
    <td>string</td>
    <td></td>  
    <td>First Name</td>
  </tr>
  <tr>
    <td><code>lastName</code></td>
    <td>string</td>
    <td></td>
    <td>Last Name</td>
  </tr>
  <tr>
    <td><code>email</code></td>
    <td>string</td>
    <td></td>
    <td>Email</td>
  </tr>
  <tr>
    <td><code>password</code></td>
    <td>string</td>
    <td></td>
    <td>Password</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'PATCH' \\\ </br>
'/api/v1/auth/patients/1' \\\ </br>
 { </br>
  &emsp;"username": "test3", </br>
   &emsp;"email": "test3@gmail.com", </br>
 } </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"username": "test3", </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"email": "test3@gmail.com", </br>
    &emsp;"password_hash": "$2b$10$wmuav.usLKBtL1KHKzfldudG8LiikrOMgm74d/H6lnJEa9I0oeIGq" </br>
} </br>
</br>

* DELETE **Endpoint `/api/v1/patients/:id`**

  Deletes patient with passed ID
  
  * The server should return a status of 204 if the patient was successfuly deleted
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 403 if the patient deletes data other than theirs
  * The server should return a status of 404 if the patient doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Patient's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'DELETE' \\\ </br>
'/api/v1/auth/patients/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"message": 'Patient deleted' </br>
} </br>

</br></br>

#### 3. Endpoint: `/api/v1/specializations`

* GET **Endpoint `/api/v1/specializations/:id`**

  Finds specialization by ID
  
  * The server should return a status of 200 if the specialization was successfuly found
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the specialization is not found
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Specialization's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/specializations/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"title": "test", </br>
} </br>
</br>

* GET **Endpoint `/api/v1/specializations`**

  Finds all specializations
  
  * The server should return a status of 200 if the specializations were successfuly returned
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/auth/specializations' \\\ </br>

**Response body example** 

> [{ </br>
    &emsp;"id": 1, </br>
    &emsp;"title": "test", </br>
}, <br/>
> { </br>
    &emsp;"id": 2, </br>
    &emsp;"title": "test2", </br>
}] </br>
</br>

* POST **Endpoint `/api/v1/specializations`**

  Creates a new specialization
  
  * The server should return a status of 201 if the specialization creation was successful
  * The server should return a status of 400 if the specialization creation was unsuccessful
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 409 if the specialization already exists
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>title</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Specialization title</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'POST' \\\ </br>
'/api/v1/auth/specializations' \\\ </br>
 { </br>
  &emsp;"title": "test", </br>
 } </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"title": "test", </br>
} </br>
</br>

* PATCH **Endpoint `/api/v1/specializations/:id`**

  Updates specialization with passed ID
  
  * The server should return a status of 200 if the specialization was successfuly updated
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the specialization doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>title</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Specialization title</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'PATCH' \\\ </br>
'/api/v1/auth/specializations/1' \\\ </br>
 { </br>
  &emsp;"title": "test2", </br>
 } </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"title": "test2", </br>
} </br>
</br>

* DELETE **Endpoint `/api/v1/specializations/:id`**

  Deletes specialization with passed ID
  
  * The server should return a status of 204 if the specialization was successfuly deleted
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the specialization doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Specialization's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'DELETE' \\\ </br>
'/api/v1/auth/specializations/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"message": 'Specialization deleted' </br>
} </br>

</br></br>

#### 4. Endpoint: `/api/v1/auth/doctors`

* GET **Endpoint `/api/v1/doctors/:id`**

  Finds doctor by ID
  
  * The server should return a status of 200 if the doctor was successfuly found
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the doctor is not found
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Doctor's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/auth/doctors/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"specialization_id": "1", </br>
} </br>
</br>

* GET **Endpoint `/api/v1/doctors`**

  Finds all doctors
  
  * The server should return a status of 200 if the doctors were successfuly returned
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/auth/doctors' \\\ </br>

**Response body example** 

> [{ </br>
    &emsp;"id": 1, </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"specialization_id": "1", </br>
}, </br>
> { </br>
    &emsp;"id": 2, </br>
    &emsp;"first_name": "test2", </br>
    &emsp;"last_name": "test2", </br>
    &emsp;"specialization_id": "1", </br>
}] </br>
</br>

* POST **Endpoint `/api/v1/doctors`**

  Creates a new doctor
  
  * The server should return a status of 201 if the doctor creation was successful
  * The server should return a status of 400 if the doctor creation was unsuccessful
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the specialization with passed id doesnt exist
  * The server should return a status of 409 if the doctor already exists
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>first_name</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Doctor's first name</td>
  </tr>
  <tr>
    <td><code>last_name</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Doctor's last name</td>
  </tr>
  <tr>
    <td><code>specialization_id</code></td>
    <td>number</td>
    <td>✔️</td>
    <td>Specialization id</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'POST' \\\ </br>
'/api/v1/auth/doctors' \\\ </br>
 { </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"specialization_id": "1", </br>
} </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"first_name": "test", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"specialization_id": "1", </br>
} </br>
</br>

* PATCH **Endpoint `/api/v1/doctors/:id`**

  Updates doctor with passed ID
  
  * The server should return a status of 200 if the doctor was successfuly updated
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the specialization with passed id doesn't exist
  * The server should return a status of 404 if the doctor with passed id doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>first_name</code></td>
    <td>string</td>
    <td></td>
    <td>Doctor's first name</td>
  </tr>
  <tr>
    <td><code>last_name</code></td>
    <td>string</td>
    <td></td>
    <td>Doctor's last name</td>
  </tr>
  <tr>
    <td><code>specialization_id</code></td>
    <td>number</td>
    <td></td>
    <td>Specialization id</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'PATCH' \\\ </br>
'/api/v1/auth/doctors/1' \\\ </br>
 { </br>
  &emsp;"first_name": "test2", </br>
 } </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"first_name": "test2", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"specialization_id": "1", </br>
} </br>
</br>

* DELETE **Endpoint `/api/v1/doctors/:id`**

  Deletes doctor with passed ID
  
  * The server should return a status of 204 if the doctor was successfuly deleted
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the doctor doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Doctor's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'DELETE' \\\ </br>
'/api/v1/auth/doctors/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"message": 'Doctor deleted' </br>
} </br>

</br></br>

#### 5. Endpoint: `/api/v1/availabilities`

* GET **Endpoint `/api/v1/availabilities/:id`**

  Finds availability by ID
  
  * The server should return a status of 200 if the availability was successfuly found
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the availability is not found
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Availability's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/auth/availabilities/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"doctor_id": 1, </br>
    &emsp;"available_date": "2024-10-10", </br>
    &emsp;"available_time": "14:30", </br>
    &emsp;"duration": 40 </br>
} </br>
</br>

* GET **Endpoint `/api/v1/availabilities/`**

  Finds all availabilities
  
  * The server should return a status of 200 if the availabilities were successfuly returned
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
</br>

**Request**


> curl -X 'GET' \\\ </br>
'/api/v1/auth/availabilities' \\\ </br>

**Response body example** 

> [{ </br>
    &emsp;"id": 1, </br>
    &emsp;"doctor_id": 1, </br>
    &emsp;"available_date": "2024-10-10", </br>
    &emsp;"available_time": "14:30", </br>
    &emsp;"duration": 40 </br>
}, </br>
> { </br>
    &emsp;"id": 2, </br>
    &emsp;"doctor_id": 1, </br>
    &emsp;"available_date": "2024-10-10", </br>
    &emsp;"available_time": "18:30", </br>
    &emsp;"duration": 25 </br>
}] </br>
</br>

* POST **Endpoint `/api/v1/availabilities/`**

  Creates a new availability
  
  * The server should return a status of 201 if the availability creation was successful
  * The server should return a status of 400 if the availability creation was unsuccessful
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the doctor with passed id doesnt exist
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>doctor_id</code></td>
    <td>number</td>
    <td>✔️</td>
    <td>Doctor's ID</td>
  </tr>
  <tr>
    <td><code>available_date</code></td>
    <td>date</td>
    <td>✔️</td>
    <td>Available date</td>
  </tr>
  <tr>
    <td><code>available_time</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Available time</td>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>number</td>
    <td>✔️</td>
    <td>Duration in min</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'POST' \\\ </br>
'/api/v1/availabilities' \\\ </br>
 { </br>
    &emsp;"doctor_id": 1, </br>
    &emsp;"available_date": "2024-10-10", </br>
    &emsp;"available_time": "14:30", </br>
    &emsp;"duration": 50 </br>
} </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"doctor_id": 1, </br>
    &emsp;"available_date": "2024-10-10", </br>
    &emsp;"available_time": "14:30", </br>
    &emsp;"duration": 50 </br>
} </br>
</br>

* PATCH **Endpoint `/api/v1/availabilities/:id`**

  Updates availability with passed ID
  
  * The server should return a status of 200 if the availability was successfuly updated
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the doctor with passed id doesn't exist
  * The server should return a status of 404 if the availability with passed id doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>first_name</code></td>
    <td>string</td>
    <td></td>
    <td>Doctor's first name</td>
  </tr>
  <tr>
    <td><code>last_name</code></td>
    <td>string</td>
    <td></td>
    <td>Doctor's last name</td>
  </tr>
  <tr>
    <td><code>specialization_id</code></td>
    <td>number</td>
    <td></td>
    <td>Specialization id</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'PATCH' \\\ </br>
'/api/v1/availabilities/1' \\\ </br>
 { </br>
  &emsp;"first_name": "test2", </br>
 } </br>

**Response body example** 

> { </br>
    &emsp;"id": 1, </br>
    &emsp;"first_name": "test2", </br>
    &emsp;"last_name": "test", </br>
    &emsp;"specialization_id": "1", </br>
} </br>
</br>

* DELETE **Endpoint `/api/v1/availabilities/:id`**

  Deletes availability with passed ID
  
  * The server should return a status of 204 if the availability was successfuly deleted
  * The server should return a status of 400 if any other errors occurred
  * The server should return a status of 401 if the patient is not logged in
  * The server should return a status of 404 if the availability doesn't exist 
</br>
<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Required</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>✔️</td>
    <td>Doctor's ID</td>
  </tr>
</table>
</br>

**Request**


> curl -X 'DELETE' \\\ </br>
'/api/v1/availabilities/1' \\\ </br>

**Response body example** 

> { </br>
    &emsp;"message": 'Availability deleted' </br>
} </br>

</br></br>

#### 6. Endpoint: `/api/v1/appointments`

</br>

## 🚀 How To Install And Run The Project

## 🐋 How To Dockerize The Project

You need to have docker installed on your operating system to dockerize your project.

</br>

To build your service, run the following command

**`docker compose build`**

</br>

To build create and run your container, run the next command

**`docker compose up`**

</br>

Or just use *--build* option

**`docker compose up --build`**

</br>

To stop your container use

**`docker compose down`**
