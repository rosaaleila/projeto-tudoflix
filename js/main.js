'use strict'


// função que busca e retorna um filme aleatorio na api
const buscarFilme = async () => {

    const idFilme = Math.floor(Math.random() * 20)
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=e981f4402e79521ed4b4a8ba6dab1c32&language=pt-BR&page=1`
    const response = await fetch(url)
    const data = await response.json()
    return data.results[idFilme]

}

const buscarMaisCurtidos = async () => {

    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=e981f4402e79521ed4b4a8ba6dab1c32&language=pt-BR&page=1'
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

const buscarEmBreve = async () => {

    const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=e981f4402e79521ed4b4a8ba6dab1c32&language=pt-BR&page=1'
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

const buscarBemAvaliados = async () => {

    const url = 'https://api.themoviedb.org/3/tv/top_rated?api_key=e981f4402e79521ed4b4a8ba6dab1c32&language=pt-br&page=1'
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

const buscarPopulares = async () => {

    const url = 'https://api.themoviedb.org/3/tv/popular?api_key=e981f4402e79521ed4b4a8ba6dab1c32&language=pt-BR&page=1'
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

// funcao para criar as infos na
const atualizarBanner = async () => {

    const filme = await buscarFilme()

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

const criarCardMaisCurtido = async (id) => {

    // selecionando o filme pelo seu id
    const filmesCurtidos = await buscarMaisCurtidos()
    const filme = filmesCurtidos[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'
    const urlPoster = filme.poster_path
    const poster = caminhoPoster + urlPoster

    imagemPoster.src = poster

    containerPoster.setAttribute('class', 'container-poster')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

const criarCardEmBreve = async (id) => {

    const filmesEmbreve = await buscarEmBreve()
    const filme = filmesEmbreve[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'
    const urlPoster = filme.poster_path
    const poster = caminhoPoster + urlPoster

    imagemPoster.src = poster

    containerPoster.setAttribute('class', 'container-poster')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

const criarCardPopulares = async (id) => {

    // selecionando o filme pelo seu id
    const filmesCurtidos = await buscarPopulares()
    const filme = filmesCurtidos[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'
    const urlPoster = filme.poster_path
    const poster = caminhoPoster + urlPoster

    imagemPoster.src = poster

    containerPoster.setAttribute('class', 'container-poster')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

const criarCardBemAvaliado = async (id) => {

    const series = await buscarBemAvaliados()
    const serie = series[id]

    const containerBackdrop = document.createElement('div')
    const imagemBackdrop = document.createElement('img')

    const caminhoBackdrop = 'https://image.tmdb.org/t/p/original'
    const urlBackdrop = serie.backdrop_path
    const backdrop = caminhoBackdrop + urlBackdrop

    imagemBackdrop.src = backdrop

    containerBackdrop.setAttribute('class', 'container-backdrop')

    containerBackdrop.appendChild(imagemBackdrop)

    return containerBackdrop

}

const carregarEmBreve = async () => {

    const filmes = await buscarEmBreve()
    const container = document.getElementById('container-lancamentos')

    for (let cont = 0; cont < 10; cont++) {

        container.appendChild(await criarCardEmBreve(cont))

    }

}


const carregarMaisCurtidos = async () => {

    const filmes = await buscarMaisCurtidos()
    const container = document.getElementById('container-mais-curtidos')

    for (let cont = 0; cont < 10; cont++) {

        container.appendChild(await criarCardMaisCurtido(cont))

    }

}

const carregarPopulares = async () => {

    const container = document.getElementById('container-populares')

    for (let cont = 0; cont < 10; cont++) {

        container.appendChild(await criarCardPopulares(cont))

    }

}


const carregarBemAvaliados = async () => {

    const container = document.getElementById('container-bemavaliados')

    for (let cont = 2; cont < 7; cont++) {

        container.appendChild(await criarCardBemAvaliado(cont))

    }

}

const carregarCards = async () => {

    carregarBemAvaliados()
    carregarPopulares()
    carregarMaisCurtidos()
    carregarEmBreve()
    atualizarBanner()

}

const criarCard = async () => {

    const filmesCurtidos = await buscarPopulares()
    const filme = filmesCurtidos[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'
    const urlPoster = filme.poster_path
    const poster = caminhoPoster + urlPoster

    imagemPoster.src = poster

    containerPoster.setAttribute('class', 'container-poster')

    containerPoster.appendChild(imagemPoster)

    return containerPoster
}

const buscarFilmeNome = async (nome) => {

    const url = `https://api.themoviedb.org/3/search/movie?api_key=e981f4402e79521ed4b4a8ba6dab1c32&query=${nome}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

const buscarSerieNome = async (nome) => {

    const url = `https://api.themoviedb.org/3/search/tv?api_key=e981f4402e79521ed4b4a8ba6dab1c32&query=${nome}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    return data.results

}

const atualizarPagina = async () => {

    const nome = document.getElementById('pesquisar').value
    if (nome != "") {

        const main = document.getElementById('container-principal')
        main.innerHTML = ""

        const container = document.createElement('div')
        container.setAttribute('class', 'container-cards-pesquisa')
        container.setAttribute('id', 'container-cards-pesquisa')

        main.appendChild(container)
        carregarSerieFilme(nome)

    }

}

const criarCardsFilmeNome = async (nome, id) => {

    const filmes = await buscarFilmeNome(nome)
    const filme = filmes[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'
    const urlPoster = filme.poster_path
    const poster = caminhoPoster + urlPoster

    imagemPoster.src = poster

    containerPoster.setAttribute('class', 'container-poster')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

const criarCardsSerieNome = async (nome, id) => {

    const filmes = await buscarSerieNome(nome)
    const filme = filmes[id]

    const containerPoster = document.createElement('div')
    const imagemPoster = document.createElement('img')

    const caminhoPoster = 'https://image.tmdb.org/t/p/original'
    const urlPoster = filme.poster_path
    const poster = caminhoPoster + urlPoster

    imagemPoster.src = poster

    containerPoster.setAttribute('class', 'container-poster')

    containerPoster.appendChild(imagemPoster)

    return containerPoster

}

const carregarSerieFilme = async (nome) => {

    const filmes = await buscarFilmeNome(nome)
    const series = await buscarSerieNome(nome)
    const total = filmes.length + series.length

    const containerCards = document.getElementById('container-cards-pesquisa')

    for (let cont = 0; cont < total; cont++) {

        containerCards.appendChild(await criarCardsFilmeNome(nome, cont))
        containerCards.appendChild(await criarCardsSerieNome(nome, cont))

    }

}


carregarCards()
document.getElementById('pesquisar').addEventListener('focusout', atualizarPagina)
