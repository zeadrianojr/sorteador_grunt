document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sort').addEventListener('submit', function(e){
        e.preventDefault();
        let maxNumber = document.getElementById('max-number').value;
        maxNumber = parseInt(maxNumber);
        let randomNum = Math.random() * maxNumber;
        //alert(randomNum);
        randomNum = Math.round(randomNum);
        console.log(randomNum)
        while (randomNum == 0){
            randomNum = Math.random() * maxNumber;
            randomNum = Math.round(randomNum);
        }

        document.getElementById('show-value').innerText = randomNum;
        document.querySelector('.result').style.display = 'block';
    })
})