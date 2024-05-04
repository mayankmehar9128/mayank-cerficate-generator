const generatePDF = async (name, Fathers_Name, Issue_Date, uploadedImageBytes) => {    //uploadedImageBytes//
    const { PDFDocument } = PDFLib;

    // Fetching the certificate into website
    const exBytes = await fetch("./CMC_Certificate.pdf").then((res) => {
        return res.arrayBuffer();
    });

    // Fetching the font into website using promise function
    const exFont = await fetch("./Sanchez-Regular.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const exFontName = await fetch("./Yellowtail-Regular.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const exFontFather = await fetch("./YanoneKaffeesatz-VariableFont_wght.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);

    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);
    const myFontName = await pdfDoc.embedFont(exFontName);
    const myFontFather = await pdfDoc.embedFont(exFontFather);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    // Embed uploaded image into the PDF document
    const uploadedImage = await pdfDoc.embedPng(uploadedImageBytes);
    const uploadedImageDims = uploadedImage.scale(0.14);


    const { degrees } = PDFLib;
    const { rgb } = PDFLib;

    // Draw text and uploaded image on the certificate
    firstPg.drawText(name, {
        x: 360,
        y: 275,
        color: rgb(1, 0, 0), // Red color
        size: 52,
        weight: 100,
        font: myFontName,
        rotate: degrees(90), // Angle should be in radians, not degrees
        rotateOrigin: [315, 265] // Adjust rotation center to the text position
        
    });


    firstPg.drawText(Fathers_Name, {
        x: 405,
        y: 274,
        // color: rgb(255,255,255),
        size: 35,
        weight: 500,
        font: myFontFather,
        rotate: degrees(90), // Angle should be in radians, not degrees
        rotateOrigin: [315, 265] // Adjust rotation center to the text position
        
    });


    
    firstPg.drawText(Issue_Date, {
        x: 520,
        y: 537,
        size: 20,
        weight: 100,
        font: myFont,
        rotate: degrees(90), // Angle should be in radians, not degrees
        rotateOrigin: [315, 265] // Adjust rotation center to the text position
    });

    

    firstPg.drawImage(uploadedImage, {
        x: firstPg.getWidth() / 2 - uploadedImageDims.width / 2 + 41,
        y: firstPg.getHeight() / 2 - uploadedImageDims.height / 2 - 280,
        width: uploadedImageDims.width,
        height: uploadedImageDims.height,
    });

    const getname = document.querySelector("#name").value;

    // Save the modified PDF
    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(uri, getname+".pdf", { autoBom: true });

};

const submitButton = document.getElementById("submit");
const inputName = document.querySelector("#name");
const inputIssueDate = document.querySelector("#Issue_Date");
const inputFathersName = document.querySelector("#Fathers_Name");
const inputImage = document.getElementById("image");

submitButton.addEventListener("click", async () => {
    const name = inputName.value;
    const issuedate = inputIssueDate.value;
    const fathername = inputFathersName.value;
    const imageFile = inputImage.files[0];
    const imageBytes = await imageFile.arrayBuffer();

    if (name.trim() !== "" && issuedate.trim() !== "" && imageFile) {
        const imageBytes = await imageFile.arrayBuffer();
        generatePDF(name, fathername, issuedate, imageBytes);
        alert(name + ", your customized certificate is being generated. Please wait for the download to start.");
    } else {
        alert("Please enter your name, date and upload an image to generate the certificate.");
    }

    // alert(name + "your certificate is downloaded check it thank for visit");
    // generatePDF(name, issuedate);
});


generatePDF("Mayank Mehar");
