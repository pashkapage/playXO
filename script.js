let players = document.querySelector('.players'); //захватываем ссылку на класс players
let playWithComp = document.querySelector('.playWithComp');
let resetPlay = document.querySelector('.resetPlay');
//let h1 = document.querySelector('h1');
let divs = document.querySelectorAll('.p_header'); //захватили ссылку на все теги <div> с данным классом

let curs = ''; //курсор текущего хода
let arrDiv = []; // двумерный массив их подмассивов с тремя элементами DIV, i, ЗНАК ХОДА  
let playerMas = []; // двумерный массив из подмассивов с двумя элементами ИМЯ ИГРОКА, ЗНАК ХОДА ИГРОКА
let poleSection = document.getElementById("SecondChildInsert");
let msgBlock = document.createElement('div');
let elemParat = document.getElementById('FirstChildInsert');
var closeBtn = document.createElement('button');
let onechild = elemParat.firstChild;
let rabbit = '&#128048;'; //кролик серый    
let bunny = '&#128007;' //зайчик белый
let noname = '';
let compandplayer = false; //флаг игры с компом
let num2 = 0;
let allStep = [0,1,2,3,4,5,6,7,8]; //массив не использованных ходов
let z = '';
let B = 0; //переменная для счета игры за bunny
let R = 0; //переменная для счета игры за rabbit

let initialization = function(){  // функция инициализации игры ДЛЯ 2 ЧЕЛОВЕК
    for (var i = 0; i < 2; i++){
        let myDiv = document.createElement('div'); //создаем ссылку на DIV 
        let mySing = document.createElement("label");//создаем ссылку на иконку игровой фишки
        let myName = document.createElement('input'); //создаем ссылку на тег IMPUT 

        let parentElement = document.getElementById('FirstChildInsert'); //получаем ссылку на родительский элемент
        let thefirstChild =  parentElement.firstChild; //Свойство Node.firstChild только для чтения, возвращающее первый потомок узла в древе или null, если узел является бездетным
        parentElement.insertBefore( myDiv, thefirstChild ); //вставляем myDiv перед первым родительскии элементом
        myDiv.classList.add('blockSubMenu'); //добавляем к myDiv класс blockSubMenu
        
        if (i === 0) {
            myDiv.value = rabbit;//не видное значение фишки
            mySing.innerHTML = rabbit; //показываем игровую фишку кролик
        } else { 
            myDiv.value = bunny;//не видное значение фишки
            mySing.innerHTML = bunny //показываем игровую фишку зайчик
        }
        
        myName.type = 'text';
        myName.name = 'myName'+i;
        myName.placeholder = 'введите своё имя';
        myName.className = 'blockSubMenuInput';
        myDiv.appendChild(mySing);
        myDiv.appendChild(myName); 

        function changeNameAndSing(e){    
            playerMas.push([this.value, myDiv.value]);
            deleteMyName(e, myDiv);  // функция удаления input'a после ввода имения
            if (playerMas.length === 2){ //если в массиве игроков 2 игрока, запускаем функцию рандома хода и рисуем поле
                poleXO();//рисуем поле
                getRandom();//определяем игрока который ходит первым
            }
            //console.log(playerMas);
        }   
        myName.addEventListener('change', changeNameAndSing);   
    }
    compandplayer;
    playWithComp.removeEventListener('click',withComp);
    players.removeEventListener('click',initialization);
} 

function deleteMyName(input, div){        // вставка тега <p> с именим игрока вместа input'a
    console.log(input.target); 
    let p = document.createElement('p');
    p.textContent = input.target.value;
    input.target.parentNode.removeChild(input.target);
    div.appendChild(p);
}

