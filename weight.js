let alltime = document.getElementById('alltime');
let oneweek = document.getElementById('oneweek');
let submit_button = document.getElementById('submit');

alltime.innerHTML = 'test';
oneweek.innerHTML = 'test';

submit_button.addEventListener('click',()=>{
    alltime.innerHTML = "working";
})