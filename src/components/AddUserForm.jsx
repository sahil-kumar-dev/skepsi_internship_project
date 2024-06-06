import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../slice/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        id: Date.now(),
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            suite: '',
            zipcode: ''
        }
    });

    const dispatch = useDispatch();

    const navigate = useNavigate()

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.address){
            toast.error('All fields are mandatory')
            return
        }

        dispatch(addUser(formData));

        toast.success('User added successfully')

        setFormData({
            id: Date.now(),
            name: '',
            email: '',
            address: {
                street: '',
                city: '',
                suite: '',
                zipcode: ''
            }
        }); // Reset form after submission

        navigate('/')
    };

    return (
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@domain.com"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="mb-5">
                                <label htmlFor="address.street" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Street
                                </label>
                                <input
                                    type="text"
                                    name="address.street"
                                    id="street"
                                    onChange={handleChange}
                                    value={formData.address.street}
                                    placeholder="Street"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="address.city" className="mb-3 block text-base font-medium text-[#07074D]">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="address.city"
                                    id="city"
                                    onChange={handleChange}
                                    value={formData.address.city}
                                    placeholder="City"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="address.suite" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Suite
                                </label>
                                <input
                                    type="text"
                                    name="address.suite"
                                    id="suite"
                                    onChange={handleChange}
                                    value={formData.address.suite}
                                    placeholder="Suite"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="address.zipcode" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Zipcode
                                </label>
                                <input
                                    type="text"
                                    name="address.zipcode"
                                    id="zipcode"
                                    onChange={handleChange}
                                    value={formData.address.zipcode}
                                    placeholder="Zipcode"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUserForm