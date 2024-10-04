// Seleciona os elementos da página
const mario = document.querySelector('.mario') // Seleciona o elemento Mario
const pipe = document.querySelector('.pipe') // Seleciona o cano

const start = document.querySelector('.start') // Seleciona o botão de iniciar
const gameOver = document.querySelector('.game-over') // Seleciona a tela de game over

// Inicializa os objetos de áudio
audioStart = new Audio('/soung/audio_theme.mp3') // Áudio de início do jogo
audioGameOver = new Audio('/soung/audio_gameover.mp3') // Áudio de game over

// Função para iniciar o jogo
const startGame = () => {
  pipe.classList.add('pipe-animation') // Adiciona a animação ao cano
  start.style.display = 'none' // Esconde o botão de iniciar

  // Reproduz o áudio de início
  audioStart.play()
}

// Função para reiniciar o jogo
const restartGame = () => {
  gameOver.style.display = 'none' // Esconde a tela de game over
  pipe.style.left = '' // Reseta a posição do cano
  pipe.style.right = '0' // Posiciona o cano à direita
  mario.src = '/img/mario.gif' // Reseta a imagem do Mario
  mario.style.width = '150px' // Define a largura do Mario
  mario.style.bottom = '0' // Define a posição do Mario na parte inferior

  start.style.display = 'none' // Esconde o botão de iniciar

  // Pausa e reseta o áudio de game over
  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  // Reproduz o áudio de início e reseta o tempo
  audioStart.play()
  audioStart.currentTime = 0;
}

// Função para fazer o Mario pular
const jump = () => {
  mario.classList.add('jump') // Adiciona a classe de salto ao Mario

  // Remove a classe de salto após 800ms
  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

// Função para o loop do jogo
const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft // Obtém a posição do cano
    const marioPosition = window
      .getComputedStyle(mario) // Obtém as propriedades do estilo do Mario
      .bottom.replace('px', ' ') // Extrai a posição inferior em pixels

    // Verifica se o Mario colidiu com o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation') // Remove a animação do cano
      pipe.style.left = `${pipePosition}px` // Atualiza a posição do cano

      mario.classList.remove('.jump') // Remove a classe de salto
      mario.style.bottom = `${marioPosition}px` // Atualiza a posição do Mario

      mario.src = './img/game-over.png' // Troca a imagem do Mario para game over
      mario.style.width = '80px' // Ajusta a largura do Mario
      mario.style.marginLeft = '50px' // Ajusta a margem esquerda do Mario

      // Função para pausar o áudio de início
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart() // Chama a função para parar o áudio de início

      audioGameOver.play() // Reproduz o áudio de game over

      // Função para pausar o áudio de game over após 7 segundos
      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000) // Pausa o áudio após 7 segundos

      gameOver.style.display = 'flex' // Exibe a tela de game over

      clearInterval(loop) // Para o loop do jogo
    }
  }, 10) // Intervalo do loop a cada 10 ms
}

// Inicia o loop do jogo
loop()

// Adiciona um evento de tecla pressionada para pular
document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') { // Se a tecla for espaço
    jump() // Chama a função de pular
  }
})

// Adiciona um evento de toque para pular
document.addEventListener('touchstart', e => {
  if (e.touches.length) { // Se houver toques
    jump() // Chama a função de pular
  }
})

// Adiciona um evento de tecla pressionada para iniciar o jogo
document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') { // Se a tecla for Enter
    startGame() // Chama a função de iniciar o jogo
  }
})
