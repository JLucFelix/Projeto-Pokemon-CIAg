const exibicaoPokemon = document.getElementById('MostrarPokemon');
const botaoBuscar = document.getElementById('BotaoBuscar');
const inputPesquisa = document.getElementById('InputPesquisa');
const statsPokemon = document.getElementById('StatusPokemon');
const botaoAdicionar = document.getElementById('BotaoAdicionar');
const botaoMostrarFavoritos = document.getElementById('MostrarFavoritos');
const divListaFavoritos = document.getElementById("ListaFavoritos"); 

let pokemonAtual = null;

botaoBuscar.addEventListener('click', () => {
    const nomePokemon = inputPesquisa.value.toLowerCase();
    const url = 'https://pokeapi.co/api/v2/pokemon/' + nomePokemon;

    fetch(url)
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error('Pokémon não encontrado!');
        }
        return resposta.json();
    })
    .then(dados => {
        const elementoNome = exibicaoPokemon.querySelector("h2");
        const elementoId = exibicaoPokemon.querySelector("p");
        const elementoSprite = exibicaoPokemon.querySelector("img");
        const elementoTipo = exibicaoPokemon.querySelector("#TipoPokemon");
        const elementoHabilidade = exibicaoPokemon.querySelector("#HabilidadePokemon");
        const elementoStats = statsPokemon.querySelector("p");

        const nome = dados.name;
        const id = dados.id;
        const urlSprite = dados.sprites.front_default;
        const listaTipos = dados.types;
        const listaHabilidades = dados.abilities;
        const listaStats = dados.stats;
        
        const nomesTipos = listaTipos.map(item => item.type.name);
        const nomesHabilidades = listaHabilidades.map(item => item.ability.name);
        const statsFormatados = listaStats.map(item => `${item.stat.name}: ${item.base_stat}`);

        elementoNome.textContent = nome;
        elementoId.textContent = "#"+ id;
        elementoSprite.src = urlSprite;
        elementoSprite.alt = nome; 
        elementoTipo.textContent = "Tipos: " + nomesTipos.join(", ");
        elementoHabilidade.textContent = "Habilidades: " + nomesHabilidades.join(", ");
        elementoStats.innerHTML = statsFormatados.join("<br>");

        pokemonAtual = dados;
    })
    .catch(erro => {
        console.error(erro.message);
        exibicaoPokemon.querySelector("h2").textContent = "Pokémon não encontrado!";
        exibicaoPokemon.querySelector("p").textContent = "ID:";
        exibicaoPokemon.querySelector("img").src = "";
        pokemonAtual = null;
    }); 
});

botaoAdicionar.addEventListener('click', () => {
    if (pokemonAtual != null){
        const favoritosString = localStorage.getItem("PokemonFavorito");
        let favoritos = [];
        if (favoritosString != null){
            favoritos = JSON.parse(favoritosString);
        }
        const jaExiste = favoritos.some(pokemon => pokemon.id == pokemonAtual.id); 

        if (jaExiste) {
            console.log("Este Pokémon já está nos favoritos.");
            alert("Este Pokémon já está nos seus favoritos!");
        } else { 
            const pokemonParaAdicionar = { ...pokemonAtual }; 
            const inputAnotacao = document.getElementById("NotasPokemon");
            
            pokemonParaAdicionar.favID = crypto.randomUUID()
            pokemonParaAdicionar.note = inputAnotacao.value || ""; 

            favoritos.push(pokemonParaAdicionar);
            localStorage.setItem("PokemonFavorito", JSON.stringify(favoritos));
            
            console.log("Pokémon adicionado com o id"+ pokemonParaAdicionar.favID +"Agora existem " + favoritos.length + " favoritos");
            inputAnotacao.value = ""; 
        }
    }
});

botaoMostrarFavoritos.addEventListener('click', ()=>{
    const favoritosString = localStorage.getItem("PokemonFavorito");

    if (favoritosString == null){
        divListaFavoritos.textContent = "Você ainda não tem favoritos.";
        return;
    }
    const listaFavoritos = JSON.parse(favoritosString);
    if (listaFavoritos.length == 0) {
        divListaFavoritos.textContent = "Você ainda não tem favoritos.";
        return;
    }

    const htmlFavoritos = listaFavoritos.map(pokemon => {

        const textoAnotacao = pokemon.note || "(Sem anotação)";
        return `
            <div class = "favoriteItem"> 
                <img src = "${pokemon.sprites.front_default}" width ="50" alt="${pokemon.name}"> 
                <strong>${pokemon.name}</strong> (#${pokemon.id}) 
                <p>Anotação: ${textoAnotacao}</p>
                <button class="removeFavorite" data-id="${pokemon.id}">
                    Remover
                </button>
                <button class ="editNote" data-id="${pokemon.id}">
                    Editar Anotação
                </button>
            </div>`;
    }).join("");
    divListaFavoritos.innerHTML = htmlFavoritos;
});

divListaFavoritos.addEventListener('click', (evento)=>{

    if (evento.target.classList.contains('removeFavorite')){
        const idParaRemover = evento.target.dataset.id;
        const favoritosString = localStorage.getItem("PokemonFavorito");
        let favoritos = JSON.parse(favoritosString);
        const novaListaFavoritos = favoritos.filter(pokemon =>{
            return pokemon.id != idParaRemover;
        });
        
        localStorage.setItem("PokemonFavorito", JSON.stringify(novaListaFavoritos));
        botaoMostrarFavoritos.click();
    }
    else if(evento.target.classList.contains('editNote')){
        const idParaEditar = evento.target.dataset.id;

        const favoritosString = localStorage.getItem("PokemonFavorito");
        let favoritos = JSON.parse(favoritosString);
        
        const pokemonParaEditar = favoritos.find(pokemon => pokemon.id == idParaEditar);
        const novaAnotacao = prompt("Edite a anotação para " + pokemonParaEditar.name + ":", pokemonParaEditar.note); 

        if (novaAnotacao != null){
            pokemonParaEditar.note = novaAnotacao; 
            localStorage.setItem("PokemonFavorito", JSON.stringify(favoritos));
            botaoMostrarFavoritos.click();
        }
    }
});