// 
// 
import FilterSection from "./FilterSection"
import DocumentsList from "./DocumentsList"
export function SidePanel ({ document_data }) {
    return(
        <>
            <div>
                <FilterSection />
                <DocumentsList document_data={document_data}/>
            </div>
        </>
    )
}

