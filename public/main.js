var options = ""
var question = ""
var myDataObject = {}
let file

/* Copyright 2012-2013 Daniel Tillin
 * csvToArray v2.1 (Unminifiled for development)
 * http://code.google.com/p/csv-to-array/
 */

 function sanitize(input) {
    var illegalRe = /[\/\?<>\\:\*\|":]/g;
    var controlRe = /[\x00-\x1f\x80-\x9f]/g;
    var reservedRe = /^\.+$/;
    var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    return input.replace(illegalRe, '').replace(controlRe, '').replace(reservedRe, '').replace(windowsReservedRe, '')
  }

String.prototype.csvToArray = function (o) {
    var od = {
        'fSep': ',',
        'rSep': '\r\n',
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

function handleClick(tweet_id, options_tag) {
    for (let index = 0; index < options.length; index++) {
        $("#btn-" + tweet_id + "-" + options[index]).removeClass('active')
    }
    $("#btn-" + tweet_id + "-" + options_tag).toggleClass("active")
    myDataObject[tweet_id] = options_tag
}

function selectAllButtons(btnID) {
    let all_the_buttons = document.getElementsByClassName(`btn-Group-${btnID}`)
    for (var i = 0, n = all_the_buttons.length; i < n; ++i) {
        handleClick(all_the_buttons[i].id.split('-')[1],all_the_buttons[i].id.split('-')[2])
    }
    $('#checkModal').modal('hide')
}

function drawImageBoxWithOptions(tweet_id, url) {
    myDataObject[tweet_id] = "NotClicked"
    document.getElementById('twitter-images').innerHTML += `<div class="d-flex justify-content-center col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-center"><div class="table-responsive"><table class="table borderless"><tr><td><img alt="Twitter Image with ID ${tweet_id}" src="${url}" width="200" height="200" title="${tweet_id}"></td></tr><tr><td><div id="btn${tweet_id}"></div></td></tr></table></div></div>`
    for (let index = 0; index < options.length; index++) {
        document.getElementById(`btn${tweet_id}`).innerHTML += `<button type="button" id="btn-${tweet_id}-${options[index]}" onclick="handleClick('${tweet_id}', '${options[index]}')" class="btn-Group-${options[index]} shadow rounded-lg button center mr-2 mb-2">${options[index]}</button>`
    }
}

function checkImage(tweet_id, url) {
    $.get(url)
        .done(function () {
            drawImageBoxWithOptions(tweet_id, url)
        }).fail(function () {
            myDataObject[tweet_id] = "ImageNotFound"
        })
}

$('#submit-btn').click(function () {
    myDataObject = {}
    deletChild('twitter-images')
    question = $('#question-text').val()
    options = $('#answer-text').val().split(';')
    if (question.length && options.length != 0) {
        $('#question-position').text(question)
        $('#exampleModal').modal('hide')
    } else {
        alert('Either Question or Answer field is empty!')
    }
    deletChild('modalButtons')
    for (let index = 0; index < options.length; index++) {
        document.getElementById(`modalButtons`).innerHTML += `<button type="button" id="selectAllBtn${options[index]}" onclick="selectAllButtons('${options[index]}')" class="shadow rounded-lg button center mr-2 mb-2">${options[index]}</button>`
    }
})

function submit_all() {
    var csv = 'tweet_id,options_chosen\n';
    for (const [key, value] of Object.entries(myDataObject)) {
        csv += `${key}` + ',' + `${value}` + '\n';
    }
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

$('#file-upload').change(function () {
    deletChild('twitter-images')
    let i = $(this).prev('label').clone();
    file = $('#file-upload')[0].files[0];
    $(this).prev('label').text(file.name);
    if (file) {        
        let reader = new FileReader();
        reader.addEventListener('load', function (e) {
            let text = e.target.result;
            csvAsArray = text.csvToArray();
            for (var j = 1; j < csvAsArray.length; j += 1) {
                        row = csvAsArray[j + i] + '';
                        split = row.split(',');
                        tweet_id = csvAsArray[j][0];
                        url = csvAsArray[j][3];
                        checkImage(tweet_id, url)
            }
        });
        reader.addEventListener('error', function () {
            alert('Error : Failed to read file');
        });
        reader.readAsText(file);
    }
    // myDataObject = {}
});