function getRandom(){    // функция опреляет игрока который ходит первым
    curs = '';    //инициализируем фишку игроков
    msgBlock.setAttribute('class','msgBlock');
    let rand =Math.round(Math.random()); //рандом 0 или 1   
    if (compandplayer) {   //если нажата игра с компьютером
        if ((playerMas[Math.floor(rand)][1] === bunny) && (playerMas[Math.floor(rand)][0] === 'comp'))  { 
            curs = bunny;
            msgBlock.innerHTML = '<p>'+"ходит" + '<br>' + playerMas[Math.floor(rand)][0];
            //console.log('ПЕРВЫЙ ХОДИТ КОМПЬЮТЕР1');
            moveComp(curs,-1);
            } else if ((playerMas[Math.floor(rand)][1] === rabbit) && (playerMas[Math.floor(rand)][0] === 'comp')){
                curs = rabbit; 
                msgBlock.innerHTML = '<p>'+"ходит" + '<br>' + playerMas[Math.floor(rand)][0];
                //console.log('ПЕРВЫЙ ХОДИТ КОМПЬЮТЕР2');
                moveComp(curs,-1);
            } else if ((playerMas[Math.floor(rand)][1] === bunny) && (playerMas[Math.floor(rand)][0] !== 'comp')){
                curs = bunny;
                msgBlock.innerHTML = '<p>'+"ходит" + '<br>' + playerMas[Math.floor(rand)][0];             
                //console.log('ПЕРВЫЙ ХОДИТ ЧЕЛОВЕК1');
            } else if ((playerMas[Math.floor(rand)][1] === rabbit) && (playerMas[Math.floor(rand)][0] !== 'comp')){ 
                curs = rabbit; 
                msgBlock.innerHTML = '<p>'+"ходит" + '<br>' + playerMas[Math.floor(rand)][0];             
                //console.log('ПЕРВЫЙ ХОДИТ ЧЕЛОВЕК2');
            }
    } else {
         if (playerMas[Math.floor(rand)][1] === bunny){ 
        curs = bunny;
        msgBlock.innerHTML = '<p>'+"ходит" + '<br>' + playerMas[Math.floor(rand)][0];
        } else { 
        curs = rabbit; 
        msgBlock.innerHTML = '<p>'+"ходит" + '<br>' + playerMas[Math.floor(rand)][0];
        }
    }  
    msgBlock.onclick = function(){msgBlock.parentNode.removeChild(msgBlock)} //удлять блок вывода сообщения по нажатию на нем
    elemParat.insertBefore(msgBlock, onechild);
}

function restart(){         //функция перезапуска игры после раунда
    arrDiv = [];
    allStep = [0,1,2,3,4,5,6,7,8];
    curs = '';
    num2 = 0;
    num = 0;
    noname = '';
    let aa = document.getElementsByClassName('polediv'); //захватываем ссылку на игровое поле, состоящее из div'ов 
    //aa.parentNode.style.transition = '2s';
    for (var i = 8; i >= 0 ; i--){ 
        aa[i].parentNode.removeChild(aa[i]);
    } //удаляем каждый div из игрового поля   
    poleSection.style.backgroundColor = 'white';
    poleXO();
    getRandom();
}


function winplay(winsing){ //Функция вывода сообщения и счета о победе
    if (winsing === bunny){
        B = B + 1;     
    } else if (winsing === rabbit){
        R = R + 1;  
    } else if (winsing === noname){
        R = R;
        B = B;
    }

    if (!compandplayer) { 
        msgBlock.innerHTML = '<p>'+ B + ' : ' + R + '<br>' + noname;
    }
    else {
        if (playerMas[0][1] === bunny) { msgBlock.innerHTML = '<p>'+ R + ' : ' + B + '<br>' + noname; } 
            else if (playerMas[0][1] === rabbit){
                msgBlock.innerHTML = '<p>'+  B + ' : ' + R + '<br>' + noname;
            }
    }
    msgBlock.appendChild(closeBtn);
    elemParat.insertBefore(msgBlock, onechild);
    
    let aa = document.getElementsByClassName('polediv');  //захватывем ссылки на игровое поле, состоящее из div'ов
    for (var i = 8; i >= 0 ; i--){ arrDiv[i][0].removeEventListener('click',movePlayers);} //удаляем с каждого div'а обработчик события click
}

