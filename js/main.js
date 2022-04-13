'use strict'

/**************** funções de busca ********************/

// função que busca e retorna um filme na api de acordo com o parametro especificado
const buscarFilme = async(opcao) => {

    const url = `https://api.themoviedb.org/3/movie/${opcao}?api_key=e981f4402e79521ed4b4a8ba6dab1c32&language=pt-BR&page=1`
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

// funcao que busca e retorna uma serie na api de acordo com o parametro especificado
const buscarSerie = async(opcao) => {

    const url = `https://api.themoviedb.org/3/tv/${opcao}?api_key=e981f4402e79521ed4b4a8ba6dab1c32&language=pt-br&page=1`
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

// funcao para buscar filme pelo nome escrito pelo usuario
const buscarFilmeNome = async(nome) => {

    const url = `https://api.themoviedb.org/3/search/movie?api_key=e981f4402e79521ed4b4a8ba6dab1c32&query=${nome}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

// funcao para buscar serie pelo nome escrito pelo usuario
const buscarSerieNome = async(nome) => {

    const url = `https://api.themoviedb.org/3/search/tv?api_key=e981f4402e79521ed4b4a8ba6dab1c32&query=${nome}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

/**************** funções para criação de cards ********************/

// funcao para criar cards de filmes
const criarCardsFilmes = async(id, parametro) => {

    const filmes = await buscarFilme(parametro)
    const filme = filmes[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'

    if (filme.poster_path == null) {
        imagemPoster.src = '../imgs/img-erro.png'
    }

    if (filme.poster_path != null) {
        const urlPoster = filme.poster_path
        const poster = caminhoPoster + urlPoster
        imagemPoster.src = poster
    }

    containerPoster.title = filme.title

    containerPoster.setAttribute('class', 'container-poster')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

// funcao para criar cards de series
const criarCardsSeries = async(id, parametro) => {

    const series = await buscarSerie(parametro)
    const serie = series[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'

    if (serie.poster_path == null) {
        imagemPoster.src = '../imgs/img-erro.png'
    }

    if (serie.poster_path != null) {
        const urlPoster = serie.poster_path
        const poster = caminhoPoster + urlPoster
        imagemPoster.src = poster
    }

    containerPoster.title = serie.name

    containerPoster.setAttribute('class', 'container-poster-pesquisa')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

// funcao para criar cards de filmes (pesquisa por nome)
const criarCardsFilmeNome = async(nome, id) => {

    const filmes = await buscarFilmeNome(nome)
    const filme = filmes[id]

    if (filme.adult == true) {
        console.log('etcha')
    }

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'

    if (filme.poster_path != null) {
        const urlPoster = filme.poster_path
        const poster = caminhoPoster + urlPoster
        imagemPoster.src = poster
    }

    containerPoster.title = filme.title

    containerPoster.setAttribute('class', 'container-poster-pesquisa')

    containerPoster.appendChild(imagemPoster)

    return containerPoster


}

// funcao para criar cards de series (pesquisa por nome)
const criarCardsSerieNome = async(nome, id) => {

    const series = await buscarSerieNome(nome)
    const serie = series[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'

    if (serie.poster_path == null) {
        imagemPoster.src = '../imgs/img-erro.png'
    }

    if (serie.poster_path != null) {
        const urlPoster = serie.poster_path
        const poster = caminhoPoster + urlPoster
        imagemPoster.src = poster
    }

    containerPoster.title = serie.name

    containerPoster.setAttribute('class', 'container-poster-pesquisa')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

/**************** funções para carregar cards ********************/

// funcao para adicionar os cards (filmes) a seus devidos container
const carregarCardsFilmes = async(container, opcao) => {

    for (let cont = 0; cont <= 20; cont++) {
        container.appendChild(await criarCardsFilmes(cont, opcao))
    }

}

// funcao para adicionar os cards (filmes) a seus devidos container
const carregarCardsSeries = async(container, opcao) => {

    for (let cont = 0; cont <= 10; cont++) {
        container.appendChild(await criarCardsSeries(cont, opcao))
    }

}

// funcao para carregar os resultados da pesquisa por nome
const carregarSerieFilme = async(nome) => {

    const filmes = await buscarFilmeNome(nome)
    const series = await buscarSerieNome(nome)
    const total = filmes.length + series.length

    const containerCards = document.getElementById('container-cards-pesquisa')

    for (let cont = 0; cont < total; cont++) {

        containerCards.appendChild(await criarCardsFilmeNome(nome, cont))
        containerCards.appendChild(await criarCardsSerieNome(nome, cont))

    }

}

/**************** outras funções********************/

// funcao do listener, para a atualizar a pagina e adicionar os resultados da pesquisa
const atualizarPagina = async() => {

    const nome = document.getElementById('pesquisar').value

    if (nome != "") {

        const main = document.getElementById('container-principal')
        main.innerHTML = ""

        const containerPai = document.createElement('div')
        const container = document.createElement('div')
        containerPai.appendChild(container)
        container.setAttribute('class', 'container-cards-pesquisa')
        container.setAttribute('id', 'container-cards-pesquisa')

        main.appendChild(container)
        carregarSerieFilme(nome)

    }

}

// funcao que inicializa todas as funcoes necessarias para carregar o site
const carregarInfos = async() => {

    const containerEmBreve = document.getElementById('container-lancamentos')
    const containerMaisCurtidos = document.getElementById('container-mais-curtidos')
    const containerBemAvaliados = document.getElementById('container-bemavaliados')
    const containerPopulares = document.getElementById('container-populares')

    carregarCardsSeries(containerPopulares, 'popular')
    carregarCardsSeries(containerBemAvaliados, 'top_rated')
    carregarCardsFilmes(containerEmBreve, 'upcoming')
    carregarCardsFilmes(containerMaisCurtidos, 'top_rated')
    atualizarBanner()

}

// funcao para criar as infos na home
const atualizarBanner = async() => {

    const idFilme = Math.floor(Math.random() * 20)
    const filmes = await buscarFilme('popular')
    const filme = filmes[idFilme]

    const caminho = 'https://image.tmdb.org/t/p/original'
    const urlImagem = filme.backdrop_path
    const imagem = caminho + urlImagem

    const containerHome = document.getElementById('container-home')
    const titulo = document.getElementById('titulo')
    const descricao = document.getElementById('descricao')

    titulo.textContent = filme.title
    descricao.textContent = filme.overview

    containerHome.style.backgroundImage = 'url(' + imagem + ')'
    containerHome.style.backgroundPosition = 'left'
    containerHome.style.backgroundSize = 'cover'

}

carregarInfos()
document.getElementById('pesquisar').addEventListener('focusout', atualizarPagina)