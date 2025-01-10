// ==UserScript==
// @name         Enhanced UTC Time Converter with Timezone Abbreviation
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Converts four-digit UTC times (with or without colon) followed by 'Z' or 'z' to local machine time in 12-hour format with AM/PM and timezone abbreviation. Displays original UTC time. Marks invalid times as "Invalid".
// @author       Justin Howe
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Regular expression to match:
    // 1. Four digits followed by 'Z' or 'z' (e.g., 1900Z)
    // 2. Four digits separated by a colon followed by 'Z' or 'z' (e.g., 19:00Z)
    const regex = /\b(\d{2}):?(\d{2})([zZ])\b/g;

    /**
     * Converts UTC time to local time in 12-hour format with AM/PM and timezone abbreviation.
     * If the time is invalid, returns "Invalid (original)"
     *
     * @param {string} match - The full matched string (e.g., "1900Z" or "19:00Z")
     * @param {string} hour - The captured hour part
     * @param {string} minute - The captured minute part
     * @param {string} z - The 'Z' or 'z' character
     * @returns {string} - The formatted local time with original UTC or "Invalid (original)"
     */
    function convertUTCToLocal(match, hour, minute, z) {
        // Parse hours and minutes
        let utcHour = parseInt(hour, 10);
        let utcMinute = parseInt(minute, 10);

        // Check for valid time
        if (utcHour > 23 || utcMinute > 59) {
            return `Invalid (${match})`;
        }

        // Create a Date object in UTC
        let now = new Date();
        let utcDate = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            utcHour,
            utcMinute,
            0
        ));

        // Convert UTC date to local time
        // The Date object automatically handles the conversion based on the system's timezone and DST
        let localDate = new Date(utcDate.getTime());

        // Options for formatting local time with 12-hour format and timezone abbreviation
        let options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        };

        // Format local time
        let formattedLocalTime = localDate.toLocaleTimeString([], options); // e.g., "6:00 AM CST"

        // Format UTC time as "HH:MM UTC"
        let utcFormattedHour = utcHour.toString().padStart(2, '0');
        let utcFormattedMinute = utcMinute.toString().padStart(2, '0');
        let formattedUTCTime = `${utcFormattedHour}:${utcFormattedMinute} UTC`;

        // Return formatted local time with original UTC time in parentheses
        return `${formattedLocalTime} (${formattedUTCTime})`;
    }

    /**
     * Traverses the DOM and processes text nodes to replace matching time patterns.
     *
     * @param {Node} node - The current DOM node being traversed
     */
    function walk(node) {
        let child, next;

        switch (node.nodeType) {
            case 1: // Element
            case 9: // Document
            case 11: // Document fragment
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    // Avoid traversing certain elements to prevent unwanted modifications
                    if (child.nodeType === 1 && /^(script|style|textarea|input)$/i.test(child.tagName)) {
                        // Do not traverse these elements
                    } else {
                        walk(child);
                    }
                    child = next;
                }
                break;
            case 3: // Text node
                handleText(node);
                break;
        }
    }

    /**
     * Processes a text node, replacing matching time patterns.
     *
     * @param {Text} textNode - The text node to process
     */
    function handleText(textNode) {
        let originalText = textNode.nodeValue;
        let newText = originalText.replace(regex, convertUTCToLocal);
        if (newText !== originalText) {
            textNode.nodeValue = newText;
        }
    }

    // Execute the script after the DOM is fully loaded
    window.addEventListener('load', function() {
        walk(document.body);
    }, false);

})();
