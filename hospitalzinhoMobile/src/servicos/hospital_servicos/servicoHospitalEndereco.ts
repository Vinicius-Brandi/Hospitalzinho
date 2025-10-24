import { HospitalEndereco } from "@/src/Models/Hospital/hospitalmodels";
import CrudService from "../_servicoPai";

class ServicoHospitalEndereco extends CrudService<HospitalEndereco>{
    constructor() {
        super("hospitalendereco");
    }
}
const hospitalEnderecoService = new ServicoHospitalEndereco();
export default hospitalEnderecoService;