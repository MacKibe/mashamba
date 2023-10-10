//
//Get pre existing methods usefull for creating elements and other functionality
import {view} from '../../../outlook/v/code/view.js'
//
//For Reporting errors within the program flow
import {mutall_error, basic_value} from "../../../schema/v/code/schema.js";
//
//The general definition of a group of user inputs is characterised by the 
//'type' keyword, as a discriminant. This construct allows us to design forms for 
//collecting sophisticated data, Z, defined below:-
/*
type Z = A|B|C

where

A extends group{...}
B extends group{...}
C extends group{...}
 
*/
export interface group {
    type:string;
}
//
//The raw data of a clean version(x) is defined as follows:- 
export type raw<x> =
    //
    //If the clean version, x, is a group, then its raw version is the same as x
    //with all the key values converted to raw (except the discriminant, key, 'type'
    //The raw data may involve all r some of he keys of x
    x extends group ? Partial<{ [key in keyof x]:key extends 'type' ? x[key]: raw<x[key]>}>
    //
    //If x is not a group, then its raw version includes the Error
    :x|Error| null
//
//This is type a guard for testing whether some user input is a group or not
export function is_group(user_input:any):user_input is group{
    //
    //Any input is a group if it contains a key named 'type' whose type is  
    //string
    return  ('type' in user_input && typeof user_input['type']==='string');
}
    
//
//Dialog is an abstract class that has 4 public methods:-
//-administer,  that collect inputs from user
//- populate, that fills a dialog box with inputs on load
//- read that extracts  the user modified inputs for
//- save that uses the rda inputs to execute save-like operation, e.g., writing 
//to a databse, effecting registration, etc
//Read and save are hae to be implemented by the extending class. Populate is
//and does nothing. Users overide it to implement their requirements. It was 
//designed to spport editing of exusting data 
export abstract class dialog<Idata> extends view{
    //
    //Visual representation of the dialog class
    public visual:HTMLDialogElement;
    //
    //This refers to the process that led to the data collection.It might not 
    //nessesarily be saving the data to the database
    abstract save(input:Idata):Promise<"ok" | Error>;
    //
    //The opposite of populate. It reads and returns data from a dialog
    abstract read():Promise<raw<Idata>>;
    //
    constructor(
        //
        //The optional html fragment needed for cnstrucipng a dialogbox compirise
        //of 2 parts: the url and the pont where to anchor it. It is not 
        //needed when the input form is already designed by the user. 
        //The mashamba project is a case in point 
        public fragment?:{url:string, anchor:HTMLElement},
        //
        //The original data being edited
        public data_original?:Idata,
        //
        //How to show the dialog, modal or modalless
        public modal:boolean = true
    ){
        //
        //Get the url (for the parent constructor) of the html fragment is 
        //given
        super(fragment ? fragment.url: undefined);
        //
        //Create a dialog box on the given fragment anchor. If teh fragment is not
        //given, we shall use the existing body
        const anchor:HTMLElement = fragment ? fragment.anchor : this.document.body;
        //
        //Create teh visual aspect of the dialog box
        this.visual = this.create_element("dialog", anchor);
    }
    //
    //This coordinates all data collection and processing activities. It shows the 
    //dialog waits for the user to initiate a process after data entry and depending
    //on the process selected by the user the data enterd is retrieved from the form
    //validation checks are done to ensure the quality of the data collected then
    //fainally the process that the user selectd is undertaken returning the collected
    //data upon succes and closing the data collection dialog
    public async administer():Promise<Idata|undefined>{
        //
        //Show the dialog (there may be a need to fetch a url from the server)
        const {submit, cancel} =  await this.open();
        //
        //Wait for the user to click either save or cancel button and when they 
        //do return the imagery or undefined(JM,SW,JK,GK,GM)
        const result: Idata | undefined = await this.get_user_response(submit, cancel);
        //
        //Close the dialog unconditionally
        this.close();
        //
        return result;
    }
    //
    //Process of attaching the form fragment to the dialog box and populating the 
    //form in case of data modification.After all these processes show the dailog
    //box to the user for data entry.
    private async open():Promise<{submit:HTMLElement, cancel:HTMLElement}>{
        //
        //If the html fragment is provided, use it to show the dialog box 
        if (this.fragment){
            //
            //Request for the content of the file specified by the path 
            const response: Response = await fetch(this.fragment.url); 
            //
            //Check whether there was an error in server-client communication 
            if (!response.ok) 
                throw new mutall_error(
                    `Fetching ${this.url} failled. Status code${response.status}, 
                    status text ${response.statusText}`
                );
            //
            //Append the string to the html of the dialog
            this.visual.innerHTML = await response.text();
            //
            //Get whatever form was appended to the dialog
            const form = this.visual.querySelector("form");
            //
            //Prevent the default submit behaviour of the form if present
            if(form) form.onsubmit = (e) => e.preventDefault();
        }
        //
        //If there is any data avalable use it to populate this page
        if (this.data_original) this.populate(this.data_original);
        //
        //Show the dialog box, depending on desired mode
        if (this.modal) this.visual.showModal();  else  this.visual.show();
        //
        //At this point teh daialog box is ready for the users to paint it with
        //their requirements
        await this.onopen(); 
        //
        //Return the submit and cancel buttons.
        return {submit:this.get_element('submit'), cancel:this.get_element('cancel')}        
    }
    //
    //Fill the dialog box with the given data, typically obtained from a database
    //This section is particularly useful in cases of modification of data. 
    //When a dialog instance is created with data then override this method
    //to provide the prefferd way of displaying the data to the dialog form.
    populate(data:Idata):void{
        //
        throw new mutall_error(`Editing of ${this.constructor.name} data is not implemented`);
    };
    //
    //Stub for the users to paint the dialogbox so that it looks as desired
    //when seen he first time. By default, it does nothing. [task]In future this
    //step may perform such general tasks as:-
    async onopen():Promise<void>{
        //
        //Mark all required data-fields with an asterisk (*)
        //
        //Add placeholders for reporting errors, targeting  specific data-fields
        //
        //Add even listeners to radio buttons to support collapsing/uncollapsing 
        //of selected/deselected options. [task] Mogaka/Maggie please note
        //
        //Add the event listener for clearing errors on form input
    }

