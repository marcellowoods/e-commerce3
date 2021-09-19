import React from "react";
import { Menu } from "antd";
import { DownSquareOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import {MinmaxSliderSubmenu, OptionsSubMenu} from "./FilterSubMenus";

const { SubMenu, ItemGroup } = Menu;


const renderFilterSub = (loading, filters, filter, selectedFilters, setSelectedFilters) => {

    let { _id: filterId, values: filterValues, type: filterType } = filter;

    let filterName = filter.name;
    if(!filterName){
        filterName = filterId;
    }


    let isFilterSelected = (filterId) => {
        return (filterId in selectedFilters)
    }

    let renderCloseIcon = () => {

        if(loading){
            const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
            return (
                <div className="float-right">
                     <Spin indicator={antIcon} />
                </div>
            )
        }

        if (isFilterSelected(filterId)) {
            return (
                <div className="float-right">
                    Clear {"  "}
                    <CloseCircleOutlined />
                </div>
            )
        }
        return <></>
    }

    let getValidSelectedFilters = (selected) => {
        //returns only selected filters which exist
        //useful for clearing selected filters before setting them

        let newSelectedFilters = {...selected};

        for(let selectedFilterName in newSelectedFilters){
            let filterObj = filters.find(element => element._id == selectedFilterName);
            if(filterObj == undefined){
                delete newSelectedFilters[selectedFilterName];
            }else{
                if(filterObj.type == "minmax"){
                    continue;
                }
                let newValues = [];
                let values = newSelectedFilters[selectedFilterName];
                for(let value of values){
                    let valueExists = filterObj.values.some(v => v._id == value);
                    if(valueExists){
                        newValues.push(value);
                    }
                }
                newSelectedFilters[selectedFilterName] = newValues;

            }
        }

        return newSelectedFilters;
    }

    let returnSubMenu = (type) => {

        switch (type) {
            case "options":
                return (<OptionsSubMenu 
                    filter={filter}
                    getValidSelectedFilters={getValidSelectedFilters}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters} />)
            case "minmax":
                return (<MinmaxSliderSubmenu
                    filter={filter} 
                    getValidSelectedFilters={getValidSelectedFilters}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters} />)
        }
    }

    return (
        < SubMenu
            key={filterId.toString()}
            title={
                <div>
                    <span className="h6" >
                        <DownSquareOutlined /> {filterName}
                    </span >
                    {renderCloseIcon()}
                </div>
            }
        >
            <div style={{ maringTop: "-10px" }}>
                {returnSubMenu(filterType)}
            </div>
        </SubMenu >)

}

export default renderFilterSub;