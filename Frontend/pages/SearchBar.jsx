import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeList() {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/homes").then((res) => {
      setHomes(res.data);
      setFilteredHomes(res.data);
    });
  }, []);

  // Instant frontend filter
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredHomes(
      homes.filter(
        (home) =>
          home.title.toLowerCase().includes(lowerSearch) ||
          home.location.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, homes]);

  // Backend query when pressing Enter
  const handleSearchBackend = async (e) => {
    if (e.key === "Enter") {
      const res = await axios.get(`/api/search?q=${search}`);
      setFilteredHomes(res.data);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search homes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchBackend}
      />

      <div>
        {filteredHomes.map((home) => (
          <div key={home._id}>
            <h3>{home.title}</h3>
            <p>{home.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
