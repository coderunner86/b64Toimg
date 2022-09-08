// Grabbing Elements and Storing in Variables
const defaultFile = document.getElementById("default-file");
const customBtn = document.getElementById("custom-btn");
const customSpace = document.getElementById("custom-space");
const blobBtn = document.getElementById("blob-btn");
const blobFile = document.getElementById("blob-file");
customBtn.addEventListener("click", function() {
    defaultFile.click();
});
blobBtn.addEventListener("click", function() {
    blobFile.click();
});

// File Upload
defaultFile.addEventListener("change", function() {
    //  Format Selected File Text
    if (defaultFile.value) {
        customSpace.innerHTML =
            defaultFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    } else {
        customSpace.innerHTML = "No File, Selected!";
    }

    // Image Preview
    const files = defaultFile.files[0]; //files[0] - For getting first file
    //   console.log(files);

    if (files) {
        // Showing Image and Hiding "Image Preview" Text
        preview_img.style.display = "block";
        preview_text.style.display = "none";
        //Read File
        const fileReader = new FileReader();

        fileReader.addEventListener("load", function() {
            // convert image to base64 encoded string
            preview_img.setAttribute("src", this.result);
            console.log(this.result);
            b64 = this.result;
        });
        fileReader.readAsDataURL(files);
    }
});
//File Download
blobFile.addEventListener("change", function(data, mimeType, filename) {
    const blob = new Blob([data], {
        type: mimeType
    });
    // IE/Edge
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
    }
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    // Firefox: delay revoking the ObjectURL
    setTimeout(function() {

        URL.revokeObjectURL(blob);
    })
});