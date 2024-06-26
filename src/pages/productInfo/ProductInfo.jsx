import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);

    const { id } = useParams();

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProductData = async () => {
            setLoading(true);
            try {
                const productTemp = await getDoc(doc(fireDB, "products", id));
                if (productTemp.exists()) {
                    setProduct({ ...productTemp.data(), id: productTemp.id });
                } else {
                    toast.error("Product not found");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        getProductData();
    }, [id, setLoading]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill={i <= rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 mr-1 text-yellow-500 bi bi-star"
                    viewBox="0 0 16 16"
                    onClick={() => handleRatingChange(i)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 1.375l1.375 3.281h3.594L10.719 7.5l1.25 3.219H9.375L8 12.625 6.625 10.72H2.781l1.25-3.219L1.312 4.656h3.594zm0 0"
                    />
                </svg>
            );
        }
        return stars;
    };

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    product && (
                        <div className="max-w-6xl px-4 mx-auto">
                            <div className="flex flex-wrap mb-24 -mx-4">
                                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                    <img
                                        className="w-full lg:h-[39em] rounded-lg"
                                        src={product.productImageUrl}
                                        alt={product.title}
                                    />
                                </div>
                                <div className="w-full px-4 md:w-1/2">
                                    <div className="lg:pl-20">
                                        <div className="mb-6">
                                            <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                                {product.title}
                                            </h2>
                                            <div className="flex items-center mb-2">
                                                {renderStars()}
                                            </div>
                                            <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                                ₹ {product.price}
                                            </p>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                                Description:
                                            </h2>
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center mb-6">
                                            {cartItems.some((p) => p.id === product.id) ? (
                                                <button
                                                    onClick={() => deleteCart(product)}
                                                    className="w-full px-4 py-3 text-center text-white bg-red-500 border border-red-600 hover:bg-red-600 hover:text-gray-100 rounded-xl"
                                                >
                                                    Delete from cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addCart(product)}
                                                    className="w-full px-4 py-3 text-center text-black-600 bg-yellow-500 border border-yellow-600 hover:bg-yellow-600 hover:text-black-100 rounded-xl"
                                                >
                                                    Add to cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
