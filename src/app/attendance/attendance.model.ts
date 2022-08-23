import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Conference } from "../conference/conference.model";
import { User } from "../user/user.model";

@Entity()
export class ConferenceAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conference, (conference) => conference.attendance)
  conference: Conference;

  @ManyToOne(() => User, (user) => user.attendances)
  user: User;
}
