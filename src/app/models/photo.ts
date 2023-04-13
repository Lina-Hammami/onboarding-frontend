import { Claim } from './claim'
export class Photo {
    _id!: number;
    title!: String;
    description!: String;
    link!: String;
    date!: Date;
    claim!: Claim;
    // data!:byte[];
  }