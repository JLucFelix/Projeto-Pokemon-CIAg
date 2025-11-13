# Projeto Pokédex (Processo Seletivo CIAg)

---

## Sobre o Projeto

Este é um sistema de Pokédex desenvolvido como parte de um processo seletivo. O projeto consome a **[PokeAPI](https://pokeapi.co/)** para buscar informações de Pokémons e permite ao usuário gerenciar uma lista de favoritos, que é salva localmente.

### Funcionalidades Principais

* **Busca:** Buscar Pokémons por nome ou ID.
* **Exibição:** Listar nome, ID, sprite, tipos, habilidades e estatísticas.
* **CRUD de Favoritos:**
    * **Adicionar:** Salvar um Pokémon na lista de favoritos com anotações personalizadas.
    * **Listar:** Exibir a lista completa de Pokémons salvos.
    * **Editar:** Atualizar a anotação de um Pokémon já salvo.
    * **Remover:** Excluir um Pokémon da lista de favoritos.
* **Persistência:** Os dados dos favoritos são salvos no `LocalStorage` do navegador, garantindo que a lista não se perca ao fechar a página.

---

## Tecnologias Utilizadas

* **HTML5:** Para a estruturação semântica da página.
* **CSS3:** Para a estilização e design da interface.
* **JavaScript (ES6+):** Para toda a lógica da aplicação, incluindo:
    * Consumo da API (via `fetch`).
    * Manipulação do DOM (exibição dos dados).
    * Gerenciamento de eventos (cliques).
    * Lógica do CRUD de favoritos.
* **LocalStorage:** API do navegador utilizada para a persistência local dos dados.

---

## Instalação e Utilização

### Instalação

Não há necessidade de instalação de dependências ou builds complexos.

Basta abrir o arquivo `index.html` diretamente no seu navegador de preferência.

### Como Usar

1.  **Buscar:** Na caixa de pesquisa, digite o nome ou ID do Pokémon (ex: "pikachu" ou "25") e clique em **"Buscar Pokemon"**.
2.  **Adicionar:** Para salvar o Pokémon exibido, escreva uma anotação (opcional) no campo "Anotações" e clique em **"Adicionar Pokemon"**.
3.  **Listar:** Clique em **"Mostrar Favoritos"** para exibir sua lista salva.
4.  **Editar/Remover:** Na lista de favoritos, utilize os botões **"Editar Anotação"** ou **"Remover"** para gerenciar cada item.
