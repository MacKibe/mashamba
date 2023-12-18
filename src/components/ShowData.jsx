import { useState, useEffect } from "react";

const GetData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5173/mashamba/src/components/getData.php"
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        // Get the data in json format.
        const result = await response.json();
        // Updates the data
        setData(result);
        // Display any data we got.
        console.log(result);
      } catch (error) {
        console.log("Error fetching data " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          {/* Render the document name */}
          <h2>Document Name: {item.doc_name}</h2>
        </div>
      ))}
    </div>
  );
};

export default GetData;
