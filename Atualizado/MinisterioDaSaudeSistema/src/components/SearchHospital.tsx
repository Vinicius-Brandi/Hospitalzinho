export function SearchHospital({tipoPesquisa, setTipoPesquisa, valorPesquisa, setValorPesquisa} : {tipoPesquisa : string, setTipoPesquisa: React.Dispatch<React.SetStateAction<string>>, valorPesquisa: string, setValorPesquisa: React.Dispatch<React.SetStateAction<string>>}){
    return (
        <div className="form-group">
            <label htmlFor="tipo-pesquisa">Pesquisar por:</label>
            <select id="tipo-pesquisa" name="tipo-pesquisa" onChange={(e) => setTipoPesquisa(e.target.value)} value={tipoPesquisa}>
                <option value="nome">Nome</option>
                <option value="cnes">CNES</option>
                <option value="cnpj">CNPJ</option>
            </select>
            <input type="text" id="valor-pesquisa" name="valor-pesquisa" placeholder={`Digite o ${tipoPesquisa} do hospital`} maxLength={255} style={{ marginTop: "0.5rem" }} value={valorPesquisa} onChange={(e) => setValorPesquisa(e.target.value)} />
        </div>
    )
}