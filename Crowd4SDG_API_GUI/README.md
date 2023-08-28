# Crowd4SDG_API_GUI
Sophisticated GUI for Crowd4SDG API

# Usage

Temporary we can use these services tunneling the 7777 port using

```bash
ssh -L 7777:127.0.0.1:7777 username@131.175.120.2 -p 2222
```

# EndPoints

To apply a filter(s) on a csv file, we can leverage two endpoints:

## Get Request

```bash
 http://127.0.0.1:7777/Filter/API/filterImageURL
```

## Post Request

```bash
http://127.0.0.1:7777/Filter/API/filterImage
```

The endpoints accepts the following parameters:

## Params

### GET/POST

- `filter_name_list`
    - Accept a list of filter names. Each filter is apply one after the other. The supported filters are `PeopleDetector`, `MemeDetector`, `PublicPrivateClassifier`
- `confidence_threshold_list`
    - Accepts a list of confidence thresholds. If the confidence of a filter over a twitter is below the `confidence_threshold`, then the twitter is discarded. The first element in this list is related to the threshold of the first filter in `filter_name_list`, and so on.
- `column_name`
    - The name of the column of the input csv under which could be found the media url link

### Only GET

- `csv_url`
    - The url where the machine can download the input csv file.

### Only POST

- `csv_file`
    - The string that represents the input csv file

**Pay attention:**

Until now we have blocking requests. The suggestion is not to use big csv files. Start with csv with very few rows (each rows is a twitter) and incrementally increase the number.

**EXAMPLE (for GET request):**

```bash
http://127.0.0.1:7777/Filter/API/filterImageURL?filter_name_list=PeopleDetector&filter_name_list=MemeDetector&filter_name_list=PublicPrivateClassifier&confidence_threshold_list=0.98&confidence_threshold_list=0.89&confidence_threshold_list=0.93&column_name=media_url&csv_url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Ddownload%26id%3D12hy5NRkFiNG2lI9t6oXQ_12_QDUQz94c
```

# Requirements:

## Website Development

### URL

Develop a very simple website at the following address:

```bash
https://131.175.120.2:7777/
```

### Instructions

It should show how the service works.

### APP

It should contain a form with the four following inputs:

- `filter_name_list`
- `confidence_threshold_list`
- `column_name`
- `csv_url` or `csv_file`

And it should submit a **GET/POST** request when the user presses the **submit button**.

Tested with the following data:

```bash
https://drive.google.com/uc?export=download&id=12hy5NRkFiNG2lI9t6oXQ_12_QDUQz94c
media_url
People Detector 0.98
Meme Detector 0.89
Public-Private Classifier 0.93
```

Expected output URL:

```bash
https://131.175.120.2:7777/Filter/API/filterImageURL?filter_name_list=PeopleDetector&filter_name_list=MemeDetector&filter_name_list=PublicPrivateClassifier&confidence_threshold_list=0.98&confidence_threshold_list=0.89&confidence_threshold_list=0.93&column_name=media_url&csv_url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Ddownload%26id%3D12hy5NRkFiNG2lI9t6oXQ_12_QDUQz94c
```

Actual output URL:

```bash
https://131.175.120.2:7777/Filter/API/filterImageURL?filter_name_list=PeopleDetector&filter_name_list=MemeDetector&filter_name_list=PublicPrivateClassifier&confidence_threshold_list=0.98&confidence_threshold_list=0.89&confidence_threshold_list=0.93&column_name=media_url&csv_url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Ddownload%26id%3D12hy5NRkFiNG2lI9t6oXQ_12_QDUQz94c
```