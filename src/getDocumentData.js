// Import exec from the schema library (assuming it returns a Promise)
import exec from "../../schema/v/code/server";

export default async function getDocuments() {
  try {
    const documents = await exec(
      "database",
      ["mutall_mashamba", false],
      "get_sql_data",
      ["mashamba/src/title.sql", "file"]
    );

    // Process the 'docs' if needed
    // For example, docs might be already in the desired format
    return documents;
  } catch (error) {
    // Handle errors if any occur during fetching or processing
    console.error("Error fetching documents:", error);
    throw error; // Propagate the error to the caller if necessary
  }
}
