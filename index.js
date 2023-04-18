document.getElementsByTagName('form')[0].addEventListener('submit',() => {
    event.preventDefault();
    let canCalculate = true;
    for (const el of event.target.elements){
        if(el === event.submitter){
            break;
        }
        canCalculate = canCalculate && checkIfEmpty(el);
        canCalculate = canCalculate && checkIfValid(el);
    }
    const inputDate = new Date(`${event.target.elements.month.value}-${event.target.elements.day.value}-${event.target.elements.year.value}`);
    canCalculate && showDateDiff(inputDate);
});

checkIfEmpty = (el) => {
    if(el.value.length === 0){
        el.parentElement.children[2].innerText = 'This field is required';
        el.parentElement.children[2].classList.remove('hide');
        el.parentElement.children[1].classList.add('err-input');
        el.parentElement.children[0].classList.add('err-msg');
        return false;
    }else{
        el.parentElement.children[2].classList.add('hide');
        el.parentElement.children[1].classList.remove('err-input');
        el.parentElement.children[0].classList.remove('err-msg');
        return true;
    }
}
checkIfValid = (el) => {
    if(el.value.length === 0){
        return false;
    }
    const inputVal = parseInt(el.value);
    const currentYear = new Date().getFullYear();
    if( (el.name === 'day' && (inputVal < 1 || inputVal > 31)) ||
        (el.name === 'month' && (inputVal < 1 || inputVal > 12)) || 
        (el.name === 'year' && (inputVal > currentYear ))
        ){
        el.parentElement.children[2].innerText = `Must be a valid ${el.name}`;
        el.parentElement.children[2].classList.remove('hide');
        el.parentElement.children[1].classList.add('err-input');
        el.parentElement.children[0].classList.add('err-msg');
        return false;
    }else{
        el.parentElement.children[2].classList.add('hide');
        el.parentElement.children[1].classList.remove('err-input');
        el.parentElement.children[0].classList.remove('err-msg');
        return true;
    }
}

showDateDiff = (inputDate) => {
    let diffInDays = Math.floor(Math.abs(inputDate - new Date()) / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffInDays/365.25);
    diffInDays-=(years * 365.25);
    const months = Math.floor(diffInDays/30.44);
    diffInDays-=(30.44 * months);
    const answerSpan = document.getElementsByClassName('answer');
    answerSpan[2].innerText = Math.ceil(diffInDays);
    answerSpan[1].innerText = months;
    answerSpan[0].innerText = years;
    
}
