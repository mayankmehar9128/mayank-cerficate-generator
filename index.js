const generatePDF = async (name) => {
    const {PDFDocument, rgb} = PDFLib;

    // fetching the certificate into website
    const exBytes = await fetch("./cert.pdf").then((res) => {
         return res.arrayBuffer();
    });

    const exFont = await fetch("./Sanchez-Regular.ttf").then((res) => { 
        return res.arrayBuffer(); 
    });
    // console.log(exFont);


    // const exImg = await fetch("./person-shopping-online.jpg").then(res => res.arrayBuffer())



    const pdfDoc = await PDFDocument.load(exBytes)


    // const personalImg = await pdfDoc.embedjpg(exImg)

    // const jpgDims = personalImg.scale(0.5)


    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    
    
    const pages = pdfDoc.getPages();
    const firstPg= pages[0]

    firstPg.drawText(name,{
        x: 315,
        y: 265,
        // color: rgb(255,255,255)
        size: 35,
        weight: 100,
        font: myFont
    })

    // // const pag = pdfDoc.addPage()
    // firstPg.drawImage(personalImg,{
    //     x: pages.getWidth() / 2 - jpgDims.width / 2,
    //     y: pages.getHeight() / 2 - jpgDims.height / 2 + 250,
    //     width: jpgDims.width,
    //     height: jpgDims.height,
    // })

    const uri = await pdfDoc.saveAsBase64({dataUri: true})

    window.open(uri)

    saveAs(uri, "Mayank_Mehar_cerficate.pdf", { autoBom:true });

    // window.open(uri)

    // document.querySelector("#mypdf").src = uri;

};

const Submitbutton = document.getElementById("submit");
const inputname = document.querySelector("#name")

// const capatalize = (str, lower = false) => (lower? str.toLowerCase(): str).replace(/(?:^|\s|["'([{])+\S/g, (match) => 
//    match.toUpperCase()
// );

Submitbutton.addEventListener("click",() => {
    // const val = capatalize(inputname.value);


    // //check if the text is empty or not
    // if (val.trim() !== "" && userName.checkValidty()) {

    //     generatePDF(val); 
    // }
    // else {
    //     userName.reportValidity();
    // }
    const val= inputname.value;
    alert(val);
    generatePDF(val);
    
});

