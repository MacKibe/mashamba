//Accessing the mutall library
import * as server from "../../../schema/v/code/server.js";
//
//This is the description of a header record
type header_record = {name:string, title:string};
//
//The structure of the body record
type body_record = {num:string, name:string, contribution:string, total:number, count:number};
//
//The structure of contribution record
type contribution_record = {event:string, amount:number}; 

 //
//Get the base sql from file
const basesql:string = await server.exec(
    'path',
    ['/chama/v/code/contribution2.sql', true],
    'get_file_contents',
    []
);
//
//Verify that the base sql is valid. One idicaor is the last character. It 
//should be a bracket
if (basesql.trim().charAt(basesql.trim().length-1)!==')'){
    const msg=(`Your base sql may be invalid; check the end`);
    throw new Error(msg);
}

//The sorting order; the default is none. It is updated when a user clicks on 
//a crest or summary column
let sort_order = '';
//
//The crumb size
let crumb_size:number;

import * as view from "./../../../outlook/v/code/view.js";
export class page extends view.page{
    constructor(){
        super();
    }
    
    async show_panels():Promise<void>{
        alert('Hello World');
    }
}

//Show contributions by users for all the events as a matrix
export async function create_matrix(){
    //
    //create the crown
    create_crown();
    //
    //Show the header section of contributions matrix and return the size
    //crumb of teh crumn section 
    crumb_size = await create_header();
    //
    //Show the body section of the contribtions matrix
    await create_body();
    //
    //Create the footer
    await create_footer();
}
//
//Adding the datalist in the header section
async function create_crown():Promise<void>{
    //
    //Get the names
    const sql:string = `
    select 
        membership.num as num, 
        user.name as name
    from 
        membership 
        inner join user on membership.user = user.user 
    where not(membership.num is null)`;
    //
    //Get the footer data, as bottom summaries 
    const rows: Array<{num:string,name:string}> 
        = await server.exec(
            'database',
            ['mutall_contribution'],
            'get_sql_data',
            [sql]
        );
     // Get reference to the table cell element
    const crown = <HTMLTableSectionElement>document.getElementById('crown');
    // Create a datalist element
    const datalist = document.createElement('datalist');
    //
    // Create option elements for each
    rows.forEach(row => {
        const option = document.createElement('option');

        option.value = `${row.num}: ${row.name}`;
        
        datalist.appendChild(option);
    });

    // Add option elements to the datalist
    //datalist.appendChild(option1);

    // Set the attributes of the datalist
    datalist.id = 'datalist';
    // Create an input element
    const input = document.createElement('input');

    // Set the list attribute of the input element
    input.setAttribute('list', 'datalist');

    // Append the datalist and input elements to the table sectio element
    crown.appendChild(datalist);
    crown.appendChild(input);
     //Add an onchange event
    input.onchange = ()=> {
    //
    //Retrive the item selected from the datalist
    const selected_value = input.value;
    
    //
    //Extract the membership number
        const no = selected_value.split(":");
        const xy = no[0];
    //
    //Get the tr on the body to be compared
     const selected_row =  document.getElementById(xy) as HTMLTableRowElement | null;

    // ...

    if (selected_row) {
      select(selected_row);
      //
      //Bring the selected row to view
        selected_row.scrollIntoView();
    } else {
      // Handle case where the selected row is not found
      console.log('Selected row  not found.');
    }
  }
  };

