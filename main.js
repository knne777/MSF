const cols = [];
const map = [];
const elements = [];
var selected = false;
var start_sel = 0;
var end_sel = 0;
var fila_sel = 0;
var col_ini = 0;
const colors = ['green', 'blue', 'red', 'pink', 'turquoise', 'yellow', 'neutral'];
class Ele {
    nombre
    fila
    rango
    color
    attrib
    cols = []
    initial
    id
}
let mouse = {
    x: null,
    y: null,
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

const load = () => {
    var table = document.getElementById('table');
    for (let i = 0; i < 26; i++) {
        var fila = []
        var row = document.createElement('tr');
        for (let j = 0; j < 80; j++) {
            var col = document.createElement('td');
            col.classList.add('col')
            let input = document.createElement('input');
            var add = document.createElement('div');
            add.onmousedown = () => {
                selected = true;
                fila_sel = event.target.parentNode.Y;
                col_ini = event.target.parentNode.X;
                window.addEventListener('mousemove',
                    function (event) {
                        mouse.x = event.x;
                        mouse.y = event.y;
                        if (selected) {
                            for (let index = col_ini; index < map[fila_sel].length; index++) {
                                if (map[fila_sel][index].getBoundingClientRect().x > event.x) {
                                    set_border(fila_sel, col_ini, map[fila_sel][index].X)
                                    break;
                                }
                            }
                        }

                    }
                );

                document.onmouseup = (e) => {
                    if (selected) {
                        for (let index = col_ini; index < map[fila_sel].length; index++) {
                            if (map[fila_sel][index].getBoundingClientRect().x > event.x) {
                                let elem = new Ele();
                                var initial = '';
                                var col_fin = map[fila_sel - 1][index];
                                for (let index = col_ini ; index <= col_fin.X; index++) {
                                    elem.cols.push(map[fila_sel ][index]);
                                    initial += col_fin.firstChild.value;
                                }
                                
                                elem.initial = initial;
                                elem.nombre = 'nombre';
                                elem.fila = fila_sel + 1;
                                elem.rango = [col_ini+1, col_fin.X+1];
                                elem.color = 'green';
                                elem.attrib = '';
                                elem.id = '' + fila_sel + col_ini + col_fin.X;
                                elements.push(elem);
                                load_objects();
                                console.log(elements);
                                break;
                            }
                        }
                    }
                    selected = false;
                }
            }
            add.classList.add('add');
            input.classList.add('input');
            input.id = i.toString() + '_' + j.toString();
            input.Y = i;
            input.X = j;
            col.Y = i;
            col.X = j;
            col.appendChild(input);
            col.appendChild(add)
            col.oninput = (col) => {
                let len = col.originalTarget.value.length;
                var int = col.originalTarget;
                if (len > 1) {
                    var td = col.originalTarget.parentNode;
                    var next_td = cols[cols.indexOf(td) + 1];
                    if (next_td.firstChild.value.length >= 1) {
                        int.value = col.data.toUpperCase();
                        next_td.firstChild.focus();
                    } else {
                        int.value = int.value[0, 0].toUpperCase();
                        cols[cols.indexOf(td) + 1].firstChild.value = col.data.toUpperCase();
                        next_td.firstChild.focus();
                    }
                } else {
                    int.value = int.value.toUpperCase();
                }
            }
            col.onkeydown = (col) => {
                let len = col.originalTarget.value.length;
                var int = col.originalTarget;
                var X = col.originalTarget.X;
                var Y = col.originalTarget.Y;
                if (event.key == 'Backspace') {
                    if (len == 0) {
                        var td = col.originalTarget.parentNode;
                        var next_td = cols[cols.indexOf(td) - 1];
                        next_td.firstChild.focus();
                    }
                }
                if (event.key == 'ArrowDown') {
                    if (Y < 25) map[Y + 1][X].firstChild.focus();
                }
                if (event.key == 'ArrowUp') {
                    if (Y > 0) map[Y - 1][X].firstChild.focus();
                }
                if (event.key == 'ArrowRight') {
                    if (X < 79) map[Y][X + 1].firstChild.focus();
                }
                if (event.key == 'ArrowLeft') {
                    if (X > 0) map[Y][X - 1].firstChild.focus();
                }
            }

            col.firstChild.onfocus = (col) => {
                var X = col.originalTarget.X;
                var Y = col.originalTarget.Y;
                var activates = document.getElementsByClassName('visible');
                for (let index = 0; index < activates.length; index++) {
                    activates[index].classList.remove('visible');
                }
                col.originalTarget.parentNode.children[1].classList.add('visible');
                document.getElementById('X_loc').innerText = X + 1;
                document.getElementById('Y_loc').innerText = Y + 1;
                var enumsx = document.getElementsByClassName('enum top')[0].children;
                var enumsy = document.getElementsByClassName('enum left')[0].children;
                for (let index = 0; index < enumsx.length; index++) {
                    if (enumsx[index].innerText != '0') {
                        if (index == X) enumsx[index].classList = 'num activate';
                        else enumsx[index].classList = 'num';
                    } else {
                        if (index == X) enumsx[index].classList = 'num green activate';
                        else enumsx[index].classList = 'num green2';
                    }
                }
                for (let index = 0; index < enumsy.length; index++) {
                    if (enumsy[index].innerText != '0') {
                        if (index == Y) enumsy[index].classList = 'num activate';
                        else enumsy[index].classList = 'num';
                    } else {
                        if (index == Y) enumsy[index].classList = 'num green activate';
                        else enumsy[index].classList = 'num green2';
                    }
                }
            }
            fila.push(col)
            cols.push(col);
            row.appendChild(col)
        }
        map.push(fila);
        table.appendChild(row);
    }
    console.log(map);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function set_border(fila, inicio, fin) {
    for (let index = inicio; index <= fin; index++) {

        map[fila][index].classList.remove('selec_left');
        map[fila][index].classList.remove('selec_right')
        map[fila][index].classList.remove('selec_center')

        if (index == inicio) {
            map[fila][index].classList.add('selec_left');
        }
        else if (index == fin) {
            map[fila][index].classList.add('selec_right');
        }
        else {
            map[fila][index].classList.add('selec_center');
        }
    }
}

async function tottle(item) {

    var menu = item.parentNode.children[1];
    if (menu.classList.contains('activate')) {
        let x = menu.getBoundingClientRect().height;
        for (let index = x; index > 0; index -= 20) {
            menu.style.height = index.toString() + 'px';
            await sleep(1);
        }
    }
    menu.classList.toggle('activate');
}

const load_objects = () => {
    var html = '';
    elements.forEach(element => {
        var html_colors = '';
        colors.forEach(color => {
            if (element.color == color) {
                html_colors += `<option value="${color}" selected>${color}</option>';`;
            }
            else {
                html_colors += `<option value="${color}">${color}</option>';`;
            }
        });
        html += `<div class="row"><div class="element">
        <div class="row p15" onclick="tottle(this)">
            ${element.nombre}
        </div>
        <div id="${element.id}" class="menu">
            <div class="row label">
                <label for="name">Nombre: </label>
                <input type="text" name="name" id="name" class="in_add" maxlength="8" value="${element.nombre}">
            </div>
            <div class="row label">
                <label for="row">Fila: </label>
                <input type="number" name="row" id="row" class="in_add" max="26" min="0" value="${element.fila}">
            </div>
            <div class="row label">
                <label for="range_min">Rango: </label>
                <input type="number" name="range" id="range_min" class="add_short" max="80" min="0" value="${element.rango[0]}">
                :
                <input type="number" name="range" id="range_max" class="add_short" max="80" min="0" value="${element.rango[1]}">
            </div>
            <div class="row label">
                <label for="color">Color: </label>
                <select name="color" id="color" class="in_add" onchange="chg_color(this)">
                ${html_colors}
                </select>
            </div>
            <div class="row label">
            <div class="row">
                <label for="atrib">Atributos: </label>
                <select name="atrib" id="atrib" class="in_add" multiple>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                </select>
            </div>
            </div>
            <div class="row p15">
                <button class="btn accept" onclick="add_element()">Guardar</button>
            </div>
        </div>
    </div></div>`;
       
    });
    document.getElementById('elements').innerHTML = html;
}

function chg_color(item){
    let id_chg= item.parentNode.parentNode.id;
    let searched = elements.filter(element=>element.id==id_chg); 
    for (let index = 0; index < searched[0].cols.length; index++) {
        colors.forEach(element => {
            searched[0].cols[index].firstChild.classList.remove(element);
        });
        searched[0].cols[index].firstChild.classList.add(item.value)
    }
}

const add_element = () => {
    var nombre = document.getElementById('name').value;
    var fila = document.getElementById('row').value;
    var rango = [document.getElementById('range_min').value, document.getElementById('range_max').value];
    var color = document.getElementById('color').value;
    var attrib = document.getElementById('atrib').value;

    if (!fila) document.getElementById('row').classList.add('error');
    else {
        document.getElementById('row').classList.remove('error');
        if (rango[0] == "") document.getElementById('range_min').classList.add('error');
        else {
            document.getElementById('range_min').classList.remove('error');
            if (rango[1] == "") document.getElementById('range_max').classList.add('error');
            else {
                if (rango[0] < rango[1]) {
                    document.getElementById('range_max').classList.remove('error');
                    let elem = new Ele();
                    var initial = '';
                    for (let index = rango[0] - 1; index <= rango[1]; index++) {
                        let col = map[fila - 1][index];
                        col.firstChild.classList.remove(colors);
                        col.classList.add(color);
                        elem.cols.push(col);
                        initial += map[fila - 1][index].firstChild.value;
                    }
                    elem.initial = initial;
                    elem.nombre = nombre;
                    elem.fila = fila;
                    elem.rango = rango;
                    elem.color = color;
                    elem.attrib = attrib;
                    elem.id = nombre + fila + rango[0] + rango[1];
                    elements.push(elem);
                    load_objects();
                    console.log(elements);
                }
            }
        }
    }


}