function winMove(moving){ //функция проверки победы игры
    if ((arrDiv[0][2] ===bunny) && (arrDiv[1][2] ===bunny) && (arrDiv[2][2] ===bunny)) { 
        winplay(bunny);
        setTimeout(restart, 2*1000);    
    } else if ((arrDiv[3][2] ===bunny) && (arrDiv[4][2] ===bunny) && (arrDiv[5][2] ===bunny)) {
        winplay(bunny);
       setTimeout(restart, 2*1000);
        }  else if ((arrDiv[6][2] ===bunny) && (arrDiv[7][2] ===bunny) && (arrDiv[8][2] ===bunny)) {
            winplay(bunny);
           setTimeout(restart, 2*1000);
            }  else if ((arrDiv[0][2] ===bunny) && (arrDiv[3][2] ===bunny) && (arrDiv[6][2] ===bunny)) {
                winplay(bunny);
               setTimeout(restart, 2*1000);
                 } else if ((arrDiv[1][2] ===bunny) && (arrDiv[4][2] ===bunny) && (arrDiv[7][2] ===bunny)) {
                    winplay(bunny);
                   setTimeout(restart, 2*1000);
                    } else if ((arrDiv[2][2] ===bunny) && (arrDiv[5][2] ===bunny) && (arrDiv[8][2] ===bunny)) {
                        winplay(bunny);
                       setTimeout(restart, 2*1000);
                      } else if ((arrDiv[0][2] ===bunny) && (arrDiv[4][2] ===bunny) && (arrDiv[8][2] ===bunny)) {
                        winplay(bunny);
                       setTimeout(restart, 2*1000);
                        } else if ((arrDiv[2][2] ===bunny) && (arrDiv[4][2] ===bunny) && (arrDiv[6][2] ===bunny)) { 
                            winplay(bunny);
                           setTimeout(restart, 2*1000);
                          } 
    else if ((arrDiv[0][2] ===rabbit) && (arrDiv[1][2] ===rabbit) && (arrDiv[2][2] ===rabbit)) { 
        winplay(rabbit);
       setTimeout(restart, 2*1000); 
    } else if ((arrDiv[3][2] ===rabbit) && (arrDiv[4][2] ===rabbit) && (arrDiv[5][2] ===rabbit)) {
        winplay(rabbit);
       setTimeout(restart, 2*1000); 
        }  else if ((arrDiv[6][2] ===rabbit) && (arrDiv[7][2] ===rabbit) && (arrDiv[8][2] ===rabbit)) {
            winplay(rabbit);
            setTimeout(restart, 2*1000); 
            }  else if ((arrDiv[0][2] ===rabbit) && (arrDiv[3][2] ===rabbit) && (arrDiv[6][2] ===rabbit)) {
                winplay(rabbit);
                setTimeout(restart, 2*1000); 
                 } else if ((arrDiv[1][2] ===rabbit) && (arrDiv[4][2] ===rabbit) && (arrDiv[7][2] ===rabbit)) {
                    winplay(rabbit);
                    setTimeout(restart, 2*1000); 
                    } else if ((arrDiv[2][2] ===rabbit) && (arrDiv[5][2] ===rabbit) && (arrDiv[8][2] ===rabbit)) {
                        winplay(rabbit);
                        setTimeout(restart, 2*1000); 
                      } else if ((arrDiv[0][2] ===rabbit) && (arrDiv[4][2] ===rabbit) && (arrDiv[8][2] ===rabbit)) {
                        winplay(rabbit);
                        setTimeout(restart, 2*1000); 
                        } else if ((arrDiv[2][2] ===rabbit) && (arrDiv[4][2] ===rabbit) && (arrDiv[6][2] ===rabbit)) {
                            winplay(rabbit);
                            setTimeout(restart, 2*1000); 
                          } else {
                                let num=0;
                                if (compandplayer){
                                allStep.forEach(function(item){
                                    if (item === ''){
                                        num += 1;
                                        console.log('кол-во потраченых ходов ' + num);
                                      } 
                                      if (num === 8) {     //условия игры в ничью с компьютером
                                        noname = 'ничья';
                                        winplay(noname);
                                        setTimeout(restart, 2*1000); 
                                         return true;
                                      }
                                })
                                } else {                              
                                    num2 +=1
                                    if (num2 === 9){    // условия игры в ничью между двумя игроками
                                        console.log('игра в ничью');
                                        noname = 'ничья';
                                        winplay(noname);
                                        setTimeout(restart, 2*1000); 
                                         return true;
                                      }
                                }
                            }
}

