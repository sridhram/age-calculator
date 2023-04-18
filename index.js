document.getElementsByTagName('form')[0].addEventListener('submit',() => {
    event.preventDefault();
    let canCalculate = true;
    for (const el of event.target.elements){
        if(el === event.submitter){
            return;
        }
        canCalulate = canCalulate && checkIfEmpty(el);
        canCalulate = canCalulate && checkIfValid(el);
    }
    canCalculate && getDateDiff();
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
    }
}
checkIfValid = (el) => {
    if(el.value.length === 0){
        return;
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
    }
}

getDateDiff = () => {
    
}