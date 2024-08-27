CREATE TABLE Patients
(
    id            SERIAL PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(250) NOT NULL
);

CREATE TABLE Specializations
(
    id    SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);

CREATE TABLE Doctors
(
    id                SERIAL PRIMARY KEY,
    first_name        VARCHAR(50) NOT NULL,
    last_name         VARCHAR(50) NOT NULL,
    specialization_id INT NOT NULL,
    FOREIGN KEY (specialization_id) REFERENCES Specializations(id) ON DELETE SET NULL
);

CREATE TABLE Appointments
(
    id                SERIAL PRIMARY KEY,
    patient_id        INT  NOT NULL,
    doctor_id         INT  NOT NULL,
    specialization_id INT  NOT NULL,
    appointment_date  DATE NOT NULL,
    appointment_time  TIME NOT NULL,
    duration          INT  NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES Doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (specialization_id) REFERENCES Specializations(id) ON DELETE CASCADE
);

CREATE TABLE Availability
(
    id             SERIAL PRIMARY KEY,
    doctor_id      INT NOT NULL,
    available_date DATE NOT NULL,
    available_time TIME NOT NULL,
    duration       INT  NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES Doctors(id) ON DELETE CASCADE
);