function movePlayers(e){ //функция хода игрока
        z = e.target.textContent; 

        if (Number.isInteger(Number(z))) { //если textContent число а не фишка игрока, тогда 
            arrDiv[z][2] = curs;             //в порядковый номер DIV'a ложим символ текущей фишки
            e.target.innerHTML = curs;            //отобразили фишку в поле игры
            
            if (compandplayer === true){                // если true, эта игра между человеком и компьютером 
                if (curs === playerMas[0][1]){          //если ход игрока 
                    if (curs === rabbit) { 
                        curs = bunny;                   //поменяли фишку
                        moveComp(curs, z);              // вызываем функцию хода компьютера
                    } else { 
                        curs = rabbit;                  //поменяли фишку
                        moveComp(curs, z);               // вызываем функцию хода компьютера
                    }
                } 
            } else {
                winMove(z);                    //идет игра между 2 игроками
                (curs === rabbit) ? curs = bunny : curs = rabbit; 
            } 
        }  
        else { console.log('это поле уже занято');
        } 

        console.log(arrDiv);
        console.log('какой знак стал - ' + curs); 
        console.log('-------------------------------------------------');
         
}

function moveComp(sing, positionPlayer){
    (positionPlayer === -1)? console.log('Первый ход компьютера'): allStep[positionPlayer] = '';     

    let rnd = Math.round(Math.random()*8);
    if (allStep.includes(rnd)){
        allStep[rnd] = ''; 
        arrDiv[rnd][2] = sing;
        arrDiv[rnd][0].innerHTML = sing;
        winMove(rnd);
        (sing === rabbit)? curs = bunny : curs = rabbit;
        console.log('компьютер сходил');
    } else {
            rnd = allStep.find(item => { if (item !== '') { return true;}});
            if (rnd !== undefined){
                arrDiv[rnd][2] = sing;
                arrDiv[rnd][0].innerHTML = sing;
                winMove(rnd);   
                allStep[rnd] = '';
                (sing === rabbit)? curs = bunny : curs = rabbit;
            } else {
                console.log('Свободные ходы закончились');
                winMove();
            }    
        console.log('КОМПЬЮТЕР СХОДИЛ НЕ С ПЕРВОГО РАЗА');

    }    
}   
 
function poleXO(){ //функция создания игрового поля 
    for (var i = 0; i < 9; i++){
        let poleDiv = document.createElement('div'); 
        let SecondChildInsert = poleSection.firstChild;
        poleSection.insertBefore( poleDiv, SecondChildInsert );
        poleDiv.className = 'polediv';
        poleDiv.name = 'pole'+i;
        poleDiv.innerHTML = i;
        arrDiv.push([poleDiv, i, '']); 
        //if (i === 8){ poleSection.style.backgroundColor = 'black'; }
    }   

    for (var i = 0; i < arrDiv.length; i++){ arrDiv[i][0].addEventListener('click', movePlayers) } //onclick = movePlayers; }// цикл назначающий обработчик события КЛИК на игровом поле  
}

function withComp(){ //назначаем функцию на событие клик на элементе with comp. Эта игра между человеком и компьютером
    compandplayer = true;
    let changePlayer = document.createElement('div');
    let selectSing = document.createElement('select');
    changePlayer.classList.add('blockSubMenu');
    changePlayer.textContent = 'Выберите игрока и имя';
    selectSing.classList.add('blockSubMenuInput');

    let parentElement = document.getElementById('FirstChildInsert'); //получаем ссылку на родительский элемент
    let thefirstChild =  parentElement.firstChild;
    parentElement.insertBefore(changePlayer, thefirstChild); //вставляем div
    changePlayer.appendChild(selectSing);
   
    for(let i=0; i<3; i++){             //Заполняем выпадающий список
        let opt = document.createElement('option');
        if (i === 1) {
            opt.innerHTML = rabbit; //возможно в дальнейшем будут проблемы из-за innerHTML, тогда поменяем на textcontent
            opt.value = rabbit;
        } else if (i === 2) { 
            opt.innerHTML = bunny; //возможно в дальнейшем будут проблемы из-за innerHTML, тогда поменяем на textcontent
            opt.value = bunny;
        }
        selectSing.appendChild(opt);
    }
    
    selectSing.onchange = function(){
        selectedSing = this.value;
        console.log('выбраная фишка для хода игроком - ' + selectedSing);
        selectSing.parentNode.removeChild(selectSing);     //удаляем div в котором выводили select 
        changePlayerName(selectedSing, changePlayer); //передаем в функцию выбраный знак из выпадающего списка и div в котором находится этот обьект
    };
    playWithComp.removeEventListener('click',withComp);
    players.removeEventListener('click',initialization);
} 


