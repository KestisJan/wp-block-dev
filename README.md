# My First Block 🚀

A custom WordPress Gutenberg block built to understand the "Handshake" between PHP, React, and the WordPress Block Editor. This project serves as a technical log for mastering block development and agency-standard workflows.

## 🛠 Tech Stack
*   **PHP**: Server-side block registration and **Dynamic Rendering** via `render_callback`.
*   **React (JSX)**: Editor interface logic located in `src/edit.js`.
*   **WordPress Scripts**: Build tooling provided by `@wordpress/scripts`.
*   **LocalWP**: Local development environment.

## 🚀 Getting Started

### Prerequisites
*   **Node.js & NPM**: Required to compile JavaScript.
*   **WordPress Local Environment**: (e.g., LocalWP, DevKinsta, or Docker).

### Installation & Development
1.  Clone this repository into your `wp-content/plugins/` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the build engine (Watch Mode):
    ```bash
    npm start
    ```
4.  Activate the **"My First Block"** plugin in the WordPress Admin.

---

## 📝 Learning Log & Troubleshooting

### 1. PHP Initialization (The "Fatal Error" Fix)
Encountered a `TypeError` on the `init` hook because the callback string in `add_action()` did not match the function name defined in `my-first-block.php`. 
*   **Lesson**: WordPress hooks are literal. The string passed to the hook must match the function name exactly.

### 2. Block Properties & Wrapper Injection
Explored the `useBlockProps` hook within `src/edit.js`.
*   **Implementation**: Used `const blockProps = useBlockProps({ className: 'agency-test-class' });`.
*   **Result**: Learned how to merge custom CSS classes into the standard WordPress wrapper, allowing for specialized styling while maintaining core editor functionality.

### 3. Attributes & Data Persistence (The Dynamic Shift)
Moved from static "HTML-scraped" content to **JSON-stored attributes**.
*   **Implementation**: Removed `source` and `selector` from `block.json`. 
*   **Lesson**: For Dynamic Blocks (PHP rendered), WordPress saves attributes as raw data in a JSON comment (`<!-- wp:my-block {"userName": "..."} /-->`). This is more robust than "scraping" HTML because changing the frontend HTML won't break existing saved data.

### 4. The "Handshake": React to PHP
Implemented a **Dynamic Render Callback** to handle the frontend.
*   **Editor (`edit.js`)**: Manages the UI and saves raw data into attributes.
*   **Frontend (`render.php` callback)**: Uses a PHP function to generate HTML on-the-fly.
*   **The "Magic" Wrapper**: Mastered `get_block_wrapper_attributes()` in PHP to automatically inject typography, spacing, and custom styles from the editor into the frontend `div`.

### 5. Troubleshooting the Syntax "Ghost"
Learned the importance of literal HTML syntax when using `sprintf()` in PHP.
*   **Discovery**: A missing `>` in the opening `<div>` string within the render function can break the entire layout. 
*   **Fix**: Always ensure the HTML "container" is properly closed before appending content: `sprintf( '<div %s>', $wrapper_attributes )`.

---

## 📂 Project Structure
*   `my-first-block.php`: The main entry point. Contains the `render_callback` function for dynamic output.
*   `src/`: React source code.
*   `build/`: Compiled production code (WordPress reads `block.json` from here).
*   `block.json`: The metadata file. Defines attributes as **Raw Data types** (string, boolean, etc.) without HTML selectors.

---

### Next Steps in the Learning Journey
*   [x] Define **Attributes** for data persistence.
*   [x] Implement **Dynamic PHP Rendering** to prevent block validation errors.
*   [x] Use **get_block_wrapper_attributes** for professional attribute injection.
*   [ ] **Inspector Controls**: Add a sidebar settings panel for color or layout toggles.
*   [ ] **Block Styles**: Refine the design in `style.scss` (frontend) and `editor.scss` (editor-only).