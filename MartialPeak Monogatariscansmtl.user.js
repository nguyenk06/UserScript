// ==UserScript==
// @name         MartialPeak Monogatariscansmtl
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Monogatariscansmtl Page turner
// @author       You
// @match        https://www.monogatariscansmtl.com/post/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=monogatariscansmtl.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Function to perform an HTTP GET request using XMLHttpRequest
    function fetchScript(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send();
    }

    // Check for script updates
    function checkForUpdate() {
        const scriptUrl = 'https://github.com/nguyenk06/UserScript/raw/main/MartialPeak%20Monogatariscansmtl.user.js';

        fetchScript(scriptUrl, function(remoteScript) {
            // Extract the version from the remote script
            const remoteVersion = remoteScript.match(/@version\s+([0-9.]+)/i)[1];

            if (remoteVersion && remoteVersion !== GM_info.script.version) {
                if (confirm('A new version is available. Update now?')) {
                    // Redirect to the update URL
                    window.location.href = scriptUrl;
                }
            }
        });
    }

    // Function to get the current page number
    function currentPageNum() {
        // Get the current page's URL
        const currentPageUrl = window.location.href;

        // Define a regular expression to match the number at the end of the URL
        const regex = /martial-peak-(\d+)/i;
        const match = currentPageUrl.match(regex);

        if (match) {
            // Use parseInt to convert the matched string to an integer
            const number = parseInt(match[1], 10); // Use base 10 for parsing
            if (!isNaN(number)) {
                return number;
            }
        }

        // Return -1 for error or no match
        return -1;
    }
    function checkOptional() {
        // Get the current page's URL
        const currentPageUrl = window.location.href;


// Adjusted regular expression to capture chapter number and optional "-1"
const regex = /martial-peak-(\d+)(?:-(\d+))?/i;
const match = currentPageUrl.match(regex);

if (match) {
    // Extract chapter number and optional "-1"
    const chapterNumber = match[1];
    const optionalSuffix = match[2];

    if (optionalSuffix) {
        return true;
    } else {
        return false;
    }
    }
   }

    // Function to retrieve the latest chapter from local storage
function getLatestChapter() {
  return localStorage.getItem('latestChapter');
}

// Function to update the latest chapter in local storage
function updateLatestChapter() {
    let latestChapter = getLatestChapter();
    let chapterNumber =  currentPageNum();
    if(latestChapter !== null)
    {
        if(latestChapter <chapterNumber)
        {
            localStorage.setItem('latestChapter', chapterNumber);
        }
    }
    else
    {
        localStorage.setItem('latestChapter', chapterNumber);
    }
}


    updateLatestChapter();

    // Create anchor elements for "Next" and "Prev" links
    const nextElement = document.createElement("a");
    const prevElement = document.createElement("a");
    const latestElement = document.createElement("a");

    // Add text to the anchor elements
    nextElement.textContent = "Next";
    prevElement.textContent = "Prev";
    latestElement.textContent = "Last Read " +getLatestChapter() ;

    // Apply CSS styles to the anchor elements
    nextElement.style.position = "fixed";
    nextElement.style.top = "20px";
    nextElement.style.left = "100px";
    nextElement.style.color = "white";
    nextElement.style.fontWeight = "bold";
    nextElement.style.fontSize = "30px";

    prevElement.style.position = "fixed";
    prevElement.style.top = "20px";
    prevElement.style.left = "20px";
    prevElement.style.color = "white";
    prevElement.style.fontWeight = "bold";
    prevElement.style.fontSize = "30px";

    latestElement.style.position = "fixed";
    latestElement.style.top = "20px";
    latestElement.style.left = "200px";
    latestElement.style.color = "white";
    latestElement.style.fontWeight = "bold";
    latestElement.style.fontSize = "30px";

    // Get the current page number
    const currentPage = currentPageNum();

    // Calculate the next and prev page numbers
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    // Create dynamic chapter links based on the page numbers
    const baseChapterUrl = "https://www.monogatariscansmtl.com/post/martial-peak-";

    // Handle exceptions for specific chapters
    let nextLink, prevLink;

    // Example of handling exceptions:
    if (currentPage === 5748) {
        nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5849";
        prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5747";
    } else if (currentPage === 5750) {
        nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5751";
        prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5849";
    } else if (currentPage === 5848) {
        nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5849-1";
        prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5847";
    } else if (currentPage === 5849) {
        if(checkOptional())
        {
            nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5850";
            prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5848";
        }
        else
        {
            nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5750";
        prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5748";
        }
    }else if(currentPage === 5850)
    {
        nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5851";
        prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5849-1";
    }
	}else if(currentPage === 5884)
    {
		if(checkOptional())
        {
            nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5886";
            prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5884";
        }
        else
        {
        nextLink = "https://www.monogatariscansmtl.com/post/martial-peak-5884-1";
        prevLink = "https://www.monogatariscansmtl.com/post/martial-peak-5883";
        }
        
    }
    else {
        // Regular pattern for other chapters
        nextLink = baseChapterUrl + nextPage;
        prevLink = baseChapterUrl + prevPage;
    }

    // Add event listeners to the anchor elements
    nextElement.addEventListener("click", function () {
        // Update the href attribute of the "Next" link
        if (nextLink) {
            window.location.href = nextLink;
        }
    });

    prevElement.addEventListener("click", function () {
        // Update the href attribute of the "Prev" link
        if (prevLink) {
            window.location.href = prevLink;
        }
    });
    latestElement.addEventListener("click", function () {
        // Update the href attribute of the "Prev" link
        if (getLatestChapter()) {
            window.location.href = baseChapterUrl+getLatestChapter();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            // Bind 'ArrowLeft' to the previous page button.
            if (prevLink) {
                window.location.href = prevLink;
            }
        } else if (event.key === 'ArrowRight') {
            // Bind 'ArrowRight' to the next page button.
            if (nextLink) {
                window.location.href = nextLink;
            }
        }
    });

    // Add the anchor elements to the document
    document.body.appendChild(nextElement);
    document.body.appendChild(prevElement);
    // Example of how to use these functions
const latestChapter = getLatestChapter();
if (latestChapter !== null) {

   document.body.appendChild(latestElement);
}
})();