function changePlayerName(sltdSing, elem){       //функция создания игроков для игры с компьютером
    let inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.value ='';
    inputName.classList.add('blockSubMenuInput');
    elem.appendChild(inputName);
    
    inputName.onchange = function(){
        playerMas.push([this.value, sltdSing]);
        (sltdSing === bunny) ? playerMas.push(['comp', rabbit]) : playerMas.push(['comp', bunny]);
        initializationWithComp();
        elem.parentNode.removeChild(elem);
    }
}

function initializationWithComp(){
    for(let i=0; i<2; i++){
        let myDiv = document.createElement('div');
        let mySing = document.createElement("label");//создаем ссылку на иконку игровой фишки
        let myName = document.createElement('p'); //создаем ссылку на тег IMPUT 

        let parentElement = document.getElementById('FirstChildInsert'); //получаем ссылку на родительский элемент
        let thefirstChild =  parentElement.firstChild; //Свойство Node.firstChild только для чтения, возвращающее первый потомок узла в древе или null, если узел является бездетным
        parentElement.insertBefore( myDiv, thefirstChild ); //вставляем myDiv перед первым родительскии элементом
        myDiv.classList.add('blockSubMenu'); //добавляем к myDiv класс blockSubMenu

        mySing.innerHTML = playerMas[i][1]; 
        myName.innerHTML = playerMas[i][0];
        myDiv.appendChild(mySing);
        myDiv.appendChild(myName); 
    }
    poleXO();
    getRandom();
}

players.addEventListener('click',initialization);
playWithComp.addEventListener('click', withComp);
resetPlay.addEventListener('click', reset);

function reset(){   // функция сброса настроек игры
    window.location.reload(); // просто перезагружаем страницу
} 


for (i = 0; i<2; i++){
    //console.log(pp);
    divs[i].addEventListener('click', p_header);
}

