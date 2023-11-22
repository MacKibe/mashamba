//Codes borrowed from the mutall libraries
import { view } from "./../../../outlook/v/code/view.js";
import { exec } from "./../../../schema/v/code/server.js";
export class mmm extends view {
    base;
    //
    //Base is the path for accessing the images, e.g., /mashamba/images
    constructor(base) {
        super("./mmm.html");
        this.base = base;
    }
    //
    //Show all the loaded documents in the matching panel 
    async show_panels() {
        //
        //Get the documents
        const Idocuments = await this.get_documents();
        //
        //Get the documents anchor tag; its an ordered list
        const ul = this.get_element('documents');
        //
        //Attach all the documents to the anchor tag
        Idocuments.forEach(Idocument => new doc(Idocument, ul, this.base));
    }
    //Use the mmm cte to retrieve all the documents in the system
    async get_documents() {
        //
        //Read the mmm cte from the sql file
        const mmm_cte = await exec('path', 
        //
        //The given path is a file for which a root will be needed.
        ['/mashamba/v/mmm/title.sql', true, true], 'get_file_contents', []);
        //
        //Expand the triple_m cte to formulate the sql for retrieving all the 
        //documents as a single structure
        const sql = `
            ${mmm_cte}
            select
                json_arrayagg(documents) as documents
            from
                result`;
        // 
        //Excecute the sql to get the documents
        const rows = await exec('database', ['mutall_mashamba'], 'get_sql_data', [sql]);
        //Get the only row of documents
        const row = rows[0];
        //
        //Get the documents as a json string
        const str = row.documents;
        //
        //dedove the string to an arru of documents       
        const documents = JSON.parse(str);
        //
        //Return the documents
        return documents;
    }
}
//N.B. Document is a reserved word 
class doc extends view {
    doc;
    ul;
    base;
    //
    constructor(doc, ul, base) {
        //
        //Initialize the view system
        super();
        this.doc = doc;
        this.ul = ul;
        this.base = base;
        //
        //Crreate a proxy for this document and add a click event listener
        //for displaying images and transcriptions in  their respective places
        this.create_element('li', ul, {
            onclick: () => this.show_details(),
            textContent: doc.id
        });
    }
    //Show the pages and their transcriptions for this document.
    //The document is self contained, so there is not need fetch anything from 
    //server. This means we can construct the document afresh every time we 
    //request for it 
    show_details() {
        //
        //Clear the image panel
        let img;
        (img = this.get_element('images')).innerHTML = '';
        //
        //Clear the transcription pannel
        let trans;
        (trans = this.get_element('transcription')).innerHTML = '';
        //
        //Show images in the panel
        this.doc.images.forEach(Iimage => new image(Iimage, img, this.base));
        //
        //Get teh transcriptions
        const transcriptions = this.doc.transcriptions;
        //
        //Show transcriptions inthoer panel
        Object.entries(transcriptions).map(entry => new transcription(entry, trans));
    }
}
//An image scanned from a document page. It matches this fragment:-
/*
    <div onclick="page.select()">
        <img src=$url/>
        <figcaption>$details</figcaption>
    </div>
*/
class image extends view {
    base;
    //
    //Base the the path of the image
    constructor(raw, anchor, base) {
        super();
        this.base = base;
        //
        //Destructure the image interface;
        const { num, url, name } = raw;
        //
        //Create the div tag that is marked as selected when clicked on. Consider
        //putting selected in the library
        const div = this.create_element('div', anchor, {
            onclick: (evt) => this.select(evt, anchor),
        });
        //Let the picuture be has tall as the panel height
        div.style.height = '100%';
        //
        //Use the url to create the image element
        const img = this.create_element('img', div, { src: `${this.base}/${url}` });
        //
        //Set the image tag height to 90, so that there is room for caption
        img.style.height = '90%';
        //
        //Place the caption under the image
        const caption = this.create_element('figcaption', div, { textContent: `page ${num}` });
        //
        //Center this caption
        caption.style.alignSelf = 'center';
    }
    //Select an image
    select(evt, anchor) {
        //
        //Get the target target
        const target = evt.target;
        //
        //The event must be from valid html element
        if (!(target && target instanceof HTMLElement))
            return;
        //
        //Remove selections from all the anchored elements
        Array.from(anchor.querySelectorAll('.selected')).forEach(tag => tag.classList.remove('selected'));
        //
        //Mark the target as selected
        target.classList.add('selected');
    }
}
//Transcription models input/output, io, system for simple text inputs. It 
//matches the following html fragment:-
/*
    <label style='display:block'>
        <span>$key</key>
        :
        <span onclick='this.edit(evt)'> $value </span>
        <input type='text' value=$key hidden onblurr='this.view(evt)'/>
    </label>
*/
class transcription extends view {
    entry;
    //
    //The elements that supports the edit event
    value;
    input;
    //
    //The entry is a pair of key and value
    constructor(entry, anchor) {
        super();
        this.entry = entry;
        //
        //Destructire an entry
        const [key, value] = entry;
        //
        //Create a label anchored at the given tag
        const label = this.create_element('label', anchor);
        //
        //Dispalyed a abele on its own line
        label.style.display = 'block';
        //
        //Put the key value in a span tag under the label. N.B. The trailing
        //no breaking space entity
        this.create_element('span', label, {
            textContent: `${key.toLocaleUpperCase()}:`,
            className: 'key'
        });
        //
        //View the value on another span tag which, enc clicked on turns the io
        //into edit mode
        this.value = this.create_element('span', label, {
            textContent: value,
            className: 'value',
            onclick: () => this.edit(true)
        });
        //Create a hidden inout elenent which becomes visible when in edit mode
        this.input = this.create_element('input', label, {
            type: 'text',
            value: value,
            hidden: true,
            onblur: () => this.edit(false)
        });
    }
    //Edit or view a transcription
    edit(edit_mode) {
        //
        //If in edit mode, show the input and hide the value
        if (edit_mode) {
            this.input.hidden = false;
            this.value.hidden = true;
        }
        //
        //If in view mode, transfer content to the value element, hide the
        //input shanshow the value 
        else {
            this.value.textContent = this.input.value;
            this.value.hidden = false;
            this.input.hidden = true;
        }
    }
}
