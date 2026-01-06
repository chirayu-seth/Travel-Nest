import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function SearchResults() {
  const { searchResults } = useContext(AuthContext);

  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((home) => (
          <div key={home._id}>
            <h3>{home.title}</h3>
            <p>{home.location}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
