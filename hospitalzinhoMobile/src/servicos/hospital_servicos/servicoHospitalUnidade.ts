import { HospitalUnidade } from "@/src/Models/Hospital/hospitalmodels";
import CrudService from "../_servicoPai";

class servicoHospitalUnidade extends CrudService<HospitalUnidade>{
    constructor() {
        super("hospitalunidade");
    }
}
const hospitalUnidadeService = new servicoHospitalUnidade();
export default hospitalUnidadeService;