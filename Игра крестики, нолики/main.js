//чтобы расщитать всю длину окружности и спрятать закрывающийся круг, пропишем формулу:
// let circle = document.querySelector('.second')
// console.log(circle.getTotalLength())

// игровое поле
let game = document.querySelector('.game');

//результат, кто победил
let res = document.querySelector('.res');

//кнопка, куда нажимать
let btnGame = document.querySelector('.new-game');

//поля
let fields = document.getElementsByClassName('field');
//querySelectorAll('.fields');

let step = false; // будет определять чей следующий ход: крестика или нолика

count = 0;

circle =`<svg class ="circle">
<circle r= "37" cx= "58" cy= "58" stroke = "green"
stroke-width = "10" fill="none" stroke-linecap="round"/>
<!-- stroke-linecap="round" сделает дорисовку круга (плавное закругление)-->
</svg>`

cross = `<svg class ="cross">
<line class="first" x1="15" y="15" x2="100" y2="100" 
stroke ="brown" stroke-width ="7" stroke-linecap="round"/>
<line class="second" x1="100" y="15" x2="15" y2="100" 
stroke ="brown" stroke-width ="7" stroke-linecap="round"/>
</svg>`

//ход крестика
function stepCross(target) {
    //чтобы понимать, в какой клеточке будет крестик или нолик
    //когда нарисуем какой-то из элиментов в клеточку, то будем добавлять один из классов
    target.classList.add('x')
    target.innerHTML = cross
    let crossAudio = new Audio('audio/audio for x-0.mp3')
    crossAudio.play()
    count++;
}

//ход нолика
function stepZero(target) {
    target.classList.add('o')
    target.innerHTML = circle
    let circleAudio = new Audio('audio/audio for x-0.mp3')
    circleAudio.play()
    count++;
}

//функция самой игры
function init(e) {
    if (!step) stepCross(e.target)
    else stepZero(e.target)
    step = !step
    win()
}

//функция, которая будет срабатывать при нажатии кнопки, при вызове новой игры
function newGame() {
 step = false;
 count = 0;
 res.innerText='';
 fields.forEach(item =>{
     item.innerHTML = '';
     item.classList.remove('x', 'o', 'active');
 })
}

//функция при которой мы будем объявлять победителя
function win() {
    
    //создаём массив с выигрышными комбинациями
    let comb =[ 
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ]
        for (let i = 0; i < comb.length; i++){
         
            //пропишем цикл для крестиков:  если в трёх ячейках [0, 1, 2] находится крестик, то выведем результат
            if (fields[comb[i][0]].classList.contains('x') && //т.е. когда мы будем находиться на первой итерации в [i] будет подставляться 0 из первого массива
            //так же проверим по всем классам ячейки: x или y.
            //так как нам нужно, чтобы при выигрыше совпали все 3 ячейки, то 
              fields[comb[i][1]].classList.contains('x') &&
              fields[comb[i][2]].classList.contains('x')) {
                   //чтобы результат высвечивался не сразу, а подождал, когда дорисуется крестик вводим setTimeout
                   setTimeout(()=> {
                        fields[comb[i][0]].classList.add('active')
                        fields[comb[i][0]].classList.add('active')
                        fields[comb[i][0]].classList.add('active')
                        res.innerText = 'Ура, победа!'
                   }, 1000)
                   game.removeEventListener('click', init);
              }

            else if (fields[comb[i][0]].classList.contains('o') &&
              fields[comb[i][1]].classList.contains('o') &&
              fields[comb[i][2]].classList.contains('o')) {
                setTimeout(()=> {
                    fields[comb[i][0]].classList.add('active')
                    fields[comb[i][0]].classList.add('active')
                    fields[comb[i][0]].classList.add('active')
                    res.innerText = 'Ура, победа!'
                }, 1000)
                   game.removeEventListener('click', init);
              }
              else if (count == 9){
                  res.innerText = 'Ничья';
                  game.removeEventListener('click', init);
              }
        }
}

btnGame.addEventListener(`click`, newGame);
game.addEventListener(`click`, init)

 

