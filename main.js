const cols = [];
const map = []

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
            add.onmousedown = (event) => {
                console.log(event);
            }
            add.classList.add('add');
            input.classList.add('input');
            input.id = i.toString() + '_' + j.toString();
            input.Y = i;
            input.X = j;
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
                    if(Y<25)map[Y+1][X].firstChild.focus();
                }
                if (event.key == 'ArrowUp') {
                    if(Y>0)map[Y-1][X].firstChild.focus();
                }
                if (event.key == 'ArrowRight') {
                    if(X<79)map[Y][X+1].firstChild.focus();
                }
                if (event.key == 'ArrowLeft') {
                    if(X>0)map[Y][X-1].firstChild.focus();
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

function tottle(item){
    var menu = document.getElementById('menu_add');
    menu.classList.toggle('activate');
}