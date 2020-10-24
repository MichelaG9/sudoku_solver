let template = [
    [' ',5,' ',' ',' ',' ',' ',6,8],
    [' ',' ',6,7,3,' ',' ',1,' '],
    [' ',9,' ',' ',' ',1,' ',' ',2],
    [' ',6,' ',' ',1,' ',2,' ',' '],
    [5,7,' ',' ',' ',8,' ',9,' '],
    [9,' ',4,' ',' ',' ',' ',' ',6],
    [6,' ',' ',' ',' ',' ',7,2,' '],
    [7,' ',5,8,' ',' ',' ',' ',9],
    [' ',' ',9,' ',' ',' ',' ',' ',' ']
    ]

const values = [1,2,3,4,5,6,7,8,9]
let time = 0;
const speed = 20;

const game_board = document.querySelector('#game-board');
const button = document.querySelector('button');

for(let i = 0; i < template.length; i++){
    for(let n = 0; n < template.length; n++){
        let number = document.createElement('div'); 
        number.innerHTML = template[i][n];
        number.style.gridRowStart = i+1;
        number.style.gridColumnStart = n+1;
        number.setAttribute('id', `x${i}y${n}`);
        if((n+1)%3 == 0){
            number.classList.add('border-right');      
        }
        if((i+1)%3 == 0){
            number.classList.add('border-bottom');      
        }
        game_board.appendChild(number)
    }
}

function search(){
    for(let i = 0; i < template.length; i++){
        for(let n = 0; n < template.length; n++){
            if(template[i][n] === ' '){
                let pos = [i, n];
                return pos
            }
        }
    }
    return false
}

function valid(value, pointer){

    //rows
    for(let i = 0; i < template.length; i++){
        if(template[pointer[0]][i] == value ){
            return false
        }
    }

    //column
    for(let i = 0; i < template.length; i++){
        if(template[i][pointer[1]] == value){
            return false
        }
    }

    //cell
    x = Math.trunc(pointer[0] / 3)
    y = Math.trunc(pointer[1] / 3)

    for(let i = x*3; i < x*3+3; i++){
        for(let n = y*3; n < y*3+3; n++){
            if(template[i][n] == value){
                return false
            }
        }
    }
    return true

}

function solver(){
    const pointer = search()
    if(!pointer){
        return true
    }

        for(let i = 0; i < values.length; i++){
            if(valid(values[i],pointer)){
                template[pointer[0]][pointer[1]] = values[i];
                time += speed;
                setTimeout(function(){
                    let cell = document.querySelector(`#x${pointer[0]}y${pointer[1]}`);
                    cell.style.color = 'black';
                    cell.innerHTML = values[i];
                },time)
                
                if(solver()){
                    return true
                }

                time += speed;
                setTimeout(function(){
                    let clear_cell = document.querySelector(`#x${pointer[0]}y${pointer[1]}`);
                    clear_cell.style.color = 'red';
                }, time)

                template[pointer[0]][pointer[1]] = ' ';

                time += speed;
                setTimeout(function(){
                    let clear_cell = document.querySelector(`#x${pointer[0]}y${pointer[1]}`);
                    clear_cell.innerHTML = ' '
                }, time)
                
            }
        }

    return false
}

button.addEventListener('click', () => solver())

console.log(template)