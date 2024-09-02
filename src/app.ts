import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { join } from 'path';

import { AuthRouter } from './api/auth/auth.router';
import { PatientRouter } from './api/patient/patient.router';
import { SpecializationRouter } from './api/specialization/specialization.router';
import { DoctorRouter } from './api/doctor/doctor.router';
import { AvailRouter } from './api/availability/avail.router';
import { AppointmentRouter } from './api/appointment/appointment.router';

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();

app.use(json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: 'postgres',
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.use('/api/v1/auth', new AuthRouter(pool).router);
app.use('/api/v1/patients', new PatientRouter(pool).router);
app.use('/api/v1/specializations', new SpecializationRouter(pool).router);
app.use('/api/v1/doctors', new DoctorRouter(pool).router);
app.use('/api/v1/availabilities', new AvailRouter(pool).router);
app.use('/api/v1/appointments', new AppointmentRouter(pool).router);

export default app;
