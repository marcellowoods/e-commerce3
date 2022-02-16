import React from "react";
import { getLocaleDate } from './common'

import { useTranslation } from 'react-i18next';

const OrderRow = ({ orderId, orderDate, orderAddress, orderStatus, orderTotal, onDetailsClicked }) => {

    const { t, i18n } = useTranslation();

    return (
        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{t("order id")}</span>{orderId}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{t("created on")}</span>{orderDate}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{t("shipping address")}</span>{orderAddress}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{t("status")}</span>{t(orderStatus)}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{t("total")}</span>{orderTotal} {" "} {t("lv.")}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <button onClick={() => onDetailsClicked(orderId)} className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-1 px-2  rounded">
                    {t("details")}
                </button>
            </td>
        </tr>
    )
}


//https://tailwindcomponents.com/component/responsive-table-6
const OrdersTable = ({ onDetailsClicked, orders }) => {

    const { t, i18n } = useTranslation();

    let lang = i18n.language;

    return (

        <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">{t("order id")}</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">{t("created on")}</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">{t("shipping address")}</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">{t("status")}</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">{t("total")}</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                </tr>
            </thead>
            <tbody className="block md:table-row-group">
                {orders.map((order) => {
                    return (
                        <OrderRow
                            orderId={order._id}
                            orderDate={getLocaleDate(order.createdAt, lang)}
                            orderAddress={order.deliveryInfo.address}
                            orderStatus={order.orderStatus}
                            orderTotal={order.totalCost}
                            onDetailsClicked={onDetailsClicked}
                        />
                    )
                })}
            </tbody>
        </table>

    )

}

export default OrdersTable;