//Show the header section of the contributions matrix, returning the number of 
//events, i.e., the crumb size
async function create_header():Promise<number>{
    //
    //1. Get data for the header region of the contribution matrix
    const header_data: Array<header_record> = await server.exec(
        'database',
        ['mutall_contribution'],
        'get_sql_data',
        ['select name, title from event where title is not null order by date asc']
    );
    //
   //2. Use the data to show the header row and its (crest, crumb and summary) 
   //cells
   //
   //2.1 Get the header region element
   const region:HTMLElement = get_element('header');
   //
   //2.2 Create the header table row element as a child of the header region
   const tr = <HTMLTableRowElement>create_element('tr', region);
   //
   //2.3 Create the CREST cells; there are 2: the num and name and of the 
   ////contributor and add teh click to sort event
   ['num', 'name'].forEach(factor=>create_sticky_header_cell(tr, 'left', factor));
   // 
   //2.4 Create the CRUMB cells; there as many as there are events
    header_data.forEach(row=>create_element('th', tr, row.title, row.name));
   //
   //Create the SUMMRY cells, i.e., the total and count
   ['total', 'count'].forEach(factor=>create_sticky_header_cell(tr, 'right', factor));
   //
   //Return the crumb size
   return header_data.length;
}

function create_sticky_header_cell(tr:HTMLTableRowElement, dir:'left'|'right', factor:string):HTMLElement{
    //
    const td = create_sticky_cell(tr, dir);
    //
    td.onclick = (evt)=>sort_column(evt);
    //
    td.textContent = factor;
    td.id = factor;
    //
    return td;
}

//Sort a clicked column. 
function sort_column(evt:MouseEvent){
    //
    //Get the event target as a html column element
    const col = evt.target as HTMLElement;
    //
    //Toggle the sorting order
    col.classList.toggle('asc');
    //
    //Get the column's id, as the field
    const field = col.id;
    //
    //Get the sorting direction, ascending or descending
    const dir:string = col.classList.contains('asc') ? 'asc' : 'desc';
    //
    //Set the sorting order for the clicked-on clumn
    sort_order = ` order by ${field} ${dir}`;
    //
    //Clear the body region of the current matrix
    get_element('body').innerHTML = '';
    //
    //Re-build the body region
    create_body();
}

//
//Return the identified element, if it exists. If it does not, then throw an
//exception 
function get_element(id: string): HTMLElement {
    //
    //Get the identified element from the current browser context.
    const element: HTMLElement | null =
        document.querySelector(`#${id}`);
    //
    //Check the element for a null value
    if (element === null)
        throw new Error(`The element identified by #${id} not found`);
    //
    //Return (found) the element       
    return element;
}


//The general procedure for crreating an element    
function create_element(type:string, parent:HTMLElement, textContent?:string, id?:string):HTMLElement{
    //
    //Use the document object to create one of its element
   const elem:HTMLElement = document.createElement(type);
   //
   //Attach the alement to the parent
   parent.appendChild(elem);
   //
   //Add the text content if available
   elem.textContent = textContent ===undefined ? '':textContent;
   //
   //Add an id if available
   elem.id = id===undefined ? '': id;
   //
   //Rteurn the element
   return elem;
}

//Create the body region of the contribution matrix in 2 phases. Phase 1 create
////the empty body cells. Phase 2 fills them with data
async function create_body(){
    //
    //Complete the with statement using the left summaru cte
    const sql:string = `${basesql} 
        select 
            num , name, contribution, total, count 
        from  
            left_summary
        ${sort_order}`;
    //
    //1. Get the data for filling the BODY region of the contribution matrix
    const body_data: Array<body_record> = await server.exec(
        'database',
        ['mutall_contribution'],
        'get_sql_data',
        [sql]
    );
    //
    //2. Use the data to show the body 
    //
    //2.1 Get the body table section
    const body_elem= <HTMLTableSectionElement>get_element('body');
    //
    //2.2 Guided by the data and header column sizes, create the empty body
    body_data.forEach(row=>create_body_row(body_elem,row));
    //
    //2.3 Fill the empty BODY skeleton with the data
    body_data.forEach((row, index)=>fill_body_row(row, index, body_elem));
    //
}

