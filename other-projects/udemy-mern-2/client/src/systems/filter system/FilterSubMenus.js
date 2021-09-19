import React, { useState, useEffect, useRef } from "react";
import { Slider, Checkbox } from "antd";


const OptionsSubMenu = ({filter, getValidSelectedFilters, selectedFilters, setSelectedFilters }) => {

    let { _id: filterId, values: filterValues } = filter;

    let isFilterSelected = (filterId) => {
        return (filterId in selectedFilters)
    }

    const handleCheck = (e) => {

        let selectedFilter = null;

        if(isFilterSelected(filterId)){
            selectedFilter = selectedFilters[filterId];
        }else{
            selectedFilter = [];
        }

        let inTheState = selectedFilter;
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);

        }

        setSelectedFilters(prevState => {
            let newSelectedFilters = getValidSelectedFilters(prevState);

            if(filterId in newSelectedFilters){
                delete newSelectedFilters[filterId];
            }
            
            if (inTheState.length == 0) {
                return newSelectedFilters;
            }

            return {...newSelectedFilters, [filterId]: inTheState};
        });
        // setCurrentPage(1);

    };

    let isFilterOptionChecked = (filterOption) => {

        if (isFilterSelected(filterId)) {
            let values = selectedFilters[filterId];
            return values.includes(filterOption);
        }
        return false;
    }

    let showOptions = () => {

        filterValues.sort(function (a, b) {

            var nameA = a._id.toString().toUpperCase(); // ignore upper and lowercase
            var nameB = b._id.toString().toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });

        return filterValues.map(v => {
            let { _id, count, name } = v;

            let showName = () => {
                return name ? name : _id;
            }

            return (
                <div key={_id}>
                    <Checkbox
                        onChange={handleCheck}
                        className="pb-2 pl-4 pr-4"
                        value={_id}
                        name={_id}
                        checked={isFilterOptionChecked(_id)}
                    >
                        {showName()} {" "} ({count})
                    </Checkbox>
                    <br />
                </div>
            )
        })

    }

    return (
        <>
            {showOptions()}
        </>
    )

}

const MinmaxSliderSubmenu = ({filter, getValidSelectedFilters, selectedFilters, setSelectedFilters }) => {

    let { _id: filterId, values: filterValues } = filter;

    let initialValue = selectedFilters[filter.name] || filterValues;
    const [localValue, setLocalValue] = useState(initialValue);

    let constrain = filterValues;

    let isFilterSelected = (filterId) => {
        return (filterId in selectedFilters)
    }

    useEffect(() => {
        let exists = isFilterSelected(filterId);
        if (!exists) {
            setLocalValue(constrain)
        }

    }, [filter])

    const handleOnMouseRelease = (changedValue) => {

        setSelectedFilters(prevState => {

            let newSelectedFilters = getValidSelectedFilters(prevState);

            if (constrain[0] == changedValue[0] && constrain[1] == changedValue[1]) {
  
                delete newSelectedFilters[filterId];
                return newSelectedFilters
            }

            return {...newSelectedFilters, [filterId]: [...changedValue]};
        });
    }

    let a = constrain[0];
    let b = constrain[1];

    const marks = {
        [a]: `${a}$`,
        [b]: `${b}$`
    };


    return (

        <Slider
            included={true}
            marks={marks}
            className="ml-4 mr-4"
            tipFormatter={(v) => `$${v}`}
            range
            value={localValue}
            onAfterChange={handleOnMouseRelease}
            onChange={(v) => setLocalValue(v)}
            min={a}
            max={b}
        />
    )

}

export {MinmaxSliderSubmenu, OptionsSubMenu};