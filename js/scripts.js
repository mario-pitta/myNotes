let notes = window.localStorage.getItem('notes') || '{ "data": [] }';
notes = JSON.parse(notes);

let updateList = function (){
    console.log('[App] start watch');

    Array.observe(notes.data, function (changes){
        let index = null;
        let value = '';
        let status = null;

        if (changes[0].type === 'splice'){
            index = changes[0].index;
            value = changes[0].object[index];
            status = (changes[0].addedCount > 0) ? 'created' : 'removed';
        }

        if (changes[0].type === 'update'){
            index = changes[0].name;
            value = changes[0].object[index];
            status = 'updated';
        }

        if (!value && status === 'created' && status === 'updated'){
            return;
        }

        let notesTag = document.getElementById('notes');

        if (status === 'updated'){
            console.log('implementar')
        }
        if (status === 'removed'){
            let listOfNotes = document.querySelectorAll("#notes li");
            console.log(listOfNotes[index]);
            notesTag.removeChild(listOfNotes[index]);
            console.log('removido')
        }
        if (status === 'created'){
            let newLi = document.createElement('li');
            newLi.innerHTML = value;
            notesTag.appendChild(newLi);
        }

        window.localStorage.setItem('notes', JSON.stringify(notes));
    });
}

let createNote = function() {
    let input = document.querySelector('#form-add-note input[type="text"]');
    let value = input.value

    notes.data.push(value);
    console.log(value);
    console.log('ok');
    
    input.value = "";
}

updateList();


document.addEventListener('DOMContentLoaded', function(event) {
    let listOfNotes = document.getElementById('notes');
    let listHtml = '';

    for(let i=0; i < notes.data.length; i++){
        listHtml += '<li>'+ notes.data[i] + '</li>'
    }

    listOfNotes.innerHTML = listHtml;

    let sendNote = document.getElementById('form-add-note')
    sendNote.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("enviou ");
        createNote();
    });
})

document.addEventListener('click', function(e) {
    let notesTag =  document.getElementById('notes');

    if(e.target.parentElement === notesTag){
        if (confirm('remover essa nota?')){
            let listOfNotes = document.querySelectorAll('#notes li');
            listOfNotes.forEach(function (item, index){
                if (e.target === item){
                    notes.data.splice(index, 1);
                }
            });
        }
    }
});

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js').then(function(reg){
        console.log('Service Worker Registered');
    }).catch(function(err){
        console.log('erro', err);
    });
}