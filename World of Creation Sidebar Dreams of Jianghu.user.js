// ==UserScript==
// @name         World of Creation Sidebar Dreams of Jianghu
// @namespace    http://tampermonkey.net/
// @version      1.03
// @description  World of Creation TOC sidebar
// @author       Znesfreak
// @match        https://dreamsofjianghu.ca/*
// @grant        GM_addStyle
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
    const scriptUrl = 'https://github.com/nguyenk06/UserScript/raw/main/World%20of%20Creation%20Sidebar%20Dreams%20of%20Jianghu.user.js';

    fetchScript(scriptUrl, function(remoteScript) {
        const match = remoteScript.match(/@version\s+(.+)/);
        if (match) {
            const remoteVersion = match[1];
            if (remoteVersion !== GM_info.script.version) {
                if (confirm('A new version is available. Update now?')) {
                    window.location.href = scriptUrl;
                }
            }
        }
    });
}

	
	// Run checkupdate
	checkForUpdate();


function extractAndStoreLinks() {
    const storedLinks = JSON.parse(localStorage.getItem('dreamsOfJianghuLinks')) || [];
    const newLinks = [];

    // Your logic to extract new links from the table of contents page
    // ...

    // Example: Adding new links to stored links without overwriting existing ones
    newLinks.forEach((newLink) => {
        const existingLink = storedLinks.find(link => link.href === newLink.href);
        if (!existingLink) {
            storedLinks.push({ ...newLink, visited: false }); // Append new links
        }
    });

    localStorage.setItem('dreamsOfJianghuLinks', JSON.stringify(storedLinks));
}
    function createSidebar(links) {
        const sidebarContainer = document.createElement('div');
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

    function markAsVisited(index) {
        const storedLinks = JSON.parse(localStorage.getItem('dreamsOfJianghuLinks'));
        if (storedLinks && storedLinks[index]) {
            storedLinks[index].visited = true;
            localStorage.setItem('dreamsOfJianghuLinks', JSON.stringify(storedLinks));
        }
    }
	 function toggleSidebar() {
        const sidebar = document.getElementById('sidebarContainer');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
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

    const toggleSidebarBtn = document.createElement('button');
    toggleSidebarBtn.textContent = 'Toggle Sidebar';
    toggleSidebarBtn.id = 'toggleSidebarBtn';
    toggleSidebarBtn.style.display = 'none';

    toggleSidebarBtn.addEventListener('click', toggleSidebar);

    document.body.appendChild(toggleSidebarBtn);

    GM_addStyle(`
        /* Your existing styles for the sidebar */
        #sidebarContainer {
            /* Your sidebar styles */
            display: block; /* Make sure sidebar is initially visible */
        }

          /* Media query for mobile devices */
        @media only screen and (max-width: 768px) {
            #sidebarContainer {
                display: none !important; /* Hide the sidebar on smaller screens */
            }
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