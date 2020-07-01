$(function() {
    iniGame();
});

function colorBlink(selector) {
    $(selector).animate({
            opacity: '1',
        }, {
            step: function() {
                $(this).css('color', 'white');
            },
            queue: true
        })
        .animate({
            opacity: '1'
        }, {
            step: function() {
                $(this).css('color', 'yellow');
            },
            queue: true
        }, 600)
        .delay(100)
        .animate({
            opacity: '1'
        }, {
            step: function() {
                $(this).css('color', 'white');
            },
            queue: true
        })
        .animate({
            opacity: '1'
        }, {
            step: function() {
                $(this).css('color', 'yellow');
                colorBlink('h1.main-titulo');
            },
            queue: true
        });
}

function obtenerCadenaRamdon(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function obtenerCaramelsArrays(arrayType, index) {

    var CaramelCol1 = $('.col-1').children();
    var CaramelCol2 = $('.col-2').children();
    var CaramelCol3 = $('.col-3').children();
    var CaramelCol4 = $('.col-4').children();
    var CaramelCol5 = $('.col-5').children();
    var CaramelCol6 = $('.col-6').children();
    var CaramelCol7 = $('.col-7').children();

    var CaramelColumns = $([CaramelCol1, CaramelCol2, CaramelCol3, CaramelCol4,
        CaramelCol5, CaramelCol6, CaramelCol7
    ]);

    if (typeof index === 'number') {
        var CaramelRow = $([CaramelCol1.eq(index), CaramelCol2.eq(index), CaramelCol3.eq(index),
            CaramelCol4.eq(index), CaramelCol5.eq(index), CaramelCol6.eq(index),
            CaramelCol7.eq(index)
        ]);
    } else {
        index = '';
    }

    if (arrayType === 'columns') {
        return CaramelColumns;
    } else if (arrayType === 'rows' && index !== '') {
        return CaramelRow;
    }
}

function CaramelRows(index) {
    var CaramelRow = obtenerCaramelsArrays('rows', index);
    return CaramelRow;
}

function CaramelColumns(index) {
    var CaramelColumn = obtenerCaramelsArrays('columns');
    return CaramelColumn[index];
}

function columnValidacion() {
    for (var j = 0; j < 7; j++) {
        var counter = 0;
        var CaramelPosicion = [];
        var extraCaramelPosicion = [];
        var CaramelColumn = CaramelColumns(j);
        var CompararValor = CaramelColumn.eq(0);
        var gap = false;
        for (var i = 1; i < CaramelColumn.length; i++) {
            var srcComparar = CompararValor.attr('src');
            var srcCaramel = CaramelColumn.eq(i).attr('src');

            if (srcComparar != srcCaramel) {
                if (CaramelPosicion.length >= 3) {
                    gap = true;
                } else {
                    CaramelPosicion = [];
                }
                counter = 0;
            } else {
                if (counter == 0) {
                    if (!gap) {
                        CaramelPosicion.push(i - 1);
                    } else {
                        extraCaramelPosicion.push(i - 1);
                    }
                }
                if (!gap) {
                    CaramelPosicion.push(i);
                } else {
                    extraCaramelPosicion.push(i);
                }
                counter += 1;
            }
            CompararValor = CaramelColumn.eq(i);
        }
        if (extraCaramelPosicion.length > 2) {
            CaramelPosicion = $.merge(CaramelPosicion, extraCaramelPosicion);
        }
        if (CaramelPosicion.length <= 2) {
            CaramelPosicion = [];
        }
        CaramelCount = CaramelPosicion.length;
        if (CaramelCount >= 3) {
            borrarColumnCaramel(CaramelPosicion, CaramelColumn);
            setScore(CaramelCount);
        }
    }
}

function borrarColumnCaramel(CaramelPosicion, CaramelColumn) {
    for (var i = 0; i < CaramelPosicion.length; i++) {
        CaramelColumn.eq(CaramelPosicion[i]).addClass('borrar');
    }
}

function rowValidacion() {
    for (var j = 0; j < 7; j++) {
        var counter = 0;
        var CaramelPosicion = [];
        var extraCaramelPosicion = [];
        var CaramelRow = CaramelRows(j);
        var CompararValor = CaramelRow[0];
        var gap = false;
        for (var i = 1; i < CaramelRow.length; i++) {
            var srcComparar = CompararValor.attr('src');
            var srcCaramel = CaramelRow[i].attr('src');

            if (srcComparar != srcCaramel) {
                if (CaramelPosicion.length >= 3) {
                    gap = true;
                } else {
                    CaramelPosicion = [];
                }
                counter = 0;
            } else {
                if (counter == 0) {
                    if (!gap) {
                        CaramelPosicion.push(i - 1);
                    } else {
                        extraCaramelPosicion.push(i - 1);
                    }
                }
                if (!gap) {
                    CaramelPosicion.push(i);
                } else {
                    extraCaramelPosicion.push(i);
                }
                counter += 1;
            }
            CompararValor = CaramelRow[i];
        }
        if (extraCaramelPosicion.length > 2) {
            CaramelPosicion = $.merge(CaramelPosicion, extraCaramelPosicion);
        }
        if (CaramelPosicion.length <= 2) {
            CaramelPosicion = [];
        }
        CaramelCount = CaramelPosicion.length;
        if (CaramelCount >= 3) {
            borrarHorizontal(CaramelPosicion, CaramelRow);
            setScore(CaramelCount);
        }
    }
}

function borrarHorizontal(CaramelPosicion, CaramelRow) {
    for (var i = 0; i < CaramelPosicion.length; i++) {
        CaramelRow[CaramelPosicion[i]].addClass('borrar');
    }
}

function setScore(CaramelCount) {
    var score = Number($('#score-text').text());
    switch (CaramelCount) {
        case 3:
            score += 25;
            break;
        case 4:
            score += 50;
            break;
        case 5:
            score += 75;
            break;
        case 6:
            score += 100;
            break;
        case 7:
            score += 200;
    }
    $('#score-text').text(score);
}

function checkBoard() {
    fillBoard();
}

function fillBoard() {
    var top = 7;
    var column = $('[class^="col-"]');

    column.each(function() {
        var Caramels = $(this).children().length;
        var agrega = top - Caramels;
        for (var i = 0; i < agrega; i++) {
            var CaramelType = obtenerCadenaRamdon(1, 5);
            if (i === 0 && Caramels < 1) {
                $(this).append('<img src="image/' + CaramelType + '.png" width = "95px" height = "95px" class="element"></img>');
            } else {
                $(this).find('img:eq(0)').before('<img src="image/' + CaramelType + '.png" width = "95px" height = "95px" class="element"></img>');
            }
        }
    });
    addCaramelEvents();
    setValidacion();
}


function setValidacion() {
    columnValidacion();
    rowValidacion();
    if ($('img.borrar').length !== 0) {
        borrarsCaramelAnimation();
    }
}

function addCaramelEvents() {
    $('img').draggable({
        containment: '.panel-tablero',
        droppable: 'img',
        revert: true,
        revertDuration: 500,
        grid: [80, 80],
        zIndex: 10,
        drag: restringirCaramelMove
    });
    $('img').droppable({
        drop: swapCaramel
    });
    enableCaramelEvents();
}

function disableCaramelEvents() {
    $('img').draggable('disable');
    $('img').droppable('disable');
}

function enableCaramelEvents() {
    $('img').draggable('enable');
    $('img').droppable('enable');
}

function restringirCaramelMove(event, moveCaramel) {
    moveCaramel.Posicion.top = Math.min(100, moveCaramel.Posicion.top);
    moveCaramel.Posicion.bottom = Math.min(100, moveCaramel.Posicion.bottom);
    moveCaramel.Posicion.left = Math.min(100, moveCaramel.Posicion.left);
    moveCaramel.Posicion.right = Math.min(100, moveCaramel.Posicion.right);
}

function swapCaramel(event, moveCaramel) {
    var moveCaramel = $(moveCaramel.draggable);
    var dragSrc = moveCaramel.attr('src');
    var CaramelDrop = $(this);
    var dropSrc = CaramelDrop.attr('src');
    moveCaramel.attr('src', dropSrc);
    CaramelDrop.attr('src', dragSrc);

    setTimeout(function() {
        checkBoard();
        if ($('img.borrar').length === 0) {
            moveCaramel.attr('src', dragSrc);
            CaramelDrop.attr('src', dropSrc);
        } else {
            updateMoves();
        }
    }, 500);

}

function checkBoardPromise(result) {
    if (result) {
        checkBoard();
    }
}

function updateMoves() {
    var actualValor = Number($('#movimientos-text').text());
    var result = actualValor += 1;
    $('#movimientos-text').text(result);
}

function borrarsCaramelAnimation() {
    disableCaramelEvents();
    $('img.borrar').effect('pulsate', 400);
    $('img.borrar').animate({
            opacity: '0'
        }, {
            duration: 300
        })
        .animate({
            opacity: '0'
        }, {
            duration: 400,
            complete: function() {
                borrarsCaramel()
                    .then(checkBoardPromise)
                    .catch(showPromiseError);
            },
            queue: true
        });
}

function showPromiseError(error) {
    console.log(error);
}

function borrarsCaramel() {
    return new Promise(function(resolve, reject) {
        if ($('img.borrar').remove()) {
            resolve(true);
        } else {
            reject('No se pudo eliminar Caramel...');
        }
    })
}

function endGame() {
    $('div.panel-tablero, div.time').effect('fold');
    $('h1.main-titulo').addClass('title-over')
        .text('Gracias por jugar!');
    $('h1.main-titulo').addClass('title-over')
        .text('Juego terminado');
    $('div.score, div.moves, div.panel-score').width('100%');

}

function iniGame() {

    colorBlink('h1.main-titulo');

    $('.btn-reinicio').click(function() {
        var temporizador = new Temporizador();
        temporizador.init();
        if ($(this).text() === 'Reiniciar') {
            location.reload(true);
        }
        checkBoard();
        $(this).text('Reiniciar');
        clearTimeout();
    });
}

class Temporizador {
    constructor() {
        this.tiempo = 120;
    }

    getTime() {
        return this.tiempo;
    }

    init() {
        setInterval(() => {
            this.tiempo--;
            var segundo = this.tiempo;
            var d = new Date(segundo * 1000);
            //var hora = (d.getHours() == 0) ? 23 : d.getHours() - 1;
            //ar hora = (hora < 9) ? "0" + hora : hora;
            var minuto = (d.getMinutes() < 9) ? "0" + d.getMinutes() : d.getMinutes();
            var segundo = (d.getSeconds() < 9) ? "0" + d.getSeconds() : d.getSeconds();
            //var hora = (d.getHours() == 0) ? 23 : d.getHours() - 1;
            document.getElementById('timer').innerHTML = minuto + ":" + segundo;
            if (minuto == 0 & segundo == 0) {
                endGame();
            }



        }, 1000);
    }
}