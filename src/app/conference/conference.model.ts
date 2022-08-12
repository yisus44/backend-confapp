import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ConferenceReview } from "../conference-review/conference-review.model";

@Entity()
export class Conference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
  })
  conferenceName: string;

  @Column({
    type: "text",
  })
  location: string;

  @Column({
    type: "text",
    nullable: true,
  })
  img: string;

  @OneToMany(
    () => ConferenceReview,
    (conferenceReview) => conferenceReview.conference
  )
  reviews: ConferenceReview[];
}
