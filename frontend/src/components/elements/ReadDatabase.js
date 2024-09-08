import React, { useContext, useEffect } from "react";
import { useReadSales } from "../hooks/useReadSales";

const ReadDatabase = (props) => {
    const { year, handleDataChange } = props;
    const { onClickReadSales } = useReadSales();
    
    useEffect(() => {
        if (year === "") {
            return;
        }
        const promise = onClickReadSales(year);
        
        promise.then((datas) => {
            if (datas.length > 0) {
                let keys = ["department", "year", "sales"];
                let result = keys.map(key => [key, ...datas.map(data => data[key])]);
                console.log(result);
                handleDataChange(result);
            } else {
                console.log("データがありません");
                handleDataChange([]);
            }
        });
    }, [year]);
    
    return <div></div>;
};

export default ReadDatabase;
