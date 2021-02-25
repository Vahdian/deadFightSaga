const fighters = []

dmg1 = []
dmg2 = []
realDmg1 = [0,0]
realDmg2 = [0,0]


const firstHit = Math.round(Math.random())
const secondHit = Math.abs(1 - firstHit)

const body = document.querySelector('body')
const main = document.querySelector('main')
const pick = document.createElement('p')

pick.innerHTML = 'Pick your fighters!'
body.appendChild(pick)


startGame()
function startGame(){
fetch("http://localhost:3000/characters").then( res=> res.json()).then( characters =>{
    for(let i=0; characters.length>i;i++){
        const div$$ = document.createElement('div')
        div$$.classList.add('animate__animated','animate__bounceInDown')
        const image = document.createElement('img')
        image.src = characters[i].avatar
        image.classList.add('animate__animated','animate__bounceInDown')
        image.height = 300
        image.width = 200
        image.id= i
            
            image.addEventListener('click', (event)=>{
                selectRace(div$$, image)
                changePick()
                idFigther = event.target.id;
                fighters.push(idFigther)
                if(fighters.length == 2){
                    newScreen(fighters)
                    /* battle(fighters); */
                }
                console.log(fighters)
            
        })
        div$$.appendChild(image)
        main.appendChild(div$$)

    }
})
}

newScreen = () =>{
    const main = document.querySelector('main')
    main.innerHTML = ''
    pick.innerHTML =''
    fetch("http://localhost:3000/characters").then( res=> res.json()).then( characters =>{
        const idplayer1 = fighters[0]
        const idplayer2 = fighters[1]
        const div$$ = document.createElement('div')
        const image1 = document.createElement('img')
        image1.src = characters[idplayer1].avatar
        image1.height = 300
        image1.width = 200
        image1.classList.add('animate__animated','animate__flip', 'one')
        div$$.appendChild(image1)
        main.appendChild(div$$)
        const vs = document.createElement('img')
        vs.src = 'public/images/vs.png'
        vs.height = 300
        vs.width = 300
        vs.classList.add('vs')
        main.appendChild(vs)
        const div$$2 = document.createElement('div')
        const image2 = document.createElement('img')
        image2.src = characters[idplayer2].avatar
        image2.classList.add('animate__animated','animate__flip', 'two')
        image2.height = 300
        image2.width = 200
        div$$2.appendChild(image2)
        main.appendChild(div$$2)
        const fight = document.createElement('button')
        fight.classList.add('buttons')
        fight.innerHTML = "FIGHT!"
        footer = document.querySelector('footer')
        footer.appendChild(fight)
        fight.addEventListener('click', ()=>{smash()})


    })
    
    
}

function battle() {
    
    const main = document.querySelector('main')
    main.innerHTML = ''
    pick.innerHTML = ''
    fetch("http://localhost:3000/characters").then( res=> res.json()).then( brawlers =>{
        const attacker = fighters[firstHit]
        const attacked = fighters[secondHit]
    
        
        const div$$ = document.createElement('div')
        const image1 = document.createElement('img')
        image1.src = brawlers[attacker].avatar
        image1.height = 350
        image1.width = 250
        image1.classList.add('animate__animated','animate__backInDown', 'one')
        const hp1 = document.createElement('h3')
        hp1.innerHTML = 'HP:'+ (brawlers[attacker].vitality) 
        hp1.classList.add('hp1')
        div$$.appendChild(image1)
        div$$.appendChild(hp1)
        main.appendChild(div$$)
        
        const article$$ = document.createElement('article')
        
        console.log(firstHit)
       
        const p$$ = document.createElement('h2')
        p$$.innerHTML = brawlers[attacker].name + ' attacks first!'
        article$$.appendChild(p$$)
        const imageDice = document.createElement('img')
        imageDice.src = "public/images/dice.png"
        imageDice.height = 300
        article$$.appendChild(imageDice)
        main.appendChild(article$$)
        
        const div$$2 = document.createElement('div')
        const image2 = document.createElement('img')
        image2.src = brawlers[attacked].avatar
        image2.classList.add('animate__animated','animate__backInDown', 'two')
        image2.height = 350
        image2.width = 250
        div$$2.appendChild(image2)
        const hp2 = document.createElement('h3')
        hp2.classList.add('hp2')
        hp2.innerHTML = 'HP:'+ (brawlers[attacked].vitality) 
        div$$2.appendChild(hp2)
        main.appendChild(div$$2)
        const fight = document.createElement('button')
        fight.classList.add('buttonFighterOne')
        fight.innerHTML = "ATTACK!"
        footer = document.querySelector('footer')
        footer.appendChild(fight)
        fight.addEventListener('click', ()=>{
            
            dmgCalcFirst(brawlers)
            footer.innerHTML = ''
            footer = document.querySelector('footer')
            const hp2 = document.querySelector('.hp2')
            hp2.innerHTML = 'HP:'+ ((brawlers[attacked].vitality) - realDmg2[(realDmg2.length -1)])
            const retaliate = document.createElement('button')
            retaliate.classList.add('buttonFighterOne')
            retaliate.innerHTML = "RETALIATE!"
            footer.appendChild(retaliate)
            retaliate.addEventListener('click', ()=>{
                dmgCalcSecond(brawlers)
                const hp1 = document.querySelector('.hp1')
            hp1.innerHTML = 'HP:'+ ((brawlers[attacker].vitality) - realDmg1[(realDmg1.length -1)])
            footer.innerHTML = ''
            
            EndBattle(brawlers)
         
            
            })
        
        })


    })
    
    
}

