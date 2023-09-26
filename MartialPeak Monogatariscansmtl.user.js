// ==UserScript==
// @name         MartialPeak Monogatariscansmtl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.monogatariscansmtl.com/post/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=monogatariscansmtl.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to get the current page number
    function currentPageNum() {
        // Get the current page's URL
        const currentPageUrl = window.location.href;

        // Define a regular expression to match the number at the end of the URL
        const regex = /(\d+)$/;

        // Use the regular expression to extract the number
        const match = currentPageUrl.match(regex);

        if (match) {
            const pageNum = parseInt(match[1], 10);
            return pageNum;
        }
        return 0; // Default to page 0 if no number is found
    }

    // Function to simulate a click on an element
    function simulateButtonClick(element) {
        if (element) {
            element.click();
        }
    }

    // Create anchor elements for "Next" and "Prev" links
    const nextElement = document.createElement("a");
    const prevElement = document.createElement("a");

    // Add text to the anchor elements
    nextElement.textContent = "Next";
    prevElement.textContent = "Prev";

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

    // Add event listeners to the anchor elements
    nextElement.addEventListener("click", function () {
        // Get the current page number
        const currentPage = currentPageNum();

        // Update the href attribute of the "Next" link
        nextElement.href = "https://www.monogatariscansmtl.com/post/martial-peak-" + (currentPage + 1);
    });

    prevElement.addEventListener("click", function () {
        // Get the current page number
        const currentPage = currentPageNum();

        // Update the href attribute of the "Prev" link
        prevElement.href = "https://www.monogatariscansmtl.com/post/martial-peak-" + (currentPage - 1);
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            // Bind 'ArrowLeft' to the previous page button.
            simulateButtonClick(prevElement);
        } else if (event.key === 'ArrowRight') {
            // Bind 'ArrowRight' to the next page button.
            simulateButtonClick(nextElement);
        }
    });

    // Add the anchor elements to the document
    document.body.appendChild(nextElement);
    document.body.appendChild(prevElement);
})();
