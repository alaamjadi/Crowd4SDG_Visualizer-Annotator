var file
var configSet = {
    method: "",
    csv_url: "",
    col_name: "",
    filters: [],
    confidence_thresholds: []
}
const URL = {
    host: window.location.href,
    // host: 'http://131.175.120.2:7777/',
    api_get: 'Filter/API/filterImageURL',
    api_psot: 'Filter/API/filterImage'
}
const threshold = {
    PeopleDetector: 0.98,
    MemeDetector: 0.89,
    PublicPrivateClassifier: 0.93
}

/* Copyright 2012-2013 Daniel Tillin -- csvToArray v2.1 (Unminifiled for development) -- http://code.google.com/p/csv-to-array/ */
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
            if (!o[i]) o[i] = od[i]
        }
    } else {
        o = od
    }
    var a = [
        ['']
    ]
    for (var r = f = p = q = 0; p < this.length; p++) {
        switch (c = this.charAt(p)) {
            case o.quot:
                if (q && this.charAt(p + 1) == o.quot) {
                    a[r][f] += o.quot
                    ++p
                } else {
                    q ^= 1
                }
                break
            case o.fSep:
                if (!q) {
                    if (o.trim) {
                        a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
                    }
                    a[r][++f] = ''
                } else {
                    a[r][f] += c
                }
                break
            case o.rSep.charAt(0):
                if (!q && (!o.rSep.charAt(1) || (o.rSep.charAt(1) && o.rSep.charAt(1) == this.charAt(p + 1)))) {
                    if (o.trim) {
                        a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
                    }
                    a[++r] = ['']
                    a[r][f = 0] = ''
                    if (o.rSep.charAt(1)) {
                        ++p
                    }
                } else {
                    a[r][f] += c
                }
                break
            default:
                a[r][f] += c
        }
    }
    if (o.head) {
        a.shift()
    }
    if (a[a.length - 1].length < a[0].length) {
        a.pop()
    }
    return a
}

/********** load CSV locally **********/
$('#load-csv').change(function () {
    let i = $(this).prev('label').clone()
    const file = $('#load-csv')[0].files[0]
    $(this).prev('label').text(file.name)
    if (file) {
        let reader = new FileReader()
        reader.addEventListener('load', function (e) {
            let text = e.target.result
            firstRow = text.csvToArray()[0]
            createDropDown(firstRow)
        })
        reader.addEventListener('error', function () {
            alert('Error : Failed to read file')
        })
        reader.readAsText(file)
    }
})

/* create the column names dropdown list */
function createDropDown(inputList) {
    $("div[id='columnNameListParent']").removeClass('d-none')
    deletChild('columnNameList')
    var dropdown = $('#columnNameList')
    dropdown.append($('<option>').attr({ value: 'none', label: 'Choose a column' }))
    inputList.forEach(element => {
        var entry = $('<option>').attr({ value: element, label: element })
        dropdown.append(entry)
    })
    $("div[id='filterSelection']").removeClass('d-none')
    $("div[id='submitSection']").removeClass('d-none')
}

/********** main selection **********/
$('select').change(function () {
    // get the default values
    getDefault_URL_columnName()

    var selectedValue = $(this).val()
    if (selectedValue == 'methodGET') {
        configSet.method = 'GET'
        // Hide ALL
        $("div[class='row']").addClass('d-none')

        //Show GET
        $("div[id='csvLinkSection']").removeClass('d-none')
        $("div[id='columnNameboxParent']").removeClass('d-none')
        $("div[id='filterSelection']").removeClass('d-none')
        $("div[id='submitSection']").removeClass('d-none')

    } else if (selectedValue == 'methodPOST') {
        configSet.method = 'POST'
        //Hide ALL
        $("div[class='row']").addClass('d-none')

        //Show POST
        $("div[id='csvFileSection']").removeClass('d-none')
    }
    else if (selectedValue == 'removeAll') {
        $("div[class='row']").addClass('d-none')
    }
})

/* remove children of an element specified by element ID */
function deletChild(id_element) {
    var e = document.querySelector("#" + id_element)
    var child = e.firstElementChild
    while (child) {
        e.removeChild(child)
        child = e.lastElementChild
    }
}

