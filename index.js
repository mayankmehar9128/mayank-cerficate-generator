const generatePDF = async (name, Issue_Date, uploadedImageBytes) => {
    const { PDFDocument, rgb } = PDFLib;

    // Fetching the certificate into website
    const exBytes = await fetch("./CMC_Certificate").then((res) => {
        return res.arrayBuffer();
    });

    // Fetching the font into website using promise function
    const exFont = await fetch("./Sanchez-Regular.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);

    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    // Embed uploaded image into the PDF document
    const uploadedImage = await pdfDoc.embedPng(uploadedImageBytes);
    const uploadedImageDims = uploadedImage.scale(0.30);

    // Draw text and uploaded image on the certificate
    firstPg.drawText(name, {
        x: 315,
        y: 265,
        // color: rgb(255,255,255)
        size: 35,
        weight: 100,
        font: myFont
    });

    firstPg.drawText(Issue_Date, {
        x: 400,
        y: 400,
        size: 35,
        weight: 100,
        font: myFont
    });

    firstPg.drawImage(uploadedImage, {
        x: firstPg.getWidth() / 2 - uploadedImageDims.width / 2 + 330,
        y: firstPg.getHeight() / 2 - uploadedImageDims.height / 2 + 100,
        width: uploadedImageDims.width,
        height: uploadedImageDims.height,
    });

    // Save the modified PDF
    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(uri, "Custom_Certificate.pdf", { autoBom: true });
};

const submitButton = document.getElementById("submit");
const inputName = document.querySelector("#name");
const inputIssueDate = document.querySelector("#Issue_Date");
const inputImage = document.getElementById("image");

submitButton.addEventListener("click", async () => {
    const name = inputName.value;
    const issuedate = inputIssueDate.value;
    const imageFile = inputImage.files[0];

    if (name.trim() !== "" && issuedate.trim() !== "" && imageFile) {
        const imageBytes = await imageFile.arrayBuffer();
        generatePDF(name, issuedate, imageBytes);
        alert(name + ", your customized certificate is being generated. Please wait for the download to start.");
    } else {
        alert("Please enter your name, date and upload an image to generate the certificate.");
    }
});






// const generatePDF = async (name) => {
//     const {PDFDocument, rgb} = PDFLib;

//     // fetching the certificate into website
//     const exBytes = await fetch("./cert.pdf").then((res) => {
//          return res.arrayBuffer();
//     });

//     // fetching the font into webste using promise function

//     const exFont = await fetch("./Sanchez-Regular.ttf").then((res) => { 
//         return res.arrayBuffer(); 
//     });
//     // console.log(exFont);


//     // const exImg = await fetch("./person-shopping-online.jpg").then(res => res.arrayBuffer())



//     const pdfDoc = await PDFDocument.load(exBytes)


//     // let inputFile = document.getElementById("input-file");

//     // const input = URL.createObjectURL(inputFile.index[0])




//     pdfDoc.registerFontkit(fontkit);
//     const myFont = await pdfDoc.embedFont(exFont);

    
    
//     const pages = pdfDoc.getPages();
//     const firstPg= pages[0]

//     // Fetch JPEG image
//     // const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg';
//     const jpgImageBytes = await fetch("./person-shopping-online.jpg").then((res) => res.arrayBuffer());
    
//     const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
//     const jpgDims = jpgImage.scale(0.30);

//     firstPg.drawText(name,{
//         x: 315,
//         y: 265,
//         // color: rgb(255,255,255)
//         size: 35,
//         weight: 100,
//         font: myFont
//     });



//     firstPg.drawImage(jpgImage, {
//         x: firstPg.getWidth() / 2 - jpgDims.width / 2 + 330,
//         y: firstPg.getHeight() / 2 - jpgDims.height / 2 + 100,
//         width: jpgDims.width,
//         height: jpgDims.height,
//     });


//     const uri = await pdfDoc.saveAsBase64({dataUri: true})
//     // window.open(uri)


//     saveAs(uri, "Mayank_Mehar_cerficate.pdf", { autoBom:true });

//     // window.open(uri)

//     // document.querySelector("#mypdf").src = uri;

// };

// const Submitbutton = document.getElementById("submit");
// const inputname = document.querySelector("#name")

// // const capatalize = (str, lower = false) => (lower? str.toLowerCase(): str).replace(/(?:^|\s|["'([{])+\S/g, (match) => 
// //    match.toUpperCase()
// // );

// Submitbutton.addEventListener("click",() => {
//     // const val = capatalize(inputname.value);


//     // //check if the text is empty or not
//     // if (val.trim() !== "" && userName.checkValidty()) {

//     //     generatePDF(val); 
//     // }
//     // else {
//     //     userName.reportValidity();
//     // }
//     const val= inputname.value;
//     alert(val + "your certificate is downloaded check it thank for visit");
//     generatePDF(val);
// });


// // generatePDF("Mayank Mehar");


