import { HospitalUnidade } from "@/src/Models/Hospital/hospitalmodels";
import CrudService from "../_servicoPai";

class servicoHospitalUnidade extends CrudService<HospitalUnidade>{
    constructor() {
        super("hospitalunidade");
    }
}
export default new servicoHospitalUnidade();