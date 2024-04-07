import { useState } from 'react';
import { auth } from '../../auth/Authentication';

import ProductsAnalytics from '../components/ProductsAnalytics';
import OrderAnalytics from '../components/OrderAnalytics';

export default function Dashboard() {
    const [productsSelected, setProductsSelected] = useState(true);
    return (
        <div className={`w-screen px-5 py-10 h-screen bg-gray-200`}>
            <div className={`h-[9%]`}>
                <div className={`w-full flex flex-row items-center`}>
                    <h1 className={`text-4xl font-semibold mr-auto`}>Dashboard | {productsSelected ? `Product Analytics` : `Order Information`}</h1>
                    <div onClick={() => setProductsSelected(true)} className={`text-xl font-semibold mr-10 ${productsSelected && `underline underline-offset-4`} cursor-pointer hover:text-gray-500 transition-all duration-200 ease-in-out`}>My Store</div>
                    <div onClick={() => setProductsSelected(false)} className={`text-xl font-semibold mr-20 ${!productsSelected && `underline underline-offset-4`} cursor-pointer hover:text-gray-500 transition-all duration-200 ease-in-out`}>My Orders</div>
                </div>
                <hr className={`border-t-2 border-t-gray-600 rounded-full my-3`} />
            </div>
            {productsSelected ? <ProductsAnalytics /> : <OrderAnalytics />}
        </div>
    )
}