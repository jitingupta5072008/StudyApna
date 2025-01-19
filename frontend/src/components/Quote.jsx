import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true); // Fetch start hone par loading true karein
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false); // Fetch complete hone par loading false karein
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []); // Run only once when the component mounts

  return (
    // <div>
    //   <p style={{ fontStyle: "italic" }}>"{quote}"</p>
    //   <p style={{ textAlign: "right",color: "#db2777",fontWeight:"bold" }}>- {author}</p>
    // </div>
     <div>
     {loading ? ( // Agar loading true hai to "Loading..." dikhayein
       <p>Loading...</p>
     ) : (
       <>
         <p style={{ fontStyle: "italic" }}>"{quote}"</p>
         <p style={{ textAlign: "right",color: "#db2777",fontWeight:"bold"  }}>- {author}</p>
       </>
     )}
   </div>
  );
};

export default Quote;
