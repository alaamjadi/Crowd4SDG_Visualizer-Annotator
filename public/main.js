var options = ""
var question = ""
var myDataObject = []
let file
let csvAsArray
let splitStep = 100
let tweetID_columnNumber, tweetURL_columnNumber

function sanitize(input) {
    var illegalRe = /[\/\?<>\\:\*\|":]/g;
    var controlRe = /[\x00-\x1f\x80-\x9f]/g;
    var reservedRe = /^\.+$/;
    var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    return input.replace(illegalRe, '').replace(controlRe, '').replace(reservedRe, '').replace(windowsReservedRe, '')
}

/* Copyright 2012-2013 Daniel Tillin
 * csvToArray v2.1 (Unminifiled for development)
 * http://code.google.com/p/csv-to-array/
*/
String.prototype.csvToArray = function (o) {
    var od = {
        'fSep': ',',
        'rSep': '\n',
        'quot': '"',
        'head': false,
        'trim': false
    }
    if (o) {
        for (var i in od) {
            if (!o[i]) o[i] = od[i];
        }
    } else {
        o = od;
    }
    var a = [
        ['']
    ];
    for (var r = f = p = q = 0; p < this.length; p++) {
        switch (c = this.charAt(p)) {
            case o.quot:
                if (q && this.charAt(p + 1) == o.quot) {
                    a[r][f] += o.quot;
                    ++p;
                } else {
                    q ^= 1;
                }
                break;
            case o.fSep:
                if (!q) {
                    if (o.trim) {
                        a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                    }
                    a[r][++f] = '';
                } else {
                    a[r][f] += c;
                }
                break;
            case o.rSep.charAt(0):
                if (!q && (!o.rSep.charAt(1) || (o.rSep.charAt(1) && o.rSep.charAt(1) == this.charAt(p + 1)))) {
                    if (o.trim) {
                        a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                    }
                    a[++r] = [''];
                    a[r][f = 0] = '';
                    if (o.rSep.charAt(1)) {
                        ++p;
                    }
                } else {
                    a[r][f] += c;
                }
                break;
            default:
                a[r][f] += c;
        }
    }
    if (o.head) {
        a.shift()
    }
    if (a[a.length - 1].length < a[0].length) {
        a.pop()
    }
    return a;
}

function deletChild(id_element) {
    var e = document.querySelector("#" + id_element);
    var child = e.firstElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function handleClick(array_index, options_tag) {
    for (let index = 0; index < options.length; index++) {
        $("#btn-" + myDataObject[array_index].unique_id + "-" + options[index].replace(/\s+/g, "")).removeClass('active')
    }
    $("#btn-" + myDataObject[array_index].unique_id + "-" + options_tag.replace(/\s+/g, "")).toggleClass("active")
    myDataObject[array_index].options_chosen = options_tag
}

function selectAllButtons(btnID) {
    let all_the_buttons = document.getElementsByClassName(`btn-Group-${btnID.replace(/\s+/g, "")}`)
    for (var i = 0, n = all_the_buttons.length; i < n; ++i) {
        handleClick(all_the_buttons[i].title, btnID)
    }
    $('#checkModal').modal('hide')
}

function drawImageBoxWithOptions(array_index) {
    document.getElementById('twitter-images').innerHTML += `<div class="d-flex justify-content-center col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-center"><div class="table-responsive"><table class="table borderless"><tr><td><img alt="Twitter Image with ID ${myDataObject[array_index].unique_id}" src="${myDataObject[array_index].url_secure}" width="200" height="200" title="${myDataObject[array_index].unique_id}"></td></tr><tr><td><div class="fs-7">${myDataObject[array_index].tweet_id}</div></td></tr><tr><td><div id="btn${myDataObject[array_index].unique_id}"></div></td></tr></table></div></div>`
    
    for (let index = 0; index < options.length; index++) {
        document.getElementById(`btn${myDataObject[array_index].unique_id}`).innerHTML += `<button type="button" id="btn-${myDataObject[array_index].unique_id}-${options[index].replace(/\s+/g, "")}" title="${array_index}" onclick="handleClick('${array_index}', '${options[index]}')" class="btn-Group-${options[index].replace(/\s+/g, "")} shadow rounded-lg button center mr-2 mb-2">${options[index]}</button>`
    }
    if (myDataObject[array_index].options_chosen !== 'Did Not Load The Page' || 'Not Clicked' || 'Image Not Found') {
        $("#btn-" + myDataObject[array_index].unique_id + "-" + myDataObject[array_index].options_chosen.replace(/\s+/g, "")).toggleClass("active")
    }
}

function checkImage(array_index) {
    const image = new Image();
    image.src = myDataObject[array_index].url_secure;
    image.onload = function () {
        drawImageBoxWithOptions(array_index)
    }
    image.onerror = function () {
        myDataObject[array_index].options_chosen = "Image Not Found"
    }
}

function arrayInitial(tweetID_columnNumber, tweetURL_columnNumber) {
    csvAsArray.forEach(element => {
        if (element[tweetID_columnNumber-1] == "id") {
            // skipping to the next element
            return
        } else {
            if (element[tweetURL_columnNumber-1].split(':')[0] == "http") {
                myDataObject.push(
                    {
                        unique_id: element[tweetURL_columnNumber-1].split('/').pop().split('.')[0],
                        tweet_id: element[tweetID_columnNumber-1],
                        url_raw: element[tweetURL_columnNumber-1],
                        url_secure: element[tweetURL_columnNumber-1].replace(':', 's:'),
                        options_chosen: "Did Not Load The Page"
                    }
                )
            } else {
                myDataObject.push(
                    {
                        unique_id: element[tweetURL_columnNumber-1].split('/').pop().split('.')[0],
                        tweet_id: element[tweetID_columnNumber-1],
                        url_raw: element[tweetURL_columnNumber-1],
                        url_secure: element[tweetURL_columnNumber-1],
                        options_chosen: "Did Not Load The Page"
                    }
                )
            }
        }
    });
}

function loadPage(pageNumber) {
    if (Math.ceil(myDataObject.length / splitStep) == pageNumber) {
        for (var array_index = splitStep * (pageNumber - 1) + 1; array_index < myDataObject.length; array_index++) {
            checkImage(array_index)
        }
    } else if (Math.ceil(myDataObject.length / splitStep) > pageNumber) {
        for (var array_index = splitStep * (pageNumber - 1) + 1; array_index < splitStep * pageNumber + 1; array_index++) {
            checkImage(array_index)
        }
    }
}

function loadPageButtons() {
    deletChild('PaginationButtons')
    for (let index = 1; index <= Math.ceil(csvAsArray.length / splitStep); index++) {
        document.getElementById('PaginationButtons').innerHTML += `<button class="shadow rounded-lg button center mr-2 mb-2 cus_pagination" id="Page${index}" onclick="pagination(${index})">${index}</button>`
    }
}

function pagination(pageNumber) {
    window.stop()
    deletChild('twitter-images')
    for (let index = 1; index <= Math.ceil(csvAsArray.length / splitStep); index++) {
        $("#Page" + index).removeClass('active')
    }
    $("#Page" + pageNumber).toggleClass("active")
    loadPage(pageNumber)
}

$('#submit-question-answer').click(function () {
    deletChild('twitter-images')
    deletChild('PaginationButtons')
    question = $('#question-text').val()
    options = $('#answer-text').val().split(';')
    if (question.length && options.length != 0) {
        $('#question-position').text(question)
        $('#questionAnswerModal').modal('hide')
    } else {
        alert('Either Question or Answer field is empty!')
    }
    deletChild('checkAllModalButtons')
    for (let index = 0; index < options.length; index++) {
        document.getElementById(`checkAllModalButtons`).innerHTML += `<button type="button" id="selectAllBtn${options[index].replace(/\s+/g, "")}" onclick="selectAllButtons('${options[index]}')" class="shadow rounded-lg button center mr-2 mb-2">${options[index]}</button>`
    }
})

$('#load-csv').change(function () {
    $('#loadModal').modal('hide')
    deletChild('twitter-images')
    let i = $(this).prev('label').clone();
    file = $('#load-csv')[0].files[0];
    $(this).prev('label').text(file.name);
    if (file) {
        let reader = new FileReader();
        reader.addEventListener('load', function (e) {
            let text = e.target.result;
            csvAsArray = text.csvToArray();
            tweetID_columnNumber = parseInt($('#tweetID_columnNumber-text').val())
            tweetURL_columnNumber = parseInt($('#tweetURL_columnNumber-text').val())
            loadPageButtons()
            arrayInitial(tweetID_columnNumber, tweetURL_columnNumber)
            loadPage(1)
            $("#Page1").toggleClass("active")
        });
        reader.addEventListener('error', function () {
            alert('Error : Failed to read file');
        });
        reader.readAsText(file);
    }
});

function submit_all() {
    var csv = 'Tweet ID,Media URL,Option Chosen\n';
    myDataObject.forEach(element => {
        csv += `${element.tweet_id}` + ',' + `${element.url_raw}` + ',' + `${element.options_chosen}` + '\n';
    });
    var filename = sanitize(question) + ' - ' + file.name;
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    var data = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Return a value from an object
// let result = myObject.find(obj => {
//     return obj.uid === "x02"
//   })