//Create an empty body row with the CREST, CRUMB and SUMMARY sections
function create_body_row(body:HTMLTableSectionElement,row:body_record){
    //
    //Create a body row element
    const tr =<HTMLTableRowElement> create_element('tr', body, '', row.num);
    
    //
    //Make this row selectable by attaching a a click event
    tr.onclick = ()=>select(tr);
    //
    //Add the CREST secrion cells. They are 2, viz., number and name
    //margin.
    ['num', 'name'].forEach(()=>create_sticky_cell(tr, 'left'));
    //
    //Add the CRUMB section cells. There are as may as there are events
    for(let i=0; i<crumb_size; i++) create_element('td', tr); 
    //
    //Add the SUMMARY section cells. There are 2: total and summary
     ['total', 'count'].forEach(()=>create_sticky_cell(tr, 'right'));
}

function create_sticky_cell(tr:HTMLTableRowElement, dir:'left'|'right'):HTMLElement{
  
   //Create the html td element  
   const td:HTMLElement = create_element('th', tr);
   //
   //get teh styling component
   const style = td.style;
   //
   //Add the styling details to stick the elements in thoer margs
   //
   style.position='sticky';
   
   const br = td.getBoundingClientRect();
   //
   //For righ margin sitiuations
   //
    const width = tr.getBoundingClientRect().width;
   //
   const right = width - br.right;
   //
   const size = dir==='left' ? br.left : right;
   //
   style[dir] = String(size);
  //
  style.backgroundColor = 'cyan';  
  //
  return td;
}

//When clicked on, the given row is selected after deseleting any othe row in
//in the entore worksheet. Hint:Use the classList object.
function select(tr:HTMLTableRowElement):void{
    //
    //Clear any selection, if any
    const selection:HTMLElement|null = document.querySelector('.selected');
    if (selection !== null) selection.classList.remove('selected');
    //
    //Mark the current row as selected
    tr.classList.add('selected');
}

//Fill the body row with data
function fill_body_row(
    row:body_record,
    index:number,
    body_elem:HTMLTableSectionElement,
):void{
    //
    //Use the index to get the body row
    const tr:HTMLTableRowElement = body_elem.rows[index];
    //
    //Show the 2 crest cells, i.e., the num and name of the contributor
    let td = <HTMLTableCellElement>get_element('num')!;
    tr.cells[td.cellIndex].textContent = row.num;
    //
    td = <HTMLTableCellElement>get_element('name')!;
    tr.cells[td.cellIndex].textContent = row.name;
    //
    //Decode the crumb data
    const crumb_data:Array<contribution_record> = JSON.parse(row.contribution);
    //
    //Show the crumb cells
    crumb_data.forEach(record => fill_body_crumb_cell(record, tr));
    //
    //Show the summary cells, total and count
    const total = <HTMLTableCellElement>get_element('total')!;
    tr.cells[total.cellIndex].textContent = String(row.total);
    //
    const count = <HTMLTableCellElement>get_element('count')!;
    tr.cells[count.cellIndex].textContent = String(row.count);
}

//Fill the crumb cell that matches the contributionevent with teh maount
function fill_body_crumb_cell(contribution:contribution_record, tr:HTMLTableRowElement):void{
    //
    //If there is no event, then there is no contribution, i.e., the amount
    //must be null; so is the beneficiary. So, do nothing
    if (contribution.event===null) return;
    //
    //Get the header cell that matches the event
    const header_td = <HTMLTableCellElement>get_element(contribution.event)!;
    //
    //Get cell in the current tr, that matces the header cell
    const td = tr.cells[header_td.cellIndex];
    //
    //Set the text content of the header cell
    td.textContent = String(contribution.amount);
}

//Summary names
type summary_name = 'total'|'members'|'out_of'|'percent';

