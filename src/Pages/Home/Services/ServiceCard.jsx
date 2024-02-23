import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {

    const { _id, title, img, price } = service;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10 h-full">
                <img src={img} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold">{title}</h2>
                <p className="text-orange-500 font-bold">Price: ${price}</p>
                <Link to={`checkout/${_id}`}>
                    <button className="btn btn-accent">Book Now</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;