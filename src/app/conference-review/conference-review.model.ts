import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Conference } from "../conference/conference.model";
import { User } from "../user/user.model";

@Entity()
export class ConferenceReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "decimal",
  })
  score: number;

  @ManyToOne(() => Conference, (conference) => conference.reviews)
  conference: Conference;

  @ManyToOne(() => User, (user) => user.conferenceReviews)
  user: User;
}
