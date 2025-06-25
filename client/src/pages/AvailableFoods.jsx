import React, { useEffect, useState } from "react";
import Container from "../customs/Container";
import Loading from "../components/Loading";
import FoodCard from "../components/FoodCard";
import SectionHead from "../customs/SectionHead";
import useFoods from "../hooks/useFoods";

export default function AvailableFoods() {
  const {availableFoods, loading} = useFoods();
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [layout, setLayout] = useState("grid-cols-3");
  
        const handleChange = (e) => {
          setLayout(e.target.value);
        };

  useEffect(() => {
    setFilteredFoods(availableFoods);
  }, [availableFoods]);


  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredFoods(availableFoods);
    } else {
      const filtered = availableFoods.filter(food => food.category === category);
      setFilteredFoods(filtered);
    }
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOption(sort);
    const filtered =
      selectedCategory === "All"
        ? availableFoods
        : availableFoods.filter((food) => food.category === selectedCategory);

    const sorted = applySorting(filtered, sort);
    setFilteredFoods(sorted);
  };

  const applySorting = (data, sort) => {
    const sortedData = [...data];
    if (sort === "name-asc") {
      return sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      return sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "date-asc") {
      return sortedData.sort(
        (a, b) => new Date(a.expired_date) - new Date(b.expired_date)
      );
    } else if (sort === "date-desc") {
      return sortedData.sort(
        (a, b) => new Date(b.expired_date) - new Date(a.expired_date)
      );
    }
    return sortedData;
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = availableFoods.filter((food) =>
      food.name.toLowerCase().includes(searchText) ||
      food.pickup_location.toLowerCase().includes(searchText)
    );
    setFilteredFoods(filtered);
  }

  if (loading) return <Loading />;

  if (availableFoods.length === 0) 
  return (<Container>
    <div className="text-center text-3xl font-semibold col-span-1 md:col-span-3 border-[1px] border-gray-200 p-5 rounded-lg mt-5">
    No Food Item Available.
    </div></Container>);

  return (
    <Container>
      <SectionHead
        title="Available Foods"
        subtitle="List of available foods."
      />
      <section className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3 mt-3 mb-10">
      <div className="flex gap-3 items-center border-secondary shadow-sm border-[1px] rounded-lg pr-2 pl-3">
        <span className="font-semibold">Filter :</span>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="select select-ghost rounded-lg border-0 focus-within:outline-none flex-1"
        >
          <option value="All">No Filter</option>
          <option value="Rice Item">Rice Item</option>
          <option value="Curry Item">Curry Item</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Fruits">Fruits</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>

      <div className="flex gap-3 items-center border-secondary shadow-sm border-[1px] rounded-lg pr-2 pl-3">
          <label className="font-semibold">Sort by :</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="select select-ghost rounded-lg border-0 focus-within:outline-none flex-1">
            <option value="">None</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="date-asc">Expired Date (Earliest)</option>
            <option value="date-desc">Expired Date (Latest)</option>
          </select>
        </div>

        <div>
        <div className="hidden lg:flex gap-3 items-center justify-center border-secondary shadow-sm border-[1px] rounded-lg h-full py-2">
          <label className="font-semibold">Column :</label>
          <input
          type="radio"
          name="layout"
          value="grid-cols-3"
          className="radio radio-secondary"
          checked={layout === "grid-cols-3"}
          onChange={handleChange}
        />
        <span className="opacity-80">3</span>
        <input
          type="radio"
          name="layout"
          value="grid-cols-2"
          checked={layout === "grid-cols-2"}
          onChange={handleChange}
          className="radio radio-secondary"
        />
        <span className="opacity-80">2</span>
          
        </div>
        </div>

        <div className="flex gap-3 items-center border-secondary shadow-sm hover:border-secondary border-[1px] rounded-lg pr-2 pl-3 md:col-span-2">
        <input type="text" onChange={handleSearch} placeholder="Search By Name or Location..." className="input input-ghost rounded-lg border-0 focus-within:outline-none flex-1" />
        </div>
      </section>

      <section className={`w-full grid grid-cols-1 lg:${layout} md:grid-cols-2 gap-5`}>
        {
          filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))
          ) : (
            <div className="text-center text-3xl font-semibold col-span-1 md:col-span-3 border-[1px] border-gray-200 p-5 rounded-lg mt-5">
              No available food with this category.
            </div>            
          )
        }
      </section>
    </Container>
  );
}
