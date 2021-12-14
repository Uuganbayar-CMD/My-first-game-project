//тоглоом дууссан эсэхийг хадгалах төлвийн хувьсагч
var isNewGame;
//Тоглогчийн ээлжийг хадгалах хувьсагч
var activePlayer;
//Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores;
//Тоглогчийн ээлжиндээ цуглуулах оноог хадгалах хувьсагч
var roundScore;
//Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

//Тоглоомыг эхлүүлнэ
newGame();

//тоглоомыг элүүлэх функц
function newGame(){
    isNewGame = true;
    //Тоглогчийн ээлжийг хадгалах хувьсагч
activePlayer=0;
//Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
scores=[0,0];
//Тоглогчийн ээлжиндээ цуглуулах оноог хадгалах хувьсагч
roundScore=0;

//Програм эхлэхэд бэлтгэе
//харагдах тоонуудыг 0 болгосон
document.getElementById("score-0").textContent='0';
document.getElementById("score-1").textContent='0';

document.getElementById("current-0").textContent='0';
document.getElementById("current-0").textContent='0';

//тоглогчдын нэрийг арилгах
document.getElementById('name-0').textContent = 'Player1';
document.getElementById('name-1').textContent = 'Player2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');

document.querySelector('.player-0-panel').classList.add('active');

diceDom.style.display = "none";
}
//1-6 хүртэл санамсаргүй тоо гаргаж авна
var diceNumber = Math.floor(Math.random()*6)+1 ;
//Шоог шидэх листенер

document.querySelector(".btn-roll").addEventListener("click",function(){
    if(isNewGame){
        //1-6 хүртэл санамсаргүй тоо гаргаж авна
    var diceNumber = Math.floor(Math.random()*6)+1 ;
    //Шооны зургийг веб дээр гаргаж ирнэ
    diceDom.style.display="block";
    //Буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ.
    diceDom.src='dice-'+ diceNumber + '.png';
    // Буусан тоо нь нэгээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмнэ.
    if(diceNumber !== 1){
        roundScore = roundScore + diceNumber;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    else{
        switchNextPlayer()

        // if(activePlayer === 0 ){
        //     activePlayer = 1;
        // }
        // else{
        //     activePlayer = 0;
        // }
    }
    }else{
        alert("Тоглоом дууссан байна. New Game товчийг дарж дахин оролдоно уу!!!");
    }
    
});
//HOLD товчны эвент листенер
document.querySelector('.btn-hold').addEventListener('click',function(){
if(isNewGame){
//Уг тоглогчийн цуглуулсан оноог глобал оноон дээр нэмнэ
scores[activePlayer] = scores[activePlayer] + roundScore;
//Дэлгэц дээр оноог нь өөрчлөнө
document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
//Ялагчийг тодруулж зааж өгөх
if(scores[activePlayer] >= 100){
     //тоглоомыг дууссан төлөвт оруулна
     isNewGame = false;
    //ялагч гэсэн тэкстийг нэрнийх нь оронд гаргана
    document.getElementById('name-' + activePlayer).textContent = 'WINNER!!!';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
   
}else{
    switchNextPlayer();
}
}else{
    alert("Тоглоом дууссан байна. New Game товчийг дарж дахин оролдоно уу!!!");
}
});
// switchNextPlayer нь ээлжийг шилжүүлдэг функц
function switchNextPlayer(){
    roundScore = 0;
 document.getElementById('current-' + activePlayer).textContent = 0;
 //Тоглогчийн ээлжийг нөгөө тоглогчруу шилжүүллээ
 activePlayer === 0 ?(activePlayer = 1) : (activePlayer = 0);
 
 //Улаан цэгийг шилжүүлэх
 document.querySelector('.player-0-panel').classList.toggle("active");
 document.querySelector('.player-1-panel').classList.toggle("active");

 //1 буусны дараа шоог түр алга болгох
 diceDom.style.display = "none";
}
//Тоглоомыг шинээр эхлүүлэх товчний эвент листенер
document.querySelector('.btn-new').addEventListener('click',newGame);
