import { Photo } from './photo';
import { Policy } from './policy' 

 export enum Status{
    open,
    ongoing,
    closed
};

export class Claim {
    claimId!: number;
    claimNb!: string ;
    status!: Status;  
    accidentDate!: Date;
    creationDate!: Date;
    policy!: Policy;
    photos!: Photo[];

    constructor(){

    }

    
    
    // constructor(claimId: number, claimNb: string, status: Status, accidentDate: Date, creationDate: Date, policy: Policy, photos: Photo[] = []) {
    //     this.claimId = claimId;
    //     this.claimNb = claimNb;
    //     this.status = status;
    //     this.accidentDate = accidentDate;
    //     this.creationDate = creationDate;
    //     this.policy = policy;
    //     this.photos = photos;
    // }
}