//load a book from disk

function loadBook(filename,displayName){
    let currentBook ="";
    let url= "books/"+filename;
    console.log(url);

    //RESET OUR UI

    document.getElementById("fileName").innerHTML=displayName;
    document.getElementById("searchstat").innerHTML="";
    document.getElementById("keyword").value="";


    // CREATE A SERVER REQUEST TO LOAD OUR BOOK
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            currentBook = xhr.responseText;
// console.log(currentBook);
            getDocStats(currentBook);
            document.getElementById("fileContent").innerHTML=currentBook;

            //remove line breaks and carriage returns and replace them with <br />

             currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, "<br>");

            var elmnt=document.getElementById('fileContent');
           elmnt.scrollTop=0;

        }

};
}

function getDocStats(filecontent){

    var docLength= document.getElementById("docLength");
    var wordCount= document.getElementById("wordCount");
    var charCount= document.getElementById("charCount");

    let text = filecontent.toLowerCase();
    let wordArray= text.match(/\b\S+\b/g);
    let wordDictionary={};

    for(let word in wordArray){
        let wordValue= wordArray[word];
        if(wordDictionary[wordValue]>0){
            wordDictionary[wordValue]++;
        }
        else{
            wordDictionary[wordValue] = 1;
        }
    }
    
    let wordList=sortProperty(wordDictionary);
// console.log(wordList);
    var top5Words = wordList.slice(0,6);
    var least5Words = wordList.slice(-6,wordList.length);
// console.log(top5Words);

    //write to the page
    ULTemplate(top5Words,document.getElementById("mostUsed"));
    ULTemplate(least5Words,document.getElementById("leastUsed"));
}



function ULTemplate(items,element){
    let rowTemplate = document.getElementById('template-ul-items');
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML="";
console.log(templateHTML);
    for(i=0;i<items.length;i++){
        resultsHTML += templateHTML.replace('{{val}}',items[i][0]+ " : " + items[i][1] + "time(s)");
    }
    element.innerHTML=resultsHTML;
}

function sortProperty(obj){
    let rtnArray=Object.entries(obj);

    rtnArray.sort(function(first,second){
        return second[1]-first[1];
    });

    return rtnArray;
}

