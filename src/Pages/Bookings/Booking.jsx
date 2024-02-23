const Booking = ({ booking, handleDelete, handleConfirmButton }) => {

    const { _id, img, service, email, price,status } = booking;

    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={img} />
                        </div>
                    </div>
                </div>
            </td>
            <td>{service}</td>
            <td>{email}</td>
            <td>{price}</td>
            <th>
                {
                    status === 'confirm' ? <span className="text-bold text-primary">Confirmed</span> :
                    <button onClick={()=>handleConfirmButton(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>}
            </th>
        </tr>
    );
};

export default Booking;