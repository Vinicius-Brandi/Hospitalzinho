-- Inserts de exemplo para o banco Hospitalzinho
-- Geração automática de inserts para todas as tabelas do script de criação.
-- Ajuste valores conforme necessário.

BEGIN;

-- HOSPITAL / ENDEREÇO / UNIDADE
INSERT INTO hospital (id, nome, cnes, cnpj, token_acesso) VALUES (nextval('seq_hospital'), 'Hospital Infantil Exemplo', '1234567', '12.345.678/0001-99', 'token-exemplo-123');
INSERT INTO hospital_endereco (id, cep, cidade, bairro, rua, numero, complemento) VALUES (nextval('seq_hospital_endereco'), '12345-678', 'Cidade Exemplo', 'Bairro Exemplo', 'Rua A', '100', 'Próximo ao parque');
INSERT INTO hospital_unidade (id, nome, tipo_unidade, endereco_id, instituicao_pai_id) VALUES (nextval('seq_hospital_unidade'), 'Unidade Principal', 1, 1, 1);

-- ESTRUTURA FÍSICA: ALA / QUARTO / SALA
INSERT INTO ala (id, nome, hospital_unidade_id) VALUES (nextval('seq_ala'), 'Ala Pediatria', 1);
INSERT INTO quarto (id, numero, ala_id, tipo, capacidade) VALUES (nextval('seq_quarto'), '101', 1, 1, 2);
INSERT INTO sala (id, numero, ala_id, tipo) VALUES (nextval('seq_sala'), 'S1', 1, 1);

-- ESPECIALIDADE / PROFISSIONAL
INSERT INTO especialidade (id, nome) VALUES (nextval('seq_especialidade'), 'Pediatria');
INSERT INTO profissional_saude (id, nome, registro_profissional, especialidade_id, hospital_unidade_id) VALUES (nextval('seq_profissional'), 'Dr. João Silva', 'CRM12345', 1, 1);