function p_header(){
    //h1.remove();
    //let header = document.querySelector('header'); 
    let objM = {
        '&#128053;':'обезьяны',
        '&#128018;':'обезьяны',
        '&#129421;':'гориллы',
        '&#128054;':'собаки',
        '&#128021;':'собаки',
        '&#128041;':'пудели',
        '&#128058;':'волки',
        '&#129418;':'лисы',
        '&#129437;':'еноты',
        '&#128049;':'коты',
        '&#128008;':'кошки',
        '&#129409;':'львы',
        '&#128047;':'тигры',
        '&#128005;':'тигры',
        '&#128006;':'леопарды',
        '&#128052;':'лошади',
        '&#128014;':'лошади',
        '&#129412;':'единороги',
        '&#129427;':'зебры',
        '&#129420;':'олени',
        '&#128046;':'коровы',
        '&#128002;':'быки',
        '&#128003;':'буйволы',
        '&#128004;':'коровы',
        '&#128055;':'поросёноки',
        '&#128022;':'свиньи',
        '&#128023;':'кабаны',
        '&#128061;':'пяточёки',
        '&#128015;':'бараны',
        '&#128017;':'овцы',
        '&#128016;':'козы',
        '&#128042;':'одногорбые верблюды',
        '&#128043;':'двугорбые верблюды',
        '&#129433;':'ламы',
        '&#129426;':'жирафы',
        '&#128024;':'слоны',
        '&#129423;':'носороги',
        '&#129435;':'гипопотамы',
        '&#128045;':'мыши',
        '&#128001;':'мыши',
        '&#128000;':'крысы',
        '&#128057;':'хомяки',
        '&#128048;':'зайчики',
        '&#128007;':'кролики',
        '&#128063;':'бурундуки',
        '&#129428;':'ежи',
        '&#129415;':'летучие мыши',
        '&#128059;':'медведи',
        '&#128040;':'коалы',
        '&#128060;':'панды',
        '&#129432;':'кенгуру',
        '&#129441;':'барсуки',
        '&#128062;':'следы животных',
        '&#129411;':'индейки',
        '&#128020;':'курицы',
        '&#128019;':'петухи',
        '&#128035;':'цыплята',
        '&#128036;':'цыплята',
        '&#128037;':'цыплята',
        '&#128038;':'птицы',
        '&#128039;':'пингвины',
        '&#128330;':'голуби',
        '&#129413;':'орёлы',
        '&#129414;':'утки',
        '&#129442;':'лебеди',
        '&#129417;':'совы',
        '&#129434;':'павлины',
        '&#129436;':'попугаи',
        '&#128056;':'лягушки',
        '&#128010;':'крокодилы',
        '&#128034;':'черепахи',
        '&#129422;':'ящерицы',
        '&#128013;':'змеи',
        '&#128050;':'драконы',
        '&#128009;':'драконы',
        '&#129429;':'Зауроподы',
        '&#129430;':'Ти-рексы',
        '&#128051;':'киты',
        '&#128011;':'киты',
        '&#128044;':'дельфины',
        '&#128031;':'рыбы',
        '&#128032;':'тропические рыбы',
        '&#128033;':'фугу',
        '&#129416;':'акулы',
        '&#128025;':'осьминоги',
        '&#128026;':'раковины',
        '&#128012;':'улитки',
        '&#129419;':'бабочки',
        '&#128027;':'гусеницы',
        '&#128028;':'муравьи',
        '&#128029;':'пчёлы',
        '&#128030;':'божьи коровки',
        '&#129431;':'сверчки',
        '&#128375;':'пауки',
        '&#128376;':'паутины',
        '&#129410;':'скорпионы',
        '&#129439;':'комары',
        '&#129440;':'микробы'
};  
    let sing = this.textContent;
    let p_ = document.querySelector('.p_'); // узел перед и после, которого будем вставлять поле div
    let div = document.createElement('div');
    div.classList.add('p_header');
    let M = ['&#128053;','&#128018;','&#129421;','&#128054;','&#128021;','&#128041;','&#128058;','&#129418;','&#129437;','&#128049;','&#128008;','&#129409;','&#128047;','&#128005;','&#128006;','&#128052;','&#128014;','&#129412;','&#129427;','&#129420;','&#128046;','&#128002;','&#128003;','&#128004;','&#128055;','&#128022;','&#128023;','&#128061;','&#128015;','&#128017;','&#128016;','&#128042;','&#128043;','&#129433;','&#129426;','&#128024;','&#129423;','&#129435;','&#128045;','&#128001;','&#128000;','&#128057;','&#128048;','&#128007;','&#128063;','&#129428;','&#129415;','&#128059;','&#128040;','&#128060;','&#129432;','&#129441;','&#128062;','&#129411;','&#128020;','&#128019;','&#128035;','&#128036;','&#128037;','&#128038;','&#128039;','&#128330;','&#129413;','&#129414;','&#129442;','&#129417;','&#129434;','&#129436;','&#128056;','&#128010;','&#128034;','&#129422;','&#128013;','&#128050;','&#128009;','&#129429;','&#129430;','&#128051;','&#128011;','&#128044;','&#128031;','&#128032;','&#128033;','&#129416;','&#128025;','&#128026;','&#128012;','&#129419;','&#128027;','&#128028;','&#128029;','&#128030;','&#129431;','&#128375;','&#128376;','&#129410;','&#129439;','&#129440;'];
    let select = document.createElement('select');
    select.classList.add('blockSubMenuInput');
    for (i = 0; i < M.length; i++){
        let option = document.createElement('option');
        option.value = M[i];
        option.innerHTML = M[i];
        select.appendChild(option);
    }
  
    (this.textContent === 'зайчики')? p_.before(div) : p_.after(div);
    div.appendChild(select);

    select.onchange = (e) =>{ 
        (sing === 'зайчики')? bunny = e.target.value : rabbit = e.target.value;
        let index = e.target.value; 
        div.textContent = objM[index];
        this.remove();
    } 
    
    this.remove();
     
}