//Create a footer by getting its data, creating the empty rows and filling them
//with data
async function create_footer(){
    //
    //Formulate the footer sql by completing the with statent with code for
    //extracting bottom summaries
    const sql:string = `${basesql} select event, summaries from bottom_summary`;
    //
    //Get the footer data, as bottom summaries 
    const rows: Array<{event:string, summaries:string}> 
        = await server.exec(
            'database',
            ['mutall_contribution'],
            'get_sql_data',
            [sql]
        );
    //
    //Define the required summaries        
    const summaries:Array<summary_name> = ['total', 'members', 'out_of', 'percent'];
    //
    //Get tthe footer section for holding summaries
    const footer = <HTMLTableSectionElement>get_element('footer');
    //
    //Create the footer rows (and  their empty cells).  
    summaries.forEach(name=>create_footer_row(footer, name));
    //
    //Fill the footer summary rows (and their cells)
    summaries.forEach((summary, index)=>fill_footer_cells(footer, summary, index, rows));
}

//Create the named summary row in the footer section, then create its crest, 
//crumb and summary cells
function create_footer_row(
    footer:HTMLTableSectionElement, 
    summary:summary_name
):void{
    //
    //Create the footer row
    const tr = <HTMLTableRowElement>create_element('tr', footer);
    //
    //Add the crest region cells. There is only one, with a span of 2; its text
    //content is the summary name
    create_element('th', tr, summary).setAttribute('colSpan', '2');
    //
    //Add as many crumb cells as there are events
    for(let i=0; i<crumb_size; i++) create_element('th', tr);
    //
    //Add the summary cells. Only the total column makes sense; the count one does
    //not
    //
   //Create the SUMMARY cells, i.e., the total and count
   create_element('th', tr);
   create_element('th', tr);
}

//Fill the cells of the named summary using teh given data
async function fill_footer_cells(
    footer:HTMLTableSectionElement,
    name:summary_name,
    index:number, 
    data:Array<{event:string, summaries:string}>
){
    //Get the footer row that matches the given name (index)
    const tr: HTMLTableRowElement = footer.rows[index];
    //
    //Fill the crest region cells. Its the first cell and has its cell 
    //content as the summary name
    tr.cells[0].textContent = name;
    //
    //Fill the crumb region cells
    data.forEach(event=>fill_footer_crumb_cells(footer, event));
    //
    //Fill the summary region cells. There are 2 cells: total and count
    //Under the total, put the gross amount. Under count, put nothing as it
    //does not make sense
    fill_footer_summary_cells(name, tr);
}


//Fill the crumb footer cells
 async function fill_footer_crumb_cells(
    footer:HTMLTableSectionElement,
    event:{event:string, summaries:string}
):Promise<void>{
    //Use the get_element methods that does not crash if the event name is not 
    //valid
    const cell: HTMLElement | null= document.getElementById(event.event);
    //
    //If there is no cell by named event, ignore the filling in process
    if (cell===null) return;
    //
    //Get cell index that corresponds to the named event
    let cellIndex = (<HTMLTableCellElement>cell).cellIndex;
    //
    //Adjust for the fact that the crest cells are merged into one
    cellIndex--;
    //
    //Convert the summary json string to an object
    const summaries: Array<number> = JSON.parse(event.summaries);
    //
    //The target row in teh footer section matches the summary value's index
    //Use the ajusted colIindex to access the desired cell to set its value
    summaries.forEach((value, rowIndex)=>footer.rows[rowIndex].cells[cellIndex].textContent=String(value));
}

//Only the cell under total makes sence. Set its content to the gross summary
//The count gross statistic does not make sense, so ignore it
async function fill_footer_summary_cells(name:summary_name, tr:HTMLTableRowElement){
    //
    switch(name){
        //
        //Fill the footer/total cellwith the gross amount
        case 'total':
            //
            //Get the total header column
            const th = <HTMLTableCellElement>get_element('total');
            //
            //Get the column index, adjusted for the fact that the crest cells are merged
            //to one cell
            const colIndex:number = th.cellIndex -1;
            //
            //Set the total cell content to the gross amount
           tr.cells[colIndex].textContent =  String((await server.exec(
                'database', 
                ['mutall_contribution'],
                'get_sql_data', 
                [`${basesql} table gross`]
            ))[0].amount);
            break;
       //
       //Ignore all other summaries         
       default:
    }
}
