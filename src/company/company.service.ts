import { Company } from "../models/Company"


export class CompanyService {

    constructor() {
        
    }
    
    public all = () => {
        return Company.find().then(res => res).catch(err => console.log(err)
        )
    }
}