import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for the current page
    const [totalPages, setTotalPages] = useState(1); // State for total pages
    const [category, setCategory] = useState(""); // State for selected category
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/all_products`)
            .then(res => setAllProducts(res.data))
            .catch(err => console.log(err))
    }
        , [])

    // Fetch products based on current page and selected category
    const fetchProducts = (page, category) => {
        let url = `${import.meta.env.VITE_API_URL}/products?page=${page}`;
        if (category) {
            url += `&category=${category}`;
        }

        axios.get(url)
            .then(res => {
                setProducts(res.data.products);
                setTotalPages(res.data.totalPages); // Set the total pages from the response
            })
            .catch(err => console.log(err));
    };

    // Trigger fetch on mount and when page or category changes
    useEffect(() => {
        fetchProducts(currentPage, category);
    }, [currentPage, category]);

    // Function to handle category change
    const handleCategoryChange = (e) => {
        setCategory(e.target.value); // Update the selected category
        setCurrentPage(1); // Reset to the first page when category changes
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="md:text-5xl text-2xl my-16">All Products</h1>
            {/* Category Filter Dropdown */}
            <div className="mb-8">
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
            <div className="grid lg:gap-10 md:gap-6 gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 mb-16">
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