    //
    //We wait for the user to enter the data that is required in the form and initate
    //one of two processes:-
    //1. submit
    //2. Cancel
    //Based on the user selected process we prefom relevant actions
    private get_user_response(submit:HTMLElement, cancel:HTMLElement): Promise<Idata| undefined> {
        //
        //Wait for the user to enter data and initiate the desired process
        return new Promise((resolve) => {
            //. After entering input details the user can either
            //
            // ...submit the data
            submit.onclick = async () => await this.submit(resolve);
            //
            // ... terminate the process by canceling
            cancel.onclick = () => resolve(undefined);
        });
    }
    //
    //This closes the dialog when all operations concerning it are done
    public close():void{
        //
        //Detach the dialog from the anchor
        //
        //This step is necessary only if the dialogbox was desigend using a
        //html fragment
        if (this.fragment) this.fragment.anchor.removeChild(this.visual);
    }
    //
    //Here we collect the data that the user enterd in the form then save considering 
    //the different sources of the data while reporting any errors to the user
    //and eventually resolving the promised data upon succesful saving.
    public async submit(resolve:(i:Idata)=>void):Promise<void>{
        //
        //Retrieve the infromation that was enterd by the user
        const input:raw<Idata> = await this.read();
        //
        //Check the raw data for errors, reporting them if any 
        const output:Idata|undefined = this.check(input);
        //
        //Continue only of there were no errors. Note the explicit use of '===', 
        //just incase output was a boolean value
        if (output===undefined) return; 
        //
        //Save the content 
        const result: "ok" | Error = await this.save(output);
        //
        //Resolve the promised Idata if the operation was succesful
        if (result === "ok") resolve(output); 
        //
        ///..otherwise report the error in a general fashion, i.e., not targeting
        //a specific user input
        else this.report_error("report", result.message);
    }

    //Check the raw data for errors, returning with the clean data if there are
    //no errors and void if there are.
    check(input:raw<Idata>):Idata|undefined{
        //
        //Let output be the desired result.
        const output :Idata|undefined = 
            //
            //If the input is a group, return the group check result
            is_group(input) ? this.check_group(input)
            //
            //If the inpt is not a gepup and us errornous, return the void of the
            //the error report
            : input instanceof Error ? this.report_error('report', input.message)
            //
            //If the input is not an error then return it as the output, casted
            //into clean data
            : <Idata>input; 
        //
        return output;    
    }

    //Check the raw group (of user inputs) for errors
    check_group(input:raw<Idata>):Idata|undefined{
        //
        //The input must be a group.If it is not, throw an exception
        if (!is_group(input)) throw new mutall_error('User input group expected');
        //
        //Isolate the all the raw data keys. Ojcet keys are always strings.
        //Coerce them to the correct type (so that the next filtering can use
        //the correct data types)
        const keys = Object.keys(input) as Array<keyof raw<Idata>>;
        //
        //Filter out the erroneous keys of the raw data
        const err_keys = keys.filter(key => input[key] instanceof Error);
        //
        //If errors are found, report them to the user and discontinue this 
        //submisssion
        if (err_keys.length>0){
            //
            //Report the errors
            err_keys.forEach(key=>{
                //
                //use the given (string) key as a (keyof Idata) get the raw data
                //must be an error 
                const error = <Error>input[key];
                //
                //Report the error message. Assue the key must be a string
                this.report_error(<string>key, error.message);
            });
            //
            return undefined;
        }
        //
        //Reteurn input as the clean data
        return <Idata>input;
    }

} 