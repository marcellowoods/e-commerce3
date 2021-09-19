import React, { useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { Modal, Button } from 'antd';

const Order = ({ setOrderToUpdate, order }) => {

    const showOrderInTable = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td>
                            <b>{p.product.title}</b>
                        </td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>
                            {p.product.shipping === "Yes" ? (
                                <CheckCircleOutlined style={{ color: "green" }} />
                            ) : (
                                <CloseCircleOutlined style={{ color: "red" }} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    let handleUpdateClick = () => {
        setOrderToUpdate(order);
    }

    return (<div key={order._id} className="row pb-5">
        <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={true} />
            <Button type="primary" onClick={handleUpdateClick}>
                Update Status
            </Button>
        </div>
        {showOrderInTable(order)}
    </div>)

}

const Orders = ({ orders, handleStatusChange }) => {

    // const [isModalVisible, setIsModalVisible] = useState(false);

    const [orderToUpdate, setOrderToUpdate] = useState(null);
    const [newStatusValue, setNewStatusValue] = useState(null);

    const handleOk = () => {
        if(newStatusValue && (orderToUpdate.orderStatus !== newStatusValue) ){
            handleStatusChange(orderToUpdate._id, newStatusValue)
        }
        
        setOrderToUpdate(null);
    };

    const handleCancel = () => {
        setOrderToUpdate(null);
        setNewStatusValue(null);
    };

    return (<>
        {orderToUpdate && <Modal title="Basic Modal" visible={orderToUpdate !== null} onOk={handleOk} onCancel={handleCancel}>
            <div className="row">
                <div className="col-md-2">Delivery Status</div>
                <div className="col-md-4">
                    <select
                        onChange={(e) => setNewStatusValue(e.target.value)}
                        className="form-control"
                        defaultValue={orderToUpdate.orderStatus}
                        name="status"
                    >
                        <option value="Not Processed">Not Processed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                    </select>


                </div>

            </div>
        </Modal>}
        {orders.map((order) => (
            <Order key={order._id} order={order} setOrderToUpdate={setOrderToUpdate} />
        ))}
    </>)
};

export default Orders;
