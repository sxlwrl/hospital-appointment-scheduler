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
'/register' \\\ </br>
 { </br>
  &emsp;"username": "username", </br>
  &emsp;"firstName": "firstName", </br>
  &emsp;"lastName": "lastName", </br>
   &emsp;"email": "email", </br>
   &emsp;"password": "password" </br>
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
'/login' \\\ </br>
 { </br>
  &emsp;"username": "username", </br>
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
'/refresh' \\\ </br>

**Response body example** 

> "token"

<br/><br/>

#### 2. Endpoint: `/api/v1/auth/patients`

#### 3. Endpoint: `/api/v1/auth/specializations`

#### 4. Endpoint: `/api/v1/auth/doctors`

#### 5. Endpoint: `/api/v1/auth/availabilities`

#### 6. Endpoint: `/api/v1/auth/appointments`

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
