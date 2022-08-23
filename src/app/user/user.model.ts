import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ConferenceAttendance } from "../attendance/attendance.model";
import { ConferenceReview } from "../conference-review/conference-review.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
  })
  firstName: string;

  @Column({
    type: "text",
  })
  lastName: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    type: "text",
    unique: true,
  })
  email: string;

  @Column({
    type: "boolean",
    nullable: true,
  })
  isAdmin: boolean;

  @OneToMany(
    () => ConferenceReview,
    (conferenceReview) => conferenceReview.user
  )
  conferenceReviews: ConferenceReview[];

  @OneToMany(
    () => ConferenceAttendance,
    (conferenceAttendance) => conferenceAttendance.user
  )
  attendances: ConferenceAttendance[];
}
