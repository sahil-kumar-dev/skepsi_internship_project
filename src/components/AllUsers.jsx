import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../slice/userSlice'
import { toast } from 'react-toastify'

const AllUsers = () => {

    // Select users from the Redux store
    const users = useSelector(state => state.user.users)

    const dispatch = useDispatch()

    // Function to delete a user
    function deleteUser(id){
        toast.warning("User deleted successfully")
        dispatch(removeUser({id}))
    }


    return (
        <>
            {/* component */}
            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            SL no.
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            User
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            email
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            address
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,idx) => (
                            <tr key={user.id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-right md:text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        sl no.
                                    </span>
                                    {idx+1}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-right md:text-center border border-b block lg:table-cell relative lg:static">

                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        Company name
                                    </span>
                                    {user.name}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-right md:text-center block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        Country
                                    </span>
                                    {user.email}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-right md:text-center block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        Status
                                    </span>
                                    {`${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}`}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        Actions
                                    </span>
                                    <Link to={`/edituser/${user.id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>

    )
}

export default AllUsers