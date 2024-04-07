import { useState } from 'react';

export default function Dashboard() {
    const [productsSelected, setProductsSelected] = useState(true);
    return (
        <div className={`w-screen`}>
            <div className={`w-full`}>
                <div className={`w-3/6 py-1 px-3`}>My Store</div>
                <div className={`w-3/6 py-1 px-3`}>My Orders</div>
            </div>
        </div>
    )
}