function battle2(brawlers){
    const attacker = fighters[firstHit]
    const attacked = fighters[secondHit]
    
    const fight = document.createElement('button')
    fight.classList.add('buttonFighterOne')
    fight.innerHTML = "ATTACK!"
    footer.appendChild(fight)
    fight.addEventListener('click', ()=>{
        
        
        
        dmgCalcFirst(brawlers)
        EndBattle(brawlers)
        footer.innerHTML = ''
        footer = document.querySelector('footer')
        const hp2 = document.querySelector('.hp2')
        hp2.innerHTML = 'HP:'+ ((brawlers[attacked].vitality) - realDmg2[(realDmg2.length -1)])
        const retaliate = document.createElement('button')
        retaliate.classList.add('buttonFighterOne')
        retaliate.innerHTML = "RETALIATE!"
        footer.appendChild(retaliate)
        retaliate.addEventListener('click', ()=>{
            dmgCalcSecond(brawlers)
            EndBattle(brawlers)
            const hp1 = document.querySelector('.hp1')
        hp1.innerHTML = 'HP:'+ ((brawlers[attacker].vitality) - realDmg1[(realDmg1.length -1)])
        footer.innerHTML = ''
        EndBattle(brawlers)
       
            
})
    })
}


dmg = 0

function EndBattle(brawlers){
    const attacker = fighters[firstHit]
        const attacked = fighters[secondHit]
    if((((brawlers[attacker].vitality) == realDmg1[(realDmg1.length -1)]) || (brawlers[attacker].vitality) < realDmg1[(realDmg1.length -1)])){
        finalBackground(brawlers)
        console.log('Battle Ended 1 wins')
    } else if(((brawlers[attacked].vitality) == realDmg2[(realDmg2.length -1)]) || ((brawlers[attacked].vitality) < realDmg2[(realDmg2.length -1)])) {
        finalBackground2(brawlers)
    } else{
    
    battle2(brawlers)
    }
}

function dmgCalcFirst(brawlers) {
    const firstHitter = fighters[firstHit]
    const secondHitter = fighters[secondHit]
    const NumAttacks = brawlers[firstHitter].damage.length
    
    for(let i = 0; NumAttacks>i;i++){
        
        let prueba = (brawlers[firstHitter].damage[i]).split('d')
        console.log(prueba)
        for(let x=0; prueba[0]>x;x++){
            dmg =+ Math.abs(Math.floor((Math.random()*(prueba[1]) + 1))) 
            dmg1.push(dmg)
            }
            console.log(dmg1) 

            

    }

    let dmgPreDef = dmg1.reduce((accumulator, dmg) => accumulator + dmg, 0);
    console.log(dmgPreDef)

    let dmgFirstTurn = dmgPreDef - brawlers[secondHitter].defense
    console.log(dmgFirstTurn)

    realDmg2.push(dmgFirstTurn)
    console.log(realDmg2)
    
    EndBattle(brawlers)
}

function dmgCalcSecond(brawlers) {
    const firstHitter = fighters[firstHit]
    const secondHitter = fighters[secondHit]
    const NumAttacks = brawlers[secondHitter].damage.length
    
    for(let i = 0; NumAttacks>i;i++){
        
        let prueba = (brawlers[secondHitter].damage[i]).split('d')
        console.log(prueba)
        for(let x=0; prueba[0]>x;x++){
            dmg =+ Math.abs(Math.floor((Math.random()*(prueba[1]) + 1))) 
            dmg2.push(dmg)
            }
            console.log(dmg2) 

    }

    let dmgPreDef2 = dmg2.reduce((accumulator, dmg) => accumulator + dmg, 0);
    console.log(dmgPreDef2)

    let dmgSecondTurn = dmgPreDef2 - brawlers[firstHitter].defense
    console.log(dmgSecondTurn)

    realDmg1.push(dmgSecondTurn)
    console.log(realDmg1)

    EndBattle(brawlers)
    
}

function smash(){
    const main = document.querySelector('main')
    main.innerHTML = ''
    footer.innerHTML =''
    playAudio2()
    fetch("http://localhost:3000/characters").then( res=> res.json()).then( characters =>{
        const idplayer1 = fighters[0]
        const idplayer2 = fighters[1]
        const div$$ = document.createElement('div')
        div$$.classList.add('animate__animated','animate__backOutRight', 'one')
        const image1 = document.createElement('img')
        image1.src = characters[idplayer1].avatar
        image1.height = 300
        image1.width = 200
        image1.classList.add('animate__animated','animate__slideOutRight', 'one')
        div$$.appendChild(image1)
        main.appendChild(div$$)
        const vs = document.createElement('img')
    
        main.appendChild(vs)
        const div$$2 = document.createElement('div')
        div$$2.classList.add('animate__animated','animate__backOutLeft', 'one')
        const image2 = document.createElement('img')
        image2.src = characters[idplayer2].avatar
        image2.classList.add('animate__animated','animate__slideOutLeft', 'two')
        image2.height = 300
        image2.width = 200
        div$$2.appendChild(image2)
        main.appendChild(div$$2) 
        setTimeout(()=>{battle()}, 2000)
})
}


function finalBackground(brawlers){
    
    const attacked = fighters[secondHit]
    main.innerHTML =''
    footer.innerHTML = ''
    result = document.createElement('div')
    
    result.id = 'overlay'
    image = document.createElement('img')
    result.appendChild(image)
    image.src = brawlers[attacked].avatar
    image.height =300
    image.id ='overlay2'
    p = document.createElement('h2')
    p.innerHTML = brawlers[attacked].name + ' wins!'
    result.appendChild(p)
    main.appendChild(result)
    const fight = document.createElement('button')
        fight.classList.add('buttons')
        fight.innerHTML = "PLAY AGAIN!"
        footer = document.querySelector('footer')
        footer.appendChild(fight)
        fight.addEventListener('click', ()=>{
            /* resetTotal() */
            startGame()})

   

}

function finalBackground2(brawlers){
    const attacker = fighters[firstHit]
    footer.innerHTML = ''
    main.innerHTML =''
    result = document.createElement('div')
    
   
    result.id = 'overlay'
    image = document.createElement('img')
    result.appendChild(image)
    image.src = brawlers[attacker].avatar
    image.height =300
    image.id ='overlay2'
    p = document.createElement('h2')
    p.innerHTML = brawlers[attacker].name + ' wins!'
    result.appendChild(p)

    main.appendChild(result)
    const fight = document.createElement('button')
        fight.classList.add('buttons')
        fight.innerHTML = "PLAY AGAIN!"
        footer = document.querySelector('footer')
        footer.appendChild(fight)
        fight.addEventListener('click', ()=>{
            /* resetTotal() */
            startGame()})

}

function resetTotal(){
    main.innerHTML =''
    footer.innerHTML = ''
    const fighters = []

    dmg1 = []
    dmg2 = []
    realDmg1 = [0,0]
    realDmg2 = [0,0]
}

function selectRace(div, image){
    image.classList.add('imageGone')
    div.classList.add('selected')
}

function changePick(){
    const pick = document.querySelector('p')
    pick.innerHTML = 'Now select your enemy!'
    pick.classList.add("animate__animated", "animate__bounce", "animate__infinite")
    playAudio()
}

function playAudio() {
    new Audio('public/audios/sel.wav').play();
    new Audio('public/audios/click.wav').play();
  }

function playAudio2() {
    new Audio('public/audios/click2.wav').play();
    new Audio('public/audios/click.wav').play();
    new Audio('public/audios/clink.wav').play();
  }
/* function loading() {
    const loading1 = document.createElement('div')
    loading1.classList.add('loading')
    const loading2= document.createElement('div')
    loading1.appendChild(loading2)
    loading2.classList.add('loading-text')
    const spanL= document.createElement('span')
    loading2.appendChild(spanL)
    spanL.innerHTML = "L"
    spanL.classList.add('loading-text-words')
    const spanO= document.createElement('span')
    loading2.appendChild(spanO)
    spanL.innerHTML = "O"
    spanO.classList.add('loading-text-words')
    main.appendChild(loading1)

} */