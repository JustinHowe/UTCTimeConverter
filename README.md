# Enhanced UTC Time Converter with Timezone Abbreviation

A Tampermonkey userscript that scans any webpage for UTC time formats and converts them to your local machine's time, displaying both the converted time with AM/PM indicators and the original UTC time. It also handles invalid time formats gracefully.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps to Install](#steps-to-install)
- [Usage](#usage)
- [Validation](#validation)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Automatic Time Detection**: Recognizes UTC times in both `HHmmZ` and `HH:mmZ` formats (e.g., `1900Z` or `19:00Z`).
- **Local Time Conversion**: Converts detected UTC times to your local system time, accounting for time zones and Daylight Saving Time (DST).
- **12-Hour Format with AM/PM**: Displays converted times in a user-friendly 12-hour format with AM/PM indicators.
- **Timezone Abbreviation**: Appends the local timezone abbreviation (e.g., CST, CDT) to the converted time.
- **Invalid Time Handling**: Marks invalid time entries (e.g., `2560Z`) as `Invalid (original)` to maintain clarity.
- **Seamless Integration**: Works across all websites without disrupting page functionality by avoiding modifications within `script`, `style`, `textarea`, and `input` elements.

## Installation

### Prerequisites

- **Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, or any other supported browser.
- **Tampermonkey Extension**: Ensure that the Tampermonkey extension is installed in your browser.

### Steps to Install

1. **Install Tampermonkey**:

   - **Google Chrome**: [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - **Mozilla Firefox**: [Tampermonkey for Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - **Microsoft Edge**: [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - **Safari**: [Tampermonkey for Safari](https://www.tampermonkey.net/?browser=safari)

2. **Add the Userscript**:

   - **Option 1: Install via GitHub**

     - **Method A:** Navigate to the [Raw Userscript file on GitHub](https://github.com/JustinHowe/UTCTimeConverter/raw/refs/heads/main/UTCTimeConverter.user.js)
     - **Method B:** Navigate to the [GitHub Repository](https://github.com/JustinHowe/utc-time-converter).
       - Click on the `UTCTimeConverter.user.js` userscript file.
       - Click the **Raw** button to view the raw script.
     - Tampermonkey should automatically detect the script. Click **Install** in the Tampermonkey dialog that appears.

   - **Option 2: Manual Installation**

     - Copy the entire script from the [Enhanced UTC Time Converter with Timezone Abbreviation](#) repository.
     - Click on the Tampermonkey icon in your browser toolbar.
     - Select **Dashboard**.
     - Click the **+** (plus) button to create a new script.
     - Delete any default code in the editor.
     - Paste the copied script.
     - Click **File** > **Save** or press `Ctrl+S` (`Cmd+S` on Mac).

## Usage

Once installed, the script runs automatically on all websites you visit. It scans the webpage content for UTC time formats and replaces them with the converted local time alongside the original UTC time.

### Supported Time Formats

- `HHmmZ` (e.g., `1900Z`)
- `HH:mmZ` (e.g., `19:00Z`)

### Example Transformations

| Original Text | Converted Text (Assuming CST, UTC-6) |
|---------------|---------------------------------------|
| `0930z`       | `5:30 AM CST (09:30 UTC)`             |
| `19:00Z`      | `1:00 PM CST (19:00 UTC)`             |
| `2560Z`       | `Invalid (2560Z)`                      |

## Validation

To ensure that the script is functioning correctly, follow these validation steps:

1. **Visit a Test Webpage**:

   - Create a simple HTML file or use an existing webpage that contains various UTC time formats, such as:
     ```html
     <p>Meeting Time: 0930z</p>
     <p>Event Start: 19:00Z</p>
     <p>Invalid Time: 2560Z</p>
     ```

2. **Check for Time Conversion**:

   - After the page loads, the script should automatically convert the times:
     - `0930z` → `5:30 AM CST (09:30 UTC)`
     - `19:00Z` → `1:00 PM CST (19:00 UTC)`
     - `2560Z` → `Invalid (2560Z)`

3. **Verify Timezone and DST Handling**:

   - Ensure that the converted times reflect your local timezone and adjust accordingly during Daylight Saving Time periods.
   - Example:
     - During Standard Time: `CST`
     - During Daylight Saving Time: `CDT`

4. **Inspect Invalid Time Handling**:

   - Confirm that invalid times are marked appropriately without causing script errors or unintended modifications.

5. **Browser Console Check**:

   - Open the browser's developer console to ensure there are no errors related to the script execution.

## Customization

You can customize the script to better suit your needs:

- **Change Time Format**:

  - Modify the `toLocaleTimeString` options within the script to alter the time format (e.g., 24-hour format).

- **Restrict Script to Specific Domains**:

  - Edit the `@match` directive in the userscript header to limit the script's execution to certain websites.
    ```javascript
    // @match        *://*.example.com/*
    ```

- **Adjust Invalid Time Replacement Text**:

  - Change the replacement text for invalid times by modifying the `convertUTCToLocal` function.

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please follow these steps:

1. **Fork the Repository**:

   - Click the **Fork** button at the top-right corner of the repository page.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/yourusername/utc-time-converter.git
