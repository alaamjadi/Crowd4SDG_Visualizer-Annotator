
var options = ""
var myDataObject = {}

/* Copyright 2012-2013 Daniel Tillin
 * csvToArray v2.1 (Unminifiled for development)
 * http://code.google.com/p/csv-to-array/
 */

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
        $("#btn"+tweet_id+options[index]).removeClass('active')
    }
    $("#btn" + tweet_id + options_tag).toggleClass("active")
    myDataObject[tweet_id] = options_tag
}

function submit_all() {
    console.log(myDataObject)
}

$('#submit-btn').click(function () {
    myDataObject = {}
    deletChild('twitter-images')
    var question = $('#question-text').val()
    options = $('#answer-text').val().split(';')
    if (question.length && options.length != 0) {
        $('#question-position').text(question)
        $('#exampleModal').modal('hide')
    } else {
        alert('Either Question or Answer field is empty!')
    }
})

$('#file-upload').change(function () {
    deletChild('twitter-images')
    let i = $(this).prev('label').clone();
    let file = $('#file-upload')[0].files[0];
    $(this).prev('label').text(file.name);
    //console.log(options)
    if (file) {
        // new FileReader object
        let reader = new FileReader();

        // event fired when file reading finished
        reader.addEventListener('load', function (e) {
            // contents of the file
            let text = e.target.result;
            csvAsArray = text.csvToArray();

            for (var j = 0; j < csvAsArray.length - 1; j += 4) {
                if (j > 0) {
                    var multi = document.createElement('div');
                    multi.className = 'multipl-image-checkbox';
                    multi.style.display = 'inline-block';

                    for (var i = 0; i < 4; i++) /*csvAsArray.length*/ {
                        row = csvAsArray[j + i] + '';
                        split = row.split(',');
                        tweet_id = split[0];
                        url = split[1];
                        tag = split[2];

                        myDataObject[tweet_id] = "NotClicked"

                        document.getElementById('twitter-images').innerHTML += `<div class="d-flex justify-content-center col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-center"><div class="table-responsive"><table class="table borderless"><tr><td><img alt="001" src="${url}" width="200" height="200" title="${tweet_id}"></td></tr><tr><td>Tag: ${tag}</td></tr><tr><td><div id="btn${tweet_id}"></div></td></tr></table></div></div>`

                        for (let index = 0; index < options.length; index++) {
                            document.getElementById(`btn${tweet_id}`).innerHTML += `<button type="button" id="btn${tweet_id}${options[index]}" onclick="handleClick('${tweet_id}', '${options[index]}')" class="button center mr-2 mb-2">${options[index]}</button>`
                        }
                    }
                }
            }
        });

        // event fired when file reading failed
        reader.addEventListener('error', function () {
            alert('Error : Failed to read file');
        });

        // read file as text file
        reader.readAsText(file);
    }
});
