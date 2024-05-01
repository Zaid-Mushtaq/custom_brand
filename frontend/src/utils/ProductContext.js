import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Load data from localStorage on component mount
    useEffect(() => {
        console.log('Fetching data from localStorage');
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
            console.log('Found stored product:', storedProduct);
            setSelectedProduct(JSON.parse(storedProduct));
        }
    }, []);

    // Save data to localStorage when selectedProduct changes
    useEffect(() => {
        console.log('Saving data to localStorage:', selectedProduct);
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    }, [selectedProduct]);

    return (
        <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
