// ==UserScript==
// @name         World of Creation Sidebar Dreams of Jianghu
// @namespace    http://tampermonkey.net/
// @version      2.5
// @description  World of Creation TOC sidebar
// @author       Znesfreak
// @match        https://dreamsofjianghu.ca/*
// @grant        GM_addStyle
// ==/UserScript==
/*
// Function to perform an HTTP GET request using fetch API
function fetchScript(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        });
}

function checkForUpdate() {
    const scriptUrl = 'https://github.com/nguyenk06/UserScript/raw/6e097b37215189a4ec2e97a7d78d4c5acc8ab533/World%20of%20Creation%20Sidebar%20Dreams%20of%20Jianghu.user.js';

    fetchScript(scriptUrl)
        .then(remoteScript => {
            try {
                // Extract the version from the remote script
                const remoteVersion = remoteScript.match(/@version\s+([0-9.]+)/i)[1];

                // Detect the userscript manager and handle updates accordingly
                if (typeof GM_info !== 'undefined' && GM_info.script.version !== remoteVersion) {
                    localStorage.removeItem('dreamsOfJianghuLinks');
                    if (confirm('A new version is available. Update now?')) {
                        // Redirect to the update URL for Tampermonkey
                        window.location.href = scriptUrl;
                    }
                } else {
                    console.log('Script is up to date.');
                }
            } catch (error) {
                console.error('Error processing script update:', error);
            }
        })
        .catch(error => {
            console.error('Error fetching remote script:', error);
        });
}
*/

(function() {
    'use strict';

  // Run checkupdate
  //  checkForUpdate();

   function extractAndStoreLinks() {
    let storedLinks = JSON.parse(localStorage.getItem('dreamsOfJianghuLinks'));


    // Check if storedLinks is null, undefined, or an empty array, and initialize it with extracted links if needed
    if (!storedLinks || !Array.isArray(storedLinks) || storedLinks.length === 0) {
        storedLinks = [];

        let checkforHref =false;
        let skipLinks = false;
        let chapterLog = 1;

        const entryContentDivs = document.querySelectorAll('div.entry-content');
        entryContentDivs.forEach(entryContentDiv => {
            const linkElements = entryContentDiv.querySelectorAll('a');
            linkElements.forEach((linkElement) => {
                const href = linkElement.href;
                const text = linkElement.textContent.trim();

                //Skip dupes
                if (storedLinks.some(link => link.href === href)) {
                    return;
                }
                //last chapter
                if(chapterLog >= 915)
                    return;


                if(skipLinks || text == 'Chapter One “[Little Art of Cloud and Rain]”')
                {
                    skipLinks = true;
                    if(text == 'Chapter Twenty Six “Appearance Changed and Mind Erased”')
                    {
                        chapterLog =26
                       skipLinks = false;
                    }
                    else
                    {
                        return;
                    }
                }

                if(text == 'Chapter Forty Eight “The Black-Hearted Records Room”')
                {
                    checkforHref = true;
                }
                if(checkforHref)
                {
                    var numericPart = '';
                    numericPart = extractNumberFromHref(href);
                    switch(numericPart)
                    {
                        case null:
                            if(text == 'Chapter One Hundred and Five “Mo Matrix and Yao Seed”')
                                numericPart = 105;
                            if(text == 'Chapter Three Hundred and Thirty Seven “Crimson Fiend Cauldron”')
                               numericPart = 337;
                            if(text == 'Chapter Four Hundred and Twelve “Collide”')
                               numericPart = 412;
                            if(text =='Chapter Five Hundred and Sixty Seven “The Seeds Sprouting”')
                                numericPart = 567;
                            if(text =='Chapter Five Hundred and Eighty Four “Low Opinion”')
                               numericPart = 584;
                            if(text == 'Chapter Six Hundred and Thirteen “Conspiracy”')
                                numericPart = 613;
                            if(text.includes('Six Hundred and Fifty Four'))
                                numericPart = 654;
                            if(text =='Chapter Six Hundred and Ninety Four “Weapon Layering Craftsmanship”')
                                numericPart = 694;
                            if(text.includes('Seven Hundred and Five'))
                                numericPart = 705;
                            break;
                        case 94:
                            if(text == 'Chapter Ninety Three “Stalagmite Fire”')
                                numericPart = 93;
                            break;
                        case 289:
                            if(text == 'Chapter Two Hundred and Sixty Eight “Nine Turn Sky Soil Disk”')
                                numericPart = 268;
                            break;
                        case 337:
                            if(text =='Chapter Three Hundred and Seventy Seven “Qinghua Xue”')
                                numericPart = 377;
                            break;
                        case 341:
                            if(text == 'Chapter Three Hundred and Forty  “Nan Yue’s Little Yao Arts”')
                                numericPart = 342;
                            break;
                        case 437:
                            if(text == 'Chapter Four Hundred and Thirty Seven “Zuo Mo’s Sneak Attack” Part Two')
                                chapterLog = 437;
                            break;
                        case 525:
                            if(text =='Chapter Four Hundred and Twenty Five “Super Monster Ship!”')
                                numericPart = 425;
                            break;
                        case 616:
                            if(text.includes('Six Hundred and Fifteen'))
                                numericPart = 615;
                            break;

                    }
                    if(numericPart != chapterLog)
                    {
                        console.log("Last Chapter logged: " + chapterLog + "Gap = " + numericPart +" " + text);
                        chapterLog = numericPart;
                    }

                }

                if (/\bChapter\b/i.test(href)) {
                    storedLinks.push({ href, text, visited: false });
                    if(chapterLog >= 26)
                        chapterLog++;
                }
                else if (/\bChaper\b/i.test(href)) {
                    storedLinks.push({ href, text, visited: false });
                    if(chapterLog >= 26)
                        chapterLog++;
                }
                else if (/\bworld-of-cultivation\b/i.test(href)){
                    storedLinks.push({ href, text, visited: false });
                    if(chapterLog >= 26)
                        chapterLog++;
                }

            });
        });

        // Set the localStorage item if links were found
        if (storedLinks.length > 0) {
            localStorage.setItem('dreamsOfJianghuLinks', JSON.stringify(storedLinks));
        }
    }
}

function extractNumberFromHref(href) {
  const match = href.match(/r-(\d+)|n-(\d+)/i);
  const chapterNumber = match ? (match[1] || match[2]) : null;
  return chapterNumber ? parseInt(chapterNumber, 10) : null;
}

    
    function createSidebar(links) {
        const sidebarContainer = document.createElement('div');
        sidebarContainer.id = "sidebarContainer";
        sidebarContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 250px;
            background-color: #f3f3f3;
            overflow-y: auto;
            padding-top: 50px;
            z-index: 9999;
        `;

        const resetSidebarBtn = document.createElement('button');
    resetSidebarBtn.id = 'toggleBtn';
    resetSidebarBtn.textContent = 'Reset TOC';

    // Attach toggle functionality to the button
    resetSidebarBtn.addEventListener('click', resetBtn);
        sidebarContainer.appendChild(resetSidebarBtn);

        const tocLink = document.createElement('div');
        tocLink.innerHTML = `<a href="https://dreamsofjianghu.ca/%e4%bf%ae%e7%9c%9f%e4%b8%96%e7%95%8c-world-of-cultivation/table-of-contents/" target="_self">Table of Contents</a>`;
        tocLink.style.padding = '10px';
        tocLink.style.borderBottom = '1px solid #ccc';
        sidebarContainer.appendChild(tocLink);

        links.forEach((link, index) => {
            const linkElement = document.createElement('div');
            linkElement.innerHTML = `<a href="${link.href}" target="_self">${link.text}</a>`;
            linkElement.style.padding = '10px';
            linkElement.style.borderBottom = '1px solid #ccc';
            linkElement.style.cursor = 'pointer';
            linkElement.style.transition = 'background-color 0.3s';

            if (link.visited) {
                linkElement.querySelector('a').classList.add('visited-link');
            }

            linkElement.addEventListener('mouseenter', () => {
                linkElement.style.backgroundColor = '#e3e3e3';
            });

            linkElement.addEventListener('mouseleave', () => {
                linkElement.style.backgroundColor = 'inherit';
            });

            linkElement.addEventListener('click', () => {
                markAsVisited(index);
            });

            sidebarContainer.appendChild(linkElement);
        });

        document.body.appendChild(sidebarContainer);
    }

    function resetBtn(){
        localStorage.removeItem('dreamsOfJianghuLinks');
        window.location.reload();
    }

    function markAsVisited(index) {
        const storedLinks = JSON.parse(localStorage.getItem('dreamsOfJianghuLinks'));
        if (storedLinks && storedLinks[index]) {
            storedLinks[index].visited = true;
            localStorage.setItem('dreamsOfJianghuLinks', JSON.stringify(storedLinks));
        }
    }
	 // Function to perform toggle sidebar
     function toggleSidebar() {
        const sidebar = document.getElementById('sidebarContainer');
        if (sidebar.style.display === 'none' || sidebar.style.display === '') {
            sidebar.style.display = 'block';
            const visitedLinks = document.querySelectorAll('.visited-link');
            if (visitedLinks && visitedLinks.length > 0) {
                const lastVisitedLink = visitedLinks[visitedLinks.length - 1];
                lastVisitedLink.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            sidebar.style.display = 'none';
        }
    }

    function addCustomStyle(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    const url = window.location.href;
    if (url === 'https://dreamsofjianghu.ca/%e4%bf%ae%e7%9c%9f%e4%b8%96%e7%95%8c-world-of-cultivation/table-of-contents/') {
        extractAndStoreLinks();
    }

    const storedLinks = JSON.parse(localStorage.getItem('dreamsOfJianghuLinks'));
    if (storedLinks && storedLinks.length > 0) {
        createSidebar(storedLinks);

        window.onload = function() {
            const visitedLinks = document.querySelectorAll('.visited-link');
            if (visitedLinks && visitedLinks.length > 0) {
                const lastVisitedLink = visitedLinks[visitedLinks.length - 1];
                lastVisitedLink.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }

    // Create a toggle button
    const toggleSidebarBtn = document.createElement('button');
    toggleSidebarBtn.id = 'toggleBtn';
    toggleSidebarBtn.textContent = 'Toggle Sidebar';
    toggleSidebarBtn.style.position = 'fixed';
    toggleSidebarBtn.style.top = '20px'; // Adjust the top position
    toggleSidebarBtn.style.left = '200px'; // Adjust the left position

    // Attach toggle functionality to the button
    toggleSidebarBtn.addEventListener('click', toggleSidebar);

    // Insert the button at the top of the body
    document.body.insertBefore(toggleSidebarBtn, document.body.firstChild);

    // Add styles
    const styles = `
        /* Additional styles for the button */
        #toggleBtn {
            border: none;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 9999;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Add styles
    addCustomStyle(`
        .visited-link {
            color: blue !important;
            text-decoration: line-through !important;
        }

        /* Media query for mobile devices */
        @media only screen and (max-width: 768px) {
            #sidebarContainer {
                display: none; /* Hide the sidebar on smaller screens */
            }

            /* Styles for the button on mobile */
            #toggleSidebarBtn {
                display: block; /* Show the toggle button */
                position: fixed;
                top: 10px;
                left: 10px;
                z-index: 9999;
                /* Additional styles for the button */
            }
        }
    `);
})();