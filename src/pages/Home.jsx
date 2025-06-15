import React, { useContext } from "react";
import { icons } from "../assets/itemIcons";
import { CartContext } from "../context/CartContext";
import { categories } from "../components/ProductList";

const Home = () => {
	const { addToCart, getItemQuantity, removeFromCart, setQuantity } =
		useContext(CartContext);
	return (
		<div className="max-w-6xl mx-auto py-8 px-4">
			<h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-8 drop-shadow-lg">
				Famous Items
			</h1>
			{categories.map((cat) => (
				<section key={cat.name} className="mb-10">
					<h2 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-yellow-400 pl-3">
						{cat.name}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{cat.products.map((product) => {
							const quantity = getItemQuantity(product.id);
							return (
								<div
									key={product.id}
									className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200 border border-indigo-100"
								>
									<div className="mb-3">{icons[product.name]}</div>
									<h3 className="font-bold text-lg text-blue-800 mb-1">
										{product.name}
									</h3>
									<p className="text-gray-600 mb-2">
										${product.price.toFixed(2)}
									</p>
									<div className="flex flex-col items-center gap-2 w-full">
										<button
											className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-indigo-600 transition-colors duration-200 w-full"
											onClick={() => addToCart(product, 1)}
										>
											Add to Cart
										</button>
										{quantity > 0 && (
											<div className="flex items-center gap-2 mt-2">
												<button
													className="bg-red-100 text-red-600 rounded-full px-2 py-1 font-bold hover:bg-red-200"
													onClick={() => removeFromCart(product, 1)}
												>
													-
												</button>
												<input
													type="number"
													min="1"
													value={quantity}
													onChange={(e) =>
														setQuantity(
															product,
															Number(e.target.value)
														)
													}
													className="w-14 text-center border rounded px-1 py-0.5"
												/>
												<button
													className="bg-green-100 text-green-700 rounded-full px-2 py-1 font-bold hover:bg-green-200"
													onClick={() => addToCart(product, 1)}
												>
													+
												</button>
												<button
													className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
													onClick={() => setQuantity(product, 0)}
												>
													Remove
												</button>
												<span className="ml-2 text-sm text-green-600 font-semibold">
													In Cart: {quantity}
												</span>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</section>
			))}
		</div>
	);
};

export default Home;
