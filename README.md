# Mashamba
- This is the transcription interface which allows users to transcribe documents

## Constructor
The constructor initializes various elements and event listeners for the mashamba class:  
*Purpose:* Initializes the mashamba class and sets up essential elements and event listeners.

##### What it does:
- Calls the constructor of the superclass (view.page) using super() to inherit its properties and methods.
- Initializes specific properties (first_page, other_pages, counter, docs) of the mashamba class:
    - first_page: Represents the HTML element of the first page.
    - other_pages: Represents the HTML element for other pages.
    - counter: Keeps track of the currently displayed document.
    - docs: Stores an array of documents fetched from the database.
- Fetches and assigns HTML elements (first_page and other_pages) by using document.getElementById.
- Attaches event listeners to specific buttons (nxt_btn, previous_btn, save_data_btn) using onclick:
    - nxt_btn: Calls move_next() when clicked.
    - previous_btn: Calls move_previous() when clicked.
    - save_data_btn: Calls save_data() when clicked.

#### Properties
1. First_page:  
*Purpose:* Represents the HTML element for the first page of a document.  
*Explanation:*  
This property is initialized in the constructor by fetching the element with the ID "first_page" from the HTML document.  
It's of type HTMLElement and is used to display the first page's of the document's.

2. Other_pages:  
*Purpose:* Represents the HTML element for other pages of a document.  
*Explanation:*  
Similar to first_page, this property is initialized in the constructor by fetching the element with the ID "other_pages" from the HTML document.  
It's also of type HTMLElement and is used to display other pages' of the document'.

3. Counter:  
*Purpose:* Keeps track of the currently displayed document.  
*Explanation:*  
Initialized to 0 in the class declaration. This property is incremented or decremented by the move_next() and move_previous() methods, respectively, to navigate between documents.

4. Docs?:  
*Purpose:* Stores an array of documents fetched from the database.  
*Explanation:*  
This property holds the retrieved documents and is initialized as undefined but later populated by the show_panels() method after fetching the data from the database.

## Public Methods:
1. ### Show_panels( )
*Purpose:* Fetches documents from the database and displays relevant information.  
##### What it does:  
Retrieves an array of documents from the database using the server.exec() method.
Calls load_title() to load the current document's content onto the page.

2. ### Move_next( )
*Purpose:* Moves to the next document.
#####   What it does:
Increments the counter by 1.
Calls load_title() to load the content of the next document onto the page.

3. ### Move_previous( )
*Purpose:* Moves to the previous document.
#####   What it does:
Decrements the counter by 1.
Calls load_title() to load the content of the previous document onto the page.

4. ### Load_title( )
*Purpose:* Loads the content of the current document onto the page.
#####   What it does:
Clears displayed panels and input fields.
Fetches the pages of the current document.
Creates and displays the first page of the document.
Fills the transcription panel with document data.
Creates and displays other pages of the document if they exist.

5. ### Create_first_page( )
*Purpose:* Creates and displays the first page of the document.
#####   What it does:
Retrieves the URL of the first page from the page object.
Creates an image element with the retrieved URL and attaches it to the first_page HTML element.

6. ### Create_other_page( )
*Purpose:* Creates and displays other pages of the document.
#####   What it does:
Retrieves the URL of a page from the page object.
Creates an image element with the retrieved URL and attaches it to the other_pages HTML element.

7. ### Clear_panels( )
*Purpose:* Clears displayed panels and input fields.
#####   What it does:
Clears the first page and other_pages panels.
Clears input elements related to document attributes, except for the pages key.

8. ### Fill_transcriptions( )
*Purpose:* Fills transcription panels with document data.
#####   What it does:
Retrieves the value for a specific document attribute (key) from the docs array based on the counter.
Sets the value of the corresponding input element in the transcription panel.

9. ### Save_data( )
Purpose: Collects input data and saves it into the database.
#####   What it does:
Constructs layouts for data to be saved.
Uses the server.exec() method to save the data into the database using the questionnaire module's methods.