/********** URL and path **********/
$('.urls').change(function () {
    var value = $(this).val()
    configSet.csv_url = value
})

/********** column Name **********/
$('.columns').change(function () {
    var value = $(this).val()
    configSet.col_name = value
})

/********** get defualt values of URL and column Name **********/
function getDefault_URL_columnName(params) {
    configSet.col_name = $('#columns').val()
    configSet.csv_url = $('#urls').val()
}

/**********  filters **********/
$('#filter1').change(function () {
    var value = $(this).val()
    $('#threshold1').val(threshold[value]).change()
    configSet.filters[0] = value
})
$('#filter2').change(function () {
    var value = $(this).val()
    $('#threshold2').val(threshold[value]).change()
    configSet.filters[1] = value
})
$('#filter3').change(function () {
    var value = $(this).val()
    $('#threshold3').val(threshold[value]).change()
    configSet.filters[2] = value
})

/**********  thresholds **********/
$('#threshold1').change(function () {
    var value = $(this).val()
    configSet.confidence_thresholds[0] = value
})
$('#threshold2').change(function () {
    var value = $(this).val()
    configSet.confidence_thresholds[1] = value
})
$('#threshold3').change(function () {
    var value = $(this).val()
    configSet.confidence_thresholds[2] = value
})

// Helper function to create the sophisticated url for API
function urlMaker() {
    url_string = ""

    // adding the first character
    url_string = url_string.concat("?")

    // concatinating the filternames
    configSet.filters.forEach(element => {
        url_string = url_string.concat('filter_name_list=', element, '&')
    })

    // concatinating the thresholds
    configSet.confidence_thresholds.forEach(element => {
        url_string = url_string.concat('confidence_threshold_list=', element, '&')
    })

    // concatinating the column name
    url_string = url_string.concat('column_name=', configSet.col_name, '&')

    // concatinating the CSV URL/Path
    url_string = url_string.concat('csv_url=', encodeURIComponent(configSet.csv_url))

    // remove the extra & sign in the loop
    // url_string = url_string.slice(0, -1)
    return url_string
}

// CSV saver
function saveAsCSV(text, filename) {
    var link = document.createElement('a')
    link.setAttribute('href', 'data:text/csv;charset=urf-8,' + encodeURIComponent(text))
    link.setAttribute('download', filename + '.csv')
    link.click()
}

// Defining the prototype for date and time
Date.prototype.now = function () {
    return 'D' + this.getFullYear() + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + ((this.getDate() < 10) ? "0" : "") + this.getDate() + 'T' + ((this.getHours() < 10) ? "0" : "") + this.getHours() + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds()
}

function base64Converter() {
    const file = $('#load-csv')[0].files[0]
    if (file) {
        const reader = new FileReader()
        reader.addEventListener('load', function (e) {
            let text = e.target.result
            configSet.csv_url = text
        })
        reader.addEventListener('error', function () {
            alert('Error : Failed to read file')
        })
        reader.readAsDataURL(file)
    }
}

function postMaker() {
    const formData = new FormData();
    formData.append('filter_name_list', configSet.filters);
    formData.append('confidence_threshold_list', configSet.confidence_thresholds);
    formData.append('column_name', configSet.col_name);
    formData.append('csv_file', configSet.csv_url);

    fetch(URL.host + URL.api_psot, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**********  submit button **********/
var csv = ''
$("button").click(function () {
    if (configSet.method == 'GET') {
        // console.log(URL.host + URL.api_get + urlMaker())
        fetch(URL.host + URL.api_get + urlMaker(),
            alert('Request Sent Successfully!\nPlease wait for the report file!')
        ).then(function (response) {
            alert('Receiving the report file from server!')
            if (response.status !== 200) {
                console.log("Fetch response failed. Status Code: " + response.status)
                return Promise.reject(response)
            } else {
                return response.text()
            }
        }).then(function (data) {
            saveAsCSV(data, 'report_' + new Date().now())
        }).catch(function (error) {
            alert('There was an error happening!')
            console.log("Fetch JS failed: ", error)
        })
    } else if (configSet.method == 'POST') {
        console.log(URL.host + URL.api_psot)
        base64Converter()
        postMaker()
        // $.post(configSet.csv_url, function (data, status) { alert("Data: " + data + "\nStatus: " + status) })
    }
})
