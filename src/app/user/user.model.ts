import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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

  @OneToMany(
    () => ConferenceReview,
    (conferenceReview) => conferenceReview.user
  )
  conferenceReviews: ConferenceReview[];
}
