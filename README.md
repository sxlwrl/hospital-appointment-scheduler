# Hospital Appointment Scheduler API

## 📋 Content

<ol type="1">
  <li>Project Description</li>
  <li>Technical Requirements</li>
  <li>Base URL</li>
  <li>Database Documentation</li>
  <li>API Documentation
    <ul>
      <li>/api/v1/register</li>
      <li>/api/v1/login</li>
      <li>test</li>
      <li>test</li>
    </ul>
  </li>
  <li>How To Install And Run The Project</li>
  <li>How To Dockerize The Project</li>
</ol>

## ✏️ Project Description

## ✔️ Technical Requirements

* **Programming languages**: <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
* **Frameworks**: <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/>
* **Database**: <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
* **Package manager**: <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"/>
* **Other technologies**: <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/> 

## 🔗 Base URL

`localhost:80`

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

## 🚀 How To Install And Run The Project

## 🐋 How To Dockerize The Project
