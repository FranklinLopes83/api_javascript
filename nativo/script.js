let lista = document.querySelector("#lista")
let tabela = document.querySelector("#tabela")
let campoBusca = document.querySelector("#campo")
let btnFiltrar = document.querySelector("#filtrar")

async function carregarDados(){
    const url = "https://swapi.dev/api/people/?format=json"
    try {
        let resultado = await fetch(url)

        const dados = await resultado.json()

        for(elementos of dados.results){
            //console.log(`Sou ${elementos.name} nasci no ano ${elementos.birth_year}`)
            console.log(elementos)
            //Criando elementos HTML dinamicamente
            /*
            const itemLista = document.createElement("li")
            itemLista.classList.add("list-group-item")
            itemLista.textContent = `Olá, sou ${elementos.name}, meu gênereo é ${elementos.gender} e a cor do meu cabelo é ${elementos.hair_color}`

            lista.appendChild(itemLista)
            */

            //CRIANDO ELEMENTOS HTML

            const linha = document.createElement("tr")
            const tdNome = document.createElement("td") 
            const tdPeso = document.createElement("td")
            const tdCorOlho = document.createElement("td")

            //CRIANDO CONTEÚDO DA COLUNAS

            tdNome.textContent  = elementos.name
            tdPeso.textContent  = elementos.mass
            tdCorOlho.textContent  = elementos.eye_color

            //ADICIONANDO OS ELEMENTOS EM SUAS RESPECTIVAS TAGS MÃE/PAI

            linha.appendChild(tdNome)
            linha.appendChild(tdPeso)
            linha.appendChild(tdCorOlho)

            tabela.appendChild(linha)

        }
    
        //console.log(dados.results)
    } catch (error) {
        console.log("O seguinte erro ocorreu: ", error)
    }

}

async function filtrarDados(idPersonagem){
    const url = `https://swapi.dev/api/people//${idPersonagem}?format=json`
    try {
        let resultado = await fetch(url)
        const dados = await resultado.json()
        console.log(resultado)

        
        //CRIANDO ELEMENTOS HTML

        const linha = document.createElement("tr")
        const tdNome = document.createElement("td") 
        const tdPeso = document.createElement("td")
        const tdCorOlho = document.createElement("td")

        //CRIANDO CONTEÚDO DA COLUNAS

        tdNome.textContent  = dados.name
        tdPeso.textContent  = dados.mass
        tdCorOlho.textContent  = dados.eye_color

                while(resultado.status != 200){
                    btnFiltrar.setAttribute("disable", "disable")
                    btnFiltrar.textContent= "Carregando..."
                }

                btnFiltrar.removeAttribute("disable")
                    btnFiltrar.textContent= "filtrar"

        //ADICIONANDO OS ELEMENTOS EM SUAS RESPECTIVAS TAGS MÃE/PAI

        linha.appendChild(tdNome)
        linha.appendChild(tdPeso)
        linha.appendChild(tdCorOlho)

        //SE HOUVER ALGUUMA LINHA SERÁ REMOVIDA
        if(tabela.children.length > 0){
            tabela.removeChild(tabela.firstElementChild)
        }
        tabela.appendChild(linha)
        
        

    } catch (error) {
        console.log("O erro é o seguinte: ", error)
    }
}

//carregarDados()

btnFiltrar.addEventListener('click', (evento)=>{
    evento.preventDefault()
    if(campoBusca.value != "" && campoBusca.value >= 1 && campoBusca.value <= 82){
        filtrarDados(campoBusca.value)
        }
        else{
        alert("Insira um valor valído para pesquisar")
        }

}) 
