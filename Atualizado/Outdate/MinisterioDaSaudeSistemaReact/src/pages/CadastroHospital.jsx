import { useState } from 'react';
import { Footer } from '../components/Header_and_Footer/Footer';
import { Header } from '../components/Header_and_Footer/Header';
import './CadastroHospital.css'

export function CadastroHospital(){
    const [tipoCadastro, setTipoCadastro] = useState("instituicao")

    return (
        <>
            <Header />
            <title>Cadastro de Hospital - Secretaria Municipal de Saúde</title>
            <main>
                <h1>Cadastro de Novo Hospital</h1>

                <section id="cadastro-hospital">
                    <h2>Informações da Unidade</h2>
                    <form action="#" method="post">
                        
                        <div class="form-group-selector">
                            <label for="tipoCadastro">Tipo de Cadastro</label>
                            <select id="tipoCadastro" name="tipoCadastro" value={tipoCadastro} onChange={(e) => setTipoCadastro(e.target.value)}>
                                <option value="instituicao" selected>Instituição Principal</option>
                                <option value="unidade">Unidade Vinculada</option>
                            </select>
                        </div>

                        {tipoCadastro == 'instituicao' && (
                            <fieldset>
                                <legend>Dados Gerais</legend>
                                <div class="form-grid">
                                    <div class="form-group full-width">
                                        <label for="nome-hospital">Nome do Hospital / Unidade</label>
                                        <input type="text" id="nome-hospital" name="nome-hospital" required maxlength="255"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="cnes-hospital">CNES</label>
                                        <input type="text" id="cnes-hospital" name="cnes-hospital" maxlength="7"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="cnpj-hospital">CNPJ</label>
                                        <input type="text" id="cnpj-hospital" name="cnpj-hospital" placeholder="XX.XXX.XXX/XXXX-XX"/>
                                    </div>

                                </div>
                            </fieldset>
                        )}

                        {tipoCadastro == "unidade" && (
                            <fieldset>
                                <legend>Endereço</legend>
                                <div class="form-group full-width" id="vinculoInstituicaoContainer">
                                    <label for="instituicaoPaiId">Vincular à Instituição Principal</label>
                                    <input type="text" id="instituicaoPaiId" name="instituicaoPaiId" placeholder="Digite o CNPJ da instituição principal"/>
                                </div>
                                <div class="address-grid">
                                    <div class="form-group">
                                        <label for="cep">CEP:</label>
                                        <input type="text" id="cep" name="cep" placeholder="XXXXX-XXX"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="cidade">Cidade:</label>
                                        <select id="cidade" name="cidade" required>
                                            <option value="" disabled selected>Selecione a cidade/distrito</option>
                                            <option value="marilia">Marília</option>
                                            <option value="amadeu-amaral">Amadeu Amaral</option>
                                            <option value="avencas">Avencas</option>
                                            <option value="dirceu">Dirceu</option>
                                            <option value="lacio">Lácio</option>
                                            <option value="padre-nobrega">Padre Nóbrega</option>
                                            <option value="rosalia">Rosália</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="bairro">Bairro:</label>
                                        <input type="text" id="bairro" name="bairro"/>
                                    </div>
                                    <div class="form-group full-width">
                                        <label for="rua">Rua:</label>
                                        <input type="text" id="rua" name="rua"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="numero">Número:</label>
                                        <input type="text" id="numero" name="numero"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="complemento">Complemento:</label>
                                        <input type="text" id="complemento" name="complemento"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="tipo-unidade-cadastro">Tipo de Unidade</label>
                                    <select id="tipo-unidade-cadastro" name="tipo-unidade-cadastro" required>
                                        <option value="" disabled selected>Selecione o tipo</option>
                                        <option value="ubs">Unidade Básica de Saúde (UBS) / Posto de Saúde</option>
                                        <option value="centro-saude">Centro de Saúde</option>
                                        <option value="ambulatorio">Ambulatório de Especialidade / Policlínica</option>
                                        <option value="clinica">Clínica Especializada</option>
                                        <option value="hospital-esp">Hospital Especializado</option>
                                        <option value="caps">Centro de Atenção Psicossocial (CAPS)</option>
                                        <option value="hospital-geral">Hospital Geral</option>
                                        <option value="hospital-dia">Hospital-Dia</option>
                                        <option value="upa">Unidade de Pronto Atendimento (UPA)</option>
                                        <option value="pronto-socorro">Pronto-Socorro</option>
                                        <option value="sadt">Serviços de Apoio Diagnóstico e Terapêutico (SADT)</option>
                                        <option value="farmacia">Farmácia</option>
                                        <option value="vigilancia">Vigilância Sanitária e Epidemiológica</option>
                                        <option value="reabilitacao">Centro de Reabilitação</option>
                                    </select>
                                </div>
                            </fieldset>
                        )}
                        <div class="botoes-form">
                            <button type="submit" class="btn-salvar">Salvar Cadastro</button>
                            <button type="button" class="btn-cancelar" onclick="window.location.href='Admin_ConsultaHospital.html'">Cancelar</button>
                        </div>
                    </form>
                </section>
                
            </main>
            <Footer/>
        </>
    );
}