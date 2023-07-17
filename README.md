# ACNH Catalog Scanner Web
The ACNH Catalog Scanner is a React-based application that allows you to scan your Animal Crossing catalog items from recorded videos from the Switch. It utilizes Tesseract OCR to extract text from each frame of the video on-device. 

The application is available to use here: [acnh-scanner.web.app](https://acnh-scanner.web.app/)

## Technical Breakdown
* When you select a video file, the application reads the frames from the video.
* Each frame is passed to the Tesseract OCR engine, which performs optical character recognition to extract the text.
* Basic transformations, such as converting frames to black and white point, are applied to improve OCR accuracy.
* The image is cropped to contain only that of text and remove the game UI.
* Artifacts and noise are removed from the video frames, manly to remove the extra UI details such as the background and horizontal dashed line breaks.
* The extracted text is processed and filtered to identify the catalog items from a set of all in-game items.
* Since processing is done on-device through the browser's JavaScript, its speed is dependent on the device's technical capabilities.
The scanned catalog entries are displayed to the user as they are scanned, to be copied and pasted into supporting applications like ACNH Pocket Guide.

## Alternate Tools
* [ACNH Pocket Guide Catalog Scanner](https://play.google.com/store/apps/details?id=com.acnh.catalog_scanner) - a mobile applications using the device's camera and text-recognition to identify and scan a users catalog
* [nook.lol](https://nook.lol) - catalog scanner functionality through the use of a Twitter bot using in-game recordings

## Acknowledgements
This application is inspired by [nook.lol](https://nook.lol) and is meant to provide an alternative catalog scanning tool for ACNH.

## Screenshots
Soon
