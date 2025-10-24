import { Hospital } from "@/src/Models/Hospital/hospitalmodels";
import CrudService from "../_servicoPai";

class HospitalService extends CrudService<Hospital> {
  constructor() {
    super("hospital");
  }
}

const hospitalService = new HospitalService();
export default hospitalService;