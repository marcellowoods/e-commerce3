import React from "react";

const DeliveryMethod = ({ name, options, selected, setSelected }) => {

    const onChangeValue = (event) => {

        const idSelected = event.target.value;
        console.log(idSelected);
        if (idSelected) {
            setSelected(options.find(({ id }) => idSelected === id));
        }

    }

    const renderMethod = (name, id) => {
        return (
            <button key={id} value={id} onClick={onChangeValue} className="mt-6 cursor-pointer flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none">
                <label className="flex items-center">
                    <input
                        checked={selected ? selected.id === id : false}
                        type="radio"
                        value={id}
                        className="form-radio cursor-pointer  h-5 w-5 text-blue-600"
                        onChange={onChangeValue}
                    />
                    <span className="ml-2 cursor-pointer text-sm text-gray-700">{name}</span>
                </label>

                {/* <span className="text-gray-600 text-sm">$26</span> */}
            </button>
        )
    }

    return (
        <div>
            <h4 className="text-sm text-gray-500 font-medium">{name}</h4>
            <div className="mt-6">
                {options.map(({ name, id }) => renderMethod(name, id))}
            </div>
        </div>
    )
}

const DeliveryDate = ({ deliveryDate, setDeliveryDate }) => {

    const onChangeValue = (event) => {
        const d = event.target.value;
        setDeliveryDate(d)
    }

    return (
        <div className="mt-8">
            <h4 className="text-sm text-gray-500 font-medium">Date</h4>
            <div className="mt-6 flex">
                <label className="block flex-1">
                    <input
                        onChange={onChangeValue}
                        value={deliveryDate}
                        type="date"
                        className="form-input mt-1 block w-full text-gray-700"
                        placeholder="Date" />
                </label>
            </div>
        </div>
    )
}

const DeliveryAdress = ({ name, deliveryAdress, setDeliveryAddress }) => {

    const handleAdressChange = (event) => {
        const value = event.target.value;
        setDeliveryAddress((prev) => {
            return { ...prev, address: value }
        })
    }

    const handleCityChange = (event) => {
        const value = event.target.value;
        setDeliveryAddress((prev) => {
            return { ...prev, city: value }
        })
    }

    return (
        <div className="mt-8">
            <h4 className="text-sm text-gray-500 font-medium">{name}</h4>
            <div className="mt-4 flex">
                <label className="block w-3/12">
                    <input
                        onChange={handleCityChange}
                        value={deliveryAdress.city}
                        type="text"
                        placeholder="City"
                        className="form-select text-gray-700 mt-1 block w-full"
                    />
                </label>
                <label className="block flex-1 ml-3">
                    <input
                        onChange={handleAdressChange}
                        value={deliveryAdress.address}
                        type="text"
                        className="form-input mt-1 block w-full text-gray-700"
                        placeholder="Address"
                    />
                </label>
            </div>
        </div>
    )
}

const ContactInformation = ({ contactInformation, setContactInformation }) => {

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setContactInformation((prev) => {
            return { ...prev, email: value }
        })
    }

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setContactInformation((prev) => {
            return { ...prev, phone: value }
        })
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setContactInformation((prev) => {
            return { ...prev, name: value }
        })
    }

    return (
        <div className="mt-8">
            <h4 className="text-sm text-gray-500 font-medium">Contact information</h4>
            <label className="mt-4 block w-3/12">
                <input
                    onChange={handleNameChange}
                    value={contactInformation.name}
                    type="text"
                    placeholder="name"
                    className="form-select text-gray-700 mt-1 block w-full"
                />
            </label>
            <div className="mt-3 flex">
                <label className="block w-3/12">
                    <input
                        onChange={handlePhoneChange}
                        value={contactInformation.phone}
                        type="tel"
                        placeholder="phone"
                        className="form-select text-gray-700 mt-1 block w-full"
                    />
                </label>
                <label className="block flex-1 ml-3">
                    <input
                        onChange={handleEmailChange}
                        value={contactInformation.email}
                        type="email"
                        className="form-input mt-1 block w-full text-gray-700"
                        placeholder="email"
                    />
                </label>
            </div>

        </div>
    )
}

export {
    ContactInformation,
    DeliveryMethod,
    DeliveryDate,
    DeliveryAdress
}