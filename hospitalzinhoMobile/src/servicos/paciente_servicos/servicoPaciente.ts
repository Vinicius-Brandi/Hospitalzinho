import { PacientePostDto } from '@/src/Models/Paciente/pacienteModels';
import CrudService from '../_servicoPai';

class ServicoPaciente extends CrudService<PacientePostDto> {
  constructor() {
    super('paciente');
  }

  // specific endpoint for cadastro in backend
  async cadastro(dto: Partial<PacientePostDto>): Promise<any> {
    const response = await this.api.post(`/paciente/cadastro`, dto);
    return response.data;
  }
}

const pacienteService = new ServicoPaciente();
export default pacienteService;
