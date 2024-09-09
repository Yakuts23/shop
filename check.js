import React, { useState } from 'react';
import { submitOrder } from '../services/orderService';

const Checkout = ({ cartItems, completeOrder }) => {
    const [customerDetails, setCustomerDetails] = useState({ name: '', address: '', email: '' });
    const [loading, set]
