// 
// 

function FilterSection(){
    return(
        <>
            <div className="FilterSection">
                <h2>Search</h2>
                <form>
                    <input type="text" name="search" id="search" /> 
                    <button id="search_button">Search</button>
                </form>
            </div>
        </>
    )
}

export default FilterSection