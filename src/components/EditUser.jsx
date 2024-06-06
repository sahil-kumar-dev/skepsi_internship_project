import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../slice/userSlice'
import { toast } from 'react-toastify'

const EditUser = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const users = useSelector(state => state.user.users)

    // Find the selected user based on the id from the URL params
    const selectedUser = users.find((ele) => ele.id === parseInt(id))

    // Initialize form data with selected user's details or empty strings
    const [formData, setFormData] = useState({
        id: selectedUser?.id || '',
        name: selectedUser?.name || '',
        email: selectedUser?.email || '',
        address: {
            street: selectedUser?.address.street || '',
            city: selectedUser?.address.city || '',
            suite: selectedUser?.address.suite || '',
            zipcode: selectedUser?.address.zipcode || ''
        }
    })

    // Update form data when the selected user changes
    useEffect(() => {
        if (selectedUser) {
            setFormData({
                id: selectedUser.id,
                name: selectedUser.name,
                email: selectedUser.email,
                address: {
                    street: selectedUser.address.street,
                    city: selectedUser.address.city,
                    suite: selectedUser.address.suite,
                    zipcode: selectedUser.address.zipcode
                }
            })
        }
    }, [selectedUser])

    // Handle form input changes
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
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(formData))
        navigate('/')
        toast.success("User details edited")
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            placeholder="Full Name"
                            value={formData.name}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="example@domain.com"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="mb-5">
                            <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
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
                            <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
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
                            <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
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
                            <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
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
                        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser
