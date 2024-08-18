import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for the current page
    const [totalPages, setTotalPages] = useState(1); // State for total pages
    const [category, setCategory] = useState(""); // State for selected category
    const [priceRange, setPriceRange] = useState([1, 2000]); // Price range state
    const [sortOption, setSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/all_products`)
            .then(res => setAllProducts(res.data))
            .catch(err => console.log(err))
    }
        , [])

    // Fetch products based on current page, selected category, and price range
    const fetchProducts = (page, category, priceRange) => {
        let url = `${import.meta.env.VITE_API_URL}/products?page=${page}`;
        if (category) {
            url += `&category=${category}`;
        }
        if (priceRange) {
            url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
        }

        axios.get(url)
            .then(res => {
                setProducts(res.data.products);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.log(err));
    };

    //dependency array to call fetchProducts when currentPage, category, or priceRange changes
    useEffect(() => {
        fetchProducts(currentPage, category, priceRange);
    }, [currentPage, category, priceRange]);

    // Function to handle category change
    const handleCategoryChange = (e) => {
        setCategory(e.target.value); // Update the selected category
        setCurrentPage(1); // Reset to the first page when category changes
    };

    // Price range handler
    const handlePriceRangeChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prevRange) => name === "min" ? [value, prevRange[1]] : [prevRange[0], value]);
        setCurrentPage(1); // Reset to first page on price range change
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);

        let sortedProducts = [...products];
        if (option === 'priceLowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (option === 'priceHighToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (option === 'dateNewestFirst') {
            sortedProducts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        }

        setProducts(sortedProducts);
    };

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/search?search=${query}`);
            const data = await response.json();
            setProducts(data);
        } else {
            setProducts(allProducts);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="md:text-5xl text-2xl my-16">All Products</h1>
            <div className="flex items-center justify-center flex-col gap-4">

                <div className="flex items-center justify-center flex-wrap gap-2">
                    <label htmlFor="sorting" className="mr-2">Sort by:</label>
                    <select
                        id="sorting"
                        onChange={handleSortChange}
                        value={sortOption}
                        className="select select-bordered"
                    >
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                        <option value="dateNewestFirst">Date Added: Newest First</option>
                    </select>
                </div>
                {/* Category Filter Dropdown */}
                <div className="flex items-center justify-center flex-wrap mb-8 gap-2">
                    <label htmlFor="category" className="mr-2">Filter by Category:</label>
                    <select id="category" value={category} onChange={handleCategoryChange} className="select select-bordered">
                        <option value="">All Categories</option>
                        {/* dynamically add categories in options */}
                        {
                            (() => {
                                const uniqueCategories = new Set();
                                allProducts.forEach(product => {
                                    uniqueCategories.add(product.category);
                                });
                                return Array.from(uniqueCategories).map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ));
                            })()
                        }
                        {/* Add more categories as needed */}
                    </select>
                </div>
                <div className="form-control mb-8">
                    <input type="text" placeholder="Type to search" onChange={handleSearchChange} className="input rounded-3xl input-bordered w-auto" />
                </div>

                {/* Price Range Filter */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
                <label className="mr-2">Price Range:</label>
                <input
                    type="number"
                    name="min"
                    value={priceRange[0]}
                    onChange={handlePriceRangeChange}
                    min="1"
                    max="2000"
                    className="input input-bordered w-24"
                />
                <span className="mx-2">to</span>
                <input
                    type="number"
                    name="max"
                    value={priceRange[1]}
                    onChange={handlePriceRangeChange}
                    min="1"
                    max="2000"
                    className="input input-bordered w-24"
                />
                <span className="ml-2">USD</span>
            </div>
            </div>
            <div className="grid lg:gap-10 md:gap-6 gap-4 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 mb-16">
                {
                    products.map(product => {
                        return (
                            <div key={product.productName} className="card bordered shadow-lg lg:w-80">
                                <figure className="aspect-square">
                                    <img src={product.productImage} onError={(e) => { e.target.onerror = null; e.target.src = "https://i.ibb.co/t2gtXKw/noImg.png" }} referrerPolicy="no-referrer" alt="product" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.productName}</h2>
                                    <div className="badge badge-accent">{product.category}</div>
                                    <p>{product.description}</p>
                                    <p className="font-bold">Price: <span className="text-primary">${product.price}</span></p>
                                    <p>Created On: {new Date(product.creationDate).toLocaleDateString('en-GB')} at {new Date(product.creationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <div className="justify-between card-actions">
                                        <button className="btn btn-secondary rounded-full">Buy Now</button>
                                        <button className="btn btn-ghost rounded-full">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* Pagination Controls */}
            <div className="btn-group join mb-12">
                {/* Previous Button */}
                <button className="btn btn-sm md:btn-md join-item" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>

                {/* Page Number Buttons */}
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn btn-sm md:btn-md join-item ${currentPage === index + 1 ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))
                }

                {/* Next Button */}
                <button className="btn btn-sm md:btn-md join-item" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;