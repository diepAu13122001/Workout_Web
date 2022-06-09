function createFile(data) {
    const fsLibrary = require('fs');
    fsLibrary.writeFile("D:\\newfile.txt", data, (error) => {
        if (error) console.log("error");
    })
}

createFile("you are so beautiful");