-- PACIENTE / PRONTUÁRIO / CONTATOS / ENDEREÇOS / CONVÊNIOS
INSERT INTO paciente (id, nome, cns, cpf, data_nascimento, nome_pai, nome_mae, cpf_pai, cpf_mae, ativo, sexo, nacionalidade, raca, naturalidade, escolaridade) VALUES (nextval('seq_paciente'), 'Maria da Silva', '987654321', '123.456.789-00', '2015-06-01', 'Carlos Silva', 'Ana Silva', '111.111.111-11', '222.222.222-22', true, 2, 'Brasileira', 1, 'Cidade Exemplo', 3);
INSERT INTO paciente_prontuario (id, paciente_id, tipo_sangue) VALUES (nextval('seq_prontuario'), 1, 2);
INSERT INTO paciente_contato (id, paciente_id, telefone_residencial, telefone_celular, email) VALUES (nextval('seq_paciente_contato'), 1, '(11) 3333-4444', '(11) 99999-0000', 'maria.exemplo@email.com');
INSERT INTO paciente_endereco (id, paciente_id, logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES (nextval('seq_paciente_endereco'), 1, 'Rua das Flores', '200', 'Casa', 'Centro', 'Cidade Exemplo', 'SP', '12345-000');

INSERT INTO convenio (id, nome, cnpj, registro_ans) VALUES (nextval('seq_convenio'), 'Convênio Exemplo', '98.765.432/0001-11', 'ANS-12345');
INSERT INTO paciente_convenio (id, paciente_id, convenio_id, numero_carteira, validade, ativo) VALUES (nextval('seq_paciente_convenio'), 1, 1, '000111222', '2026-12-31', true);

-- EXAMES (tipos) e PacienteExame
INSERT INTO exame_tipo (id, nome, descricao) VALUES (nextval('seq_exame_tipo'), 'Hemograma', 'Exame completo de sangue');
INSERT INTO paciente_exame (id, prontuario_id, data_exame, tipo_exame_id, laboratorio, resultados, observacoes, profissional_id, hospital_unidade_id) VALUES (nextval('seq_paciente_exame'), 1, now(), 1, 'Laboratório ABC', 'Result OK', 'Sem observações', 1, 1);

-- CONSULTAS / CIRURGIAS / INTERNAÇÕES
INSERT INTO paciente_consulta (id, prontuario_id, data_consulta, profissional_id, observacoes, sala_id, hospital_unidade_id) VALUES (nextval('seq_consulta'), 1, now(), 1, 'Consulta de rotina', 1, 1);
INSERT INTO paciente_cirurgia (id, prontuario_id, nome, data_cirurgia, profissional_responsavel_id, sala_id, hospital_unidade_id, observacoes) VALUES (nextval('seq_cirurgia'), 1, 'Apendicectomia', now(), 1, 1, 1, 'Sem intercorrências');
INSERT INTO paciente_internacao (id, prontuario_id, data_internacao, data_alta, quarto_id, motivo, profissional_responsavel_id, observacoes, hospital_unidade_id) VALUES (nextval('seq_internacao'), 1, now(), now() + interval '3 days', 1, 'Observação', 1, 'Paciente em observação', 1);

-- DOENÇAS CRÔNICAS / ALERGIAS
INSERT INTO doenca_cronica_modelo (id, nome, cid, descricao) VALUES (nextval('seq_doenca_modelo'), 'Asma', 'J45', 'Asma brônquica');
INSERT INTO paciente_doenca_cronica (id, prontuario_id, doenca_modelo_id, data_diagnostico, estagio, observacoes, em_tratamento) VALUES (nextval('seq_paciente_doenca'), 1, 1, '2020-01-01', 'Leve', 'Controlada com medicação', true);
INSERT INTO alergia (id, prontuario_id, nome, tipo) VALUES (nextval('seq_alergia'), 1, 'Penicilina', 1);

-- MEDICAMENTOS / MODELOS
INSERT INTO medicamento_modelo (id, nome, principio_ativo, fabricante, forma_farmaceutica, dosagem, indicacoes, contra_indicacoes) VALUES (nextval('seq_medicamento_modelo'), 'Xarope Exemplo', 'Paracetamol', 'Farmacêutica X', 'Xarope', '10mg/mL', 'Dor e febre', 'Nenhuma');
INSERT INTO medicamento (id, modelo_id, lote, data_fabricacao, data_validade, quantidade_disponivel, hospital_unidade_id) VALUES (nextval('seq_medicamento'), 1, 'L001', '2024-01-01', '2026-01-01', 100, 1);

-- RECEITAS / ITENS / PACIENTE_MEDICACAO
INSERT INTO receita (id, paciente_id, profissional_id, data, hospital_unidade_id) VALUES (nextval('seq_receita'), 1, 1, now(), 1);
INSERT INTO item_receita (id, receita_id, medicamento_modelo_id, quantidade, posologia) VALUES (nextval('seq_item_receita'), 1, 1, 1, '1 colher a cada 8 horas');
INSERT INTO paciente_medicacao (id, prontuario_id, medicamento_modelo_id, dosagem_prescrita, frequencia, via_administracao, observacoes, data_inicio) VALUES (nextval('seq_paciente_medicacao'), 1, 1, '5mL', '8h', 'Oral', 'Uso contínuo', now());

-- VACINAS / MODELO / VACINAÇÃO
INSERT INTO vacina_modelo (id, nome, fabricante, tipo, indicacao, numero_doses) VALUES (nextval('seq_vacina_modelo'), 'Vacina Exemplo', 'Fabricante Y', 'Viral', 'Rotina', 2);
INSERT INTO vacina (id, vacina_modelo_id, lote, data_producao, data_validade, quantidade_disponivel, hospital_unidade_id) VALUES (nextval('seq_vacina'), 1, 'V001', '2024-01-01', '2026-01-01', 50, 1);
INSERT INTO paciente_vacinacao (id, prontuario_id, vacina_id, profissional_responsavel_id, data_aplicacao, dose_numero, observacoes, hospital_unidade_id) VALUES (nextval('seq_paciente_vacinacao'), 1, 1, 1, now(), 1, 'Aplicada sem reação', 1);

-- Adicionando mais dados de exemplo (múltiplos registros) para testes

-- Hospitais adicionais
INSERT INTO hospital (id, nome, cnes, cnpj, token_acesso) VALUES (nextval('seq_hospital'), 'Hospital Sul Exemplo', '7654321', '98.765.432/0001-88', 'token-sul-456');
INSERT INTO hospital (id, nome, cnes, cnpj, token_acesso) VALUES (nextval('seq_hospital'), 'Hospital Norte Exemplo', '1112223', '11.222.333/0001-44', 'token-norte-789');

-- Endereços adicionais
INSERT INTO hospital_endereco (id, cep, cidade, bairro, rua, numero, complemento) VALUES (nextval('seq_hospital_endereco'), '23456-789', 'Cidade Dois', 'Bairro Dois', 'Avenida B', '500', 'Prédio 2');
INSERT INTO hospital_endereco (id, cep, cidade, bairro, rua, numero, complemento) VALUES (nextval('seq_hospital_endereco'), '34567-890', 'Cidade Três', 'Bairro Três', 'Rua C', '10', 'Anexo');

-- Unidades adicionais (assumindo instituicao_pai_id já existe: 1,2,3 conforme inserts acima)
INSERT INTO hospital_unidade (id, nome, tipo_unidade, endereco_id, instituicao_pai_id) VALUES (nextval('seq_hospital_unidade'), 'Unidade Sul', 2, 2, 2);
INSERT INTO hospital_unidade (id, nome, tipo_unidade, endereco_id, instituicao_pai_id) VALUES (nextval('seq_hospital_unidade'), 'Unidade Norte', 1, 3, 3);

-- Aumentando alas, quartos e salas
INSERT INTO ala (id, nome, hospital_unidade_id) VALUES (nextval('seq_ala'), 'Ala Neonatal', 1);
INSERT INTO ala (id, nome, hospital_unidade_id) VALUES (nextval('seq_ala'), 'Ala Cirúrgica', 2);

INSERT INTO quarto (id, numero, ala_id, tipo, capacidade) VALUES (nextval('seq_quarto'), '102', 1, 1, 1);
INSERT INTO quarto (id, numero, ala_id, tipo, capacidade) VALUES (nextval('seq_quarto'), '201', 2, 2, 3);

INSERT INTO sala (id, numero, ala_id, tipo) VALUES (nextval('seq_sala'), 'S2', 1, 1);
INSERT INTO sala (id, numero, ala_id, tipo) VALUES (nextval('seq_sala'), 'S3', 2, 2);

-- Especialidades e profissionais adicionais
INSERT INTO especialidade (id, nome) VALUES (nextval('seq_especialidade'), 'Cirurgia Pediátrica');
INSERT INTO especialidade (id, nome) VALUES (nextval('seq_especialidade'), 'Neonatologia');

INSERT INTO profissional_saude (id, nome, registro_profissional, especialidade_id, hospital_unidade_id) VALUES (nextval('seq_profissional'), 'Dra. Ana Pereira', 'CRM54321', 2, 1);
INSERT INTO profissional_saude (id, nome, registro_profissional, especialidade_id, hospital_unidade_id) VALUES (nextval('seq_profissional'), 'Dr. Pedro Alves', 'CRM67890', 3, 2);

-- Pacientes adicionais
INSERT INTO paciente (id, nome, cns, cpf, data_nascimento, nome_pai, nome_mae, cpf_pai, cpf_mae, ativo, sexo, nacionalidade, raca, naturalidade, escolaridade) VALUES (nextval('seq_paciente'), 'João Santos', '123123123', '222.333.444-55', 'Luiz Santos', 'Mariana Santos', '333.333.333-33', '444.444.444-44', true, 1, 'Brasileiro', 2, 'Cidade Dois', 2);
INSERT INTO paciente (id, nome, cns, cpf, data_nascimento, nome_pai, nome_mae, cpf_pai, cpf_mae, ativo, sexo, nacionalidade, raca, naturalidade, escolaridade) VALUES (nextval('seq_paciente'), 'Lucas Oliveira', '555666777', '555.666.777-88', 'Ricardo Oliveira', 'Paula Oliveira', '555.555.555-55', '666.666.666-66', true, 1, 'Brasileiro', 1, 'Cidade Três', 2);

-- Prontuários para novos pacientes
INSERT INTO paciente_prontuario (id, paciente_id, tipo_sangue) VALUES (nextval('seq_prontuario'), 2, 3);
INSERT INTO paciente_prontuario (id, paciente_id, tipo_sangue) VALUES (nextval('seq_prontuario'), 3, 1);

-- Contatos e endereços para novos pacientes
INSERT INTO paciente_contato (id, paciente_id, telefone_residencial, telefone_celular, email) VALUES (nextval('seq_paciente_contato'), 2, '(21) 2222-3333', '(21) 98888-7777', 'joao.santos@email.com');
INSERT INTO paciente_endereco (id, paciente_id, logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES (nextval('seq_paciente_endereco'), 2, 'Rua B', '50', 'Apto 101', 'Bairro B', 'Cidade Dois', 'RJ', '23456-000');

INSERT INTO paciente_contato (id, paciente_id, telefone_residencial, telefone_celular, email) VALUES (nextval('seq_paciente_contato'), 3, NULL, '(31) 97777-6666', 'lucas.oliveira@email.com');
INSERT INTO paciente_endereco (id, paciente_id, logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES (nextval('seq_paciente_endereco'), 3, 'Avenida C', '300', NULL, 'Bairro C', 'Cidade Três', 'MG', '34567-000');

-- Convênios adicionais
INSERT INTO convenio (id, nome, cnpj, registro_ans) VALUES (nextval('seq_convenio'), 'Plano Saúde A', '12.345.678/0001-00', 'ANS-00001');
INSERT INTO paciente_convenio (id, paciente_id, convenio_id, numero_carteira, validade, ativo) VALUES (nextval('seq_paciente_convenio'), 2, 2, 'ABC123', '2027-01-01', true);

-- Exames adicionais
INSERT INTO exame_tipo (id, nome, descricao) VALUES (nextval('seq_exame_tipo'), 'Raio-X', 'Imagem radiológica');
INSERT INTO paciente_exame (id, prontuario_id, data_exame, tipo_exame_id, laboratorio, resultados, observacoes, profissional_id, hospital_unidade_id) VALUES (nextval('seq_paciente_exame'), 2, now(), 2, 'Lab Dois', 'Normal', 'Sem observações', 2, 1);

-- Consultas e procedimentos adicionais
INSERT INTO paciente_consulta (id, prontuario_id, data_consulta, profissional_id, observacoes, sala_id, hospital_unidade_id) VALUES (nextval('seq_consulta'), 2, now() - interval '7 days', 2, 'Retorno pós-operatório', 2, 2);
INSERT INTO paciente_consulta (id, prontuario_id, data_consulta, profissional_id, observacoes, sala_id, hospital_unidade_id) VALUES (nextval('seq_consulta'), 3, now() - interval '1 days', 1, 'Primeira consulta', 1, 1);

INSERT INTO paciente_cirurgia (id, prontuario_id, nome, data_cirurgia, profissional_responsavel_id, sala_id, hospital_unidade_id, observacoes) VALUES (nextval('seq_cirurgia'), 2, 'Correção Hérnia', now() - interval '10 days', 2, 2, 2, 'Sem intercorrências');

INSERT INTO paciente_internacao (id, prontuario_id, data_internacao, data_alta, quarto_id, motivo, profissional_responsavel_id, observacoes, hospital_unidade_id) VALUES (nextval('seq_internacao'), 2, now() - interval '12 days', now() - interval '9 days', 2, 'Pós-operatório', 2, 'Alta estável', 2);

-- Doenças e alergias adicionais
INSERT INTO doenca_cronica_modelo (id, nome, cid, descricao) VALUES (nextval('seq_doenca_modelo'), 'Diabetes Tipo 1', 'E10', 'Diabetes mellitus tipo 1');
INSERT INTO paciente_doenca_cronica (id, prontuario_id, doenca_modelo_id, data_diagnostico, estagio, observacoes, em_tratamento) VALUES (nextval('seq_paciente_doenca'), 2, 3, '2018-05-01', 'Moderado', 'Uso de insulina', true);
INSERT INTO alergia (id, prontuario_id, nome, tipo) VALUES (nextval('seq_alergia'), 3, 'Latex', 2);

-- Medicamentos e estoques adicionais
INSERT INTO medicamento_modelo (id, nome, principio_ativo, fabricante, forma_farmaceutica, dosagem, indicacoes, contra_indicacoes) VALUES (nextval('seq_medicamento_modelo'), 'Dipirona', 'Metamizol', 'Lab Y', 'Comprimido', '500mg', 'Dor', 'Hipersensibilidade');
INSERT INTO medicamento (id, modelo_id, lote, data_fabricacao, data_validade, quantidade_disponivel, hospital_unidade_id) VALUES (nextval('seq_medicamento'), 2, 'L002', '2023-06-01', '2025-06-01', 200, 1);

-- Receitas e paciente_medicacao adicionais
INSERT INTO receita (id, paciente_id, profissional_id, data, hospital_unidade_id) VALUES (nextval('seq_receita'), 2, 2, now() - interval '11 days', 2);
INSERT INTO item_receita (id, receita_id, medicamento_modelo_id, quantidade, posologia) VALUES (nextval('seq_item_receita'), 2, 2, 20, '1 comprimido a cada 8 horas');
INSERT INTO paciente_medicacao (id, prontuario_id, medicamento_modelo_id, dosagem_prescrita, frequencia, via_administracao, observacoes, data_inicio, data_fim) VALUES (nextval('seq_paciente_medicacao'), 2, 2, '500mg', '8h', 'Oral', 'Durante 20 dias', now() - interval '11 days', now() + interval '9 days');

-- Vacinas adicionais
INSERT INTO vacina_modelo (id, nome, fabricante, tipo, indicacao, numero_doses) VALUES (nextval('seq_vacina_modelo'), 'Vacina B', 'Lab Z', 'Bacteriana', 'Rotina', 1);
INSERT INTO vacina (id, vacina_modelo_id, lote, data_producao, data_validade, quantidade_disponivel, hospital_unidade_id) VALUES (nextval('seq_vacina'), 2, 'V002', '2023-02-01', '2025-02-01', 100, 2);
INSERT INTO paciente_vacinacao (id, prontuario_id, vacina_id, profissional_responsavel_id, data_aplicacao, dose_numero, observacoes, hospital_unidade_id) VALUES (nextval('seq_paciente_vacinacao'), 2, 2, 2, now() - interval '30 days', 1, 'Aplicada', 2);

-- *******************************************
-- Inserções em massa para testes (generate_series)
-- *******************************************

-- 100 pacientes adicionais
INSERT INTO paciente (id, nome, cns, cpf, data_nascimento, nome_pai, nome_mae, cpf_pai, cpf_mae, ativo, sexo, nacionalidade, raca, naturalidade, escolaridade)
SELECT nextval('seq_paciente'), 'Paciente Teste ' || i, 'CNS' || i, LPAD(i::text,11,'0'),
	   (CURRENT_DATE - ((i % 8000) || ' days')::interval)::date,
	   'Pai ' || i, 'Mae ' || i, LPAD((i+1000)::text,11,'0'), LPAD((i+2000)::text,11,'0'), true, ((i % 2) + 1), 'Brasileiro', ((i % 5) + 1), 'Cidade ' || ((i % 20) + 1), ((i % 4) + 1)
FROM generate_series(100,599) AS s(i);

-- Criar prontuários para os pacientes sem prontuário
INSERT INTO paciente_prontuario (id, paciente_id, tipo_sangue, data_abertura, ultima_atualizacao)
SELECT nextval('seq_prontuario'), p.id, (floor(random()*4)+1)::int, now() - ((floor(random()*365))::int || ' days')::interval, now()
FROM paciente p
LEFT JOIN paciente_prontuario pr ON pr.paciente_id = p.id
WHERE pr.id IS NULL;

-- Inserir 50 especialidades extras
INSERT INTO especialidade (id, nome)
SELECT nextval('seq_especialidade'), 'Especialidade ' || i
FROM generate_series(1,50) AS s(i);

-- Inserir 100 profissionais aleatórios
INSERT INTO profissional_saude (id, nome, registro_profissional, especialidade_id, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_profissional'), 'Profissional ' || i, 'REG' || LPAD((10000+i)::text,5,'0'),
	   (SELECT id FROM especialidade ORDER BY random() LIMIT 1),
	   (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM generate_series(1,100) AS s(i);

-- Exames em massa: 500 exames distribuídos aleatoriamente
INSERT INTO paciente_exame (id, prontuario_id, data_exame, tipo_exame_id, laboratorio, resultados, observacoes, profissional_id, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_paciente_exame'),
	   (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1),
	   now() - ((floor(random()*365))::int || ' days')::interval,
	   (SELECT id FROM exame_tipo ORDER BY random() LIMIT 1),
	   'Lab ' || (floor(random()*20)+1), 'Resultado ' || (floor(random()*1000)::text), 'nenhuma',
	   (SELECT id FROM profissional_saude ORDER BY random() LIMIT 1),
	   (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM generate_series(1,500) AS s(i);

-- Consultas em massa: 400 registros
INSERT INTO paciente_consulta (id, prontuario_id, data_consulta, profissional_id, observacoes, sala_id, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_consulta'),
	   (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1),
	   now() - ((floor(random()*900))::int || ' days')::interval,
	   (SELECT id FROM profissional_saude ORDER BY random() LIMIT 1),
	   'Consulta gerada para teste',
	   (SELECT id FROM sala ORDER BY random() LIMIT 1),
	   (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM generate_series(1,400) AS s(i);

-- Cirurgias em massa: 50 registros
INSERT INTO paciente_cirurgia (id, prontuario_id, nome, data_cirurgia, profissional_responsavel_id, sala_id, hospital_unidade_id, observacoes, data_cadastro, data_atualizacao)
SELECT nextval('seq_cirurgia'),
	   (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1),
	   'Procedimento ' || i,
	   now() - ((floor(random()*1200))::int || ' days')::interval,
	   (SELECT id FROM profissional_saude ORDER BY random() LIMIT 1),
	   (SELECT id FROM sala ORDER BY random() LIMIT 1),
	   (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), 'Sem observações', now(), now()
FROM generate_series(1,50) AS s(i);

-- Internações em massa: 150 registros
INSERT INTO paciente_internacao (id, prontuario_id, data_internacao, data_alta, quarto_id, motivo, profissional_responsavel_id, observacoes, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_internacao'),
	   (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1),
	   now() - ((floor(random()*1000))::int || ' days')::interval,
	   now() - ((floor(random()*900))::int || ' days')::interval,
	   (SELECT id FROM quarto ORDER BY random() LIMIT 1), 'Motivo test',
	   (SELECT id FROM profissional_saude ORDER BY random() LIMIT 1), 'Observação teste',
	   (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM generate_series(1,150) AS s(i);

-- Doenças crônicas: 30 modelos adicionais
INSERT INTO doenca_cronica_modelo (id, nome, cid, descricao, data_cadastro, data_atualizacao)
SELECT nextval('seq_doenca_modelo'), 'Doença Modelo ' || i, 'CID' || i, 'Descrição ' || i, now(), now()
FROM generate_series(1,30) AS s(i);

-- Atribuir doenças a pacientes aleatoriamente
INSERT INTO paciente_doenca_cronica (id, prontuario_id, doenca_modelo_id, data_diagnostico, estagio, observacoes, em_tratamento, data_cadastro, data_atualizacao)
SELECT nextval('seq_paciente_doenca'),
	   (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1),
	   (SELECT id FROM doenca_cronica_modelo ORDER BY random() LIMIT 1),
	   now() - ((floor(random()*4000))::int || ' days')::interval,
	   'Estagio ' || (floor(random()*3)+1), 'Obs', (random() > 0.3), now(), now()
FROM generate_series(1,200) AS s(i);

-- Alergias em massa
INSERT INTO alergia (id, prontuario_id, nome, tipo, data_cadastro, data_atualizacao)
SELECT nextval('seq_alergia'), (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1), 'Alergia ' || i, (floor(random()*3)+1), now(), now()
FROM generate_series(1,200) AS s(i);

-- Medicamento_modelo em massa
INSERT INTO medicamento_modelo (id, nome, principio_ativo, fabricante, forma_farmaceutica, dosagem, indicacoes, contra_indicacoes, data_cadastro, data_atualizacao)
SELECT nextval('seq_medicamento_modelo'), 'Medicamento ' || i, 'Ativo ' || i, 'Lab ' || (floor(random()*10)+1), 'Forma ' || (floor(random()*4)+1), 'Dosagem ' || (floor(random()*500)+1) || 'mg', 'Indicação ' || i, 'Contra ' || i, now(), now()
FROM generate_series(1,100) AS s(i);

-- Medicamentos em estoque
INSERT INTO medicamento (id, modelo_id, lote, data_fabricacao, data_validade, quantidade_disponivel, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_medicamento'), mm.id, 'L' || LPAD((1000+i)::text,4,'0'), now() - ((floor(random()*1000))::int || ' days')::interval, now() + ((floor(random()*1000))::int || ' days')::interval, (floor(random()*500)+1)::int, (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM (SELECT id FROM medicamento_modelo ORDER BY id LIMIT 100) mm
CROSS JOIN generate_series(1,1) AS g(i);

-- Receitas (500) e itens de receita
INSERT INTO receita (id, paciente_id, profissional_id, data, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_receita'), (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1), (SELECT id FROM profissional_saude ORDER BY random() LIMIT 1), now() - ((floor(random()*400))::int || ' days')::interval, (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM generate_series(1,500) AS s(i);

INSERT INTO item_receita (id, receita_id, medicamento_modelo_id, quantidade, posologia, data_cadastro, data_atualizacao)
SELECT nextval('seq_item_receita'), r.id, (SELECT id FROM medicamento_modelo ORDER BY random() LIMIT 1), (floor(random()*30)+1)::int, '1 unidade a cada 8h', now(), now()
FROM receita r
WHERE r.id > 0
ORDER BY random()
LIMIT 700;

-- Paciente_medicacao (uso contínuo) para alguns prontuários
INSERT INTO paciente_medicacao (id, prontuario_id, medicamento_modelo_id, dosagem_prescrita, frequencia, via_administracao, observacoes, data_inicio, data_fim, data_cadastro, data_atualizacao)
SELECT nextval('seq_paciente_medicacao'), (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1), (SELECT id FROM medicamento_modelo ORDER BY random() LIMIT 1), 'Dose ' || (floor(random()*500)+1) || 'mg', '12h', 'Oral', 'Uso contínuo', now() - ((floor(random()*200))::int || ' days')::interval, now() + ((floor(random()*200))::int || ' days')::interval, now(), now()
FROM generate_series(1,200) AS s(i);

-- Vacinas em massa
INSERT INTO vacina_modelo (id, nome, fabricante, tipo, indicacao, numero_doses, intervalo_entre_doses, data_cadastro, data_atualizacao)
SELECT nextval('seq_vacina_modelo'), 'Vacina Modelo ' || i, 'Lab ' || (floor(random()*10)+1), 'Tipo ' || (floor(random()*3)+1), 'Indicação ' || i, (floor(random()*3)+1), '30 days'::interval, now(), now()
FROM generate_series(1,50) AS s(i);

INSERT INTO vacina (id, vacina_modelo_id, lote, data_producao, data_validade, quantidade_disponivel, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_vacina'), vm.id, 'VL' || LPAD((100+i)::text,4,'0'), now() - ((floor(random()*400))::int || ' days')::interval, now() + ((floor(random()*800))::int || ' days')::interval, (floor(random()*200)+1)::int, (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM (SELECT id FROM vacina_modelo ORDER BY id LIMIT 50) vm;

-- Registros de vacinação em massa
INSERT INTO paciente_vacinacao (id, prontuario_id, vacina_id, profissional_responsavel_id, data_aplicacao, dose_numero, observacoes, hospital_unidade_id, data_cadastro, data_atualizacao)
SELECT nextval('seq_paciente_vacinacao'), (SELECT id FROM paciente_prontuario ORDER BY random() LIMIT 1), (SELECT id FROM vacina ORDER BY random() LIMIT 1), (SELECT id FROM profissional_saude ORDER BY random() LIMIT 1), now() - ((floor(random()*400))::int || ' days')::interval, (floor(random()*3)+1), 'Registro teste', (SELECT id FROM hospital_unidade ORDER BY random() LIMIT 1), now(), now()
FROM generate_series(1,500) AS s(i);

COMMIT;
