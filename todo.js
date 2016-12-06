
// Globali
var form = document.querySelector('form');
var input = document.querySelector('input');
var template = document.querySelector('template');
var list = document.querySelector('ul');
var todo = [];
var checkLocal = localStorage.getItem('mohole-todo');

// Disegna elementi nella lista
function render(collection){
  list.innerHTML = '';
  collection.forEach(function(e,i){
    var elem = template.innerHTML
                  .replace('{{item}}', e)
                  .replace('{{index}}', i);
    list.innerHTML += elem;
  });
}

// Rimuove elemento selezionato
function removeItem(evt){
  var index = parseInt(evt.currentTarget.dataset.index);
  var filter = todo.filter(function(e,i){
    return i !== index;
  });
  todo = filter;
  render(todo);
  saveLocal(todo);
}

// Trasforma un oggetto o array JSON in stringa e salva in localStorage
function saveLocal(collection){
  var string = JSON.stringify(collection);
  localStorage.setItem('mohole-todo', string);
}

// Aggiunge nuovo elemento
form.addEventListener('submit', function(evt){
  evt.preventDefault();
  var text = input.value;
  todo.push(text);
  render(todo);
  saveLocal(todo);
  input.value = '';
});

if(checkLocal){
  todo = JSON.parse(checkLocal);
}

// Primo render
render(todo);
