import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Home = () => {

    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/all_products`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }
        , [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="md:text-5xl text-2xl my-16">All Products</h1>
            <div className="grid lg:gap-10 md:gap-6 gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 mb-16">
                {
                    products.map(product => {
                        return (
                            <div key={product.productName} className="card bordered shadow-lg w-80">
                                <figure className="aspect-square">
                                    <img src={product.productImage} onError={(e) => { e.target.onerror = null; e.target.src = "https://i.ibb.co/t2gtXKw/noImg.png" }} referrerPolicy="no-referrer" alt="product" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.name}</h2>
                                    <p>{product.description}</p>
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
        </div>
    );
};

export default Home;