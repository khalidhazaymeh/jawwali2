var wrapper= document.querySelector(".major-partner .wrapper");
var carsouel= document.querySelector(".carousel");
let isDragging=false , startX , startScrollLeft , timeoutId;
const arrowBtns=document.querySelectorAll(".wrapper .arrow");

//stats start

let nums=document.querySelectorAll(".stats .number");
let section=document.querySelector(".stats");
let started=false;



window.onscroll=function(){
    if(window.scrollY>=section.offsetTop){
        if(!started){
            nums.forEach((num)=>startcount(num));
        }
        started=true;
    }

}

function startcount(el){
let goal=el.dataset.goal;
let count =setInterval(() => {
    el.textContent++; 
    if(el.textContent === goal){
        clearInterval(count);

    }
}, 2500 / goal);
};
//stats end

const firstCardWidth=carsouel.querySelector(".wrapper .carousel .card").offsetWidth;
const carsouelChildrens=[...carsouel.children];
let cardPreView = Math.round(carsouel.offsetWidth / carsouelChildrens);

carsouelChildrens.slice(-cardPreView).reverse().forEach(card => {
    carsouel.insertAdjacentHTML("afterbegin" , card.outerHTML);
});

carsouelChildrens.slice(0,cardPreView).reverse().forEach(card => {
    carsouel.insertAdjacentHTML("beforeend" , card.outerHTML);
});

const dragStart=(e)=>{
    isDragging=true;
    carsouel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carsouel.scrollLeft;

}

arrowBtns.forEach(btn =>{
    btn.addEventListener("click" , ()=>{
        carsouel.scrollLeft += btn.id === "icon-left" ? - firstCardWidth : firstCardWidth;
    });
});
const dragging =(e)=>{
    if(!isDragging) return;
    carsouel.scrollLeft=startScrollLeft - (e.pageX - startX);
};

const dragStope = () =>{
    isDragging=false;
    carsouel.classList.remove("dragging");
};
const autoPlay= ()=>{
    if(window.innerWidth < 800) return;
    timeoutId=setTimeout(()=>carsouel.scrollLeft +=4*firstCardWidth,2500)
};
autoPlay();


const infiniteScroll =()=>{
    if(carsouel.scrollLeft === 0){
        carsouel.classList.add("no-transition");
        carsouel.scrollLeft = carsouel.scrollWidth - ( 10 * carsouel.offsetWidth);
        carsouel.classList.remove("no-transition");
    }
    else if(Math.ceil(carsouel.scrollLeft) === carsouel.scrollWidth - carsouel.offsetWidth){
        carsouel.classList.add("no-transition");
        carsouel.scrollLeft = carsouel.offsetWidth;
        carsouel.classList.remove("no-transition");
    }
clearTimeout(timeoutId);
if(!wrapper.matches(":hover"))autoPlay();
};

carsouel.addEventListener("mousedown" , dragStart);
carsouel.addEventListener("mousemove" , dragging);
document.addEventListener("mouseup" , dragStope);
carsouel.addEventListener("scroll" , infiniteScroll);
wrapper.addEventListener("mouseenter" ,()=> clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave" , autoPlay);



