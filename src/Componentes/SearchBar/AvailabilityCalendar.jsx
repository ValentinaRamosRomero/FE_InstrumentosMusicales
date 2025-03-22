import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./AvailabilityCalendar.css";
import calendarIcon from '../../assets/icons/calendar-icon.png';

const AvailabilityCalendar = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [bookedDateRanges, setBookedDateRanges] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "/products");
                
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchAvailability = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "/reservations");
                const reservations = response.data.data;
                
                const groupedReservations = {};
                reservations.forEach(reservation => {
                    if (!groupedReservations[reservation.productId]) {
                        groupedReservations[reservation.productId] = [];
                    }
                    groupedReservations[reservation.productId].push({
                        startDate: new Date(reservation.startDate),
                        endDate: new Date(reservation.endDate)
                    });
                });
                setBookedDateRanges(groupedReservations);
            } catch (error) {
                console.error('Error fetching availability:', error);
            }
        };

        fetchProducts();
        fetchAvailability();
    }, []);

    const isAvailable = (productId, start, end) => {
        if (!bookedDateRanges[productId]) return true;

        return !bookedDateRanges[productId].some(reservation =>
            (start >= reservation.startDate && start <= reservation.endDate) ||
            (end >= reservation.startDate && end <= reservation.endDate) ||
            (start <= reservation.startDate && end >= reservation.endDate)
        );
    };

    useEffect(() => {
        if (startDate && endDate) {
            const availableProducts = products.filter(product => isAvailable(product.id, startDate, endDate));
            setFilteredProducts(availableProducts);
        } else {
            setFilteredProducts(products);
        }
    }, [startDate, endDate, products]);

    const toggleCalendar = () => {
        setShowCalendar(prev => !prev);
    };

    return (
        <div className="availability-calendar">
            <div className="calendar-icon-container" onClick={toggleCalendar}>
                <img src={calendarIcon} alt="Calendario" className={`calendar-icon ${showCalendar ? 'rotated' : ''}`} />
            </div>
            {showCalendar && (
                <div className="calendar-popup" ref={calendarRef}>
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                    />
                </div>
            )}
            {/*<ul className="product-list">
                {filteredProducts.map(product => (
                    <li key={product.id} className="product-item">{product.name}</li>
                ))}
            </ul>*/}
        </div>
    );
};

export default AvailabilityCalendar;
