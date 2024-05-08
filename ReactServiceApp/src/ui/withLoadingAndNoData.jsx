import React from "react";
import Spinner from "./Spinner";

const withLoadingAndNoData = (WrappedComponent) => {
    return function WithLoadingAndNoData(props) {
        const { loading, data, ...rest } = props;


        if (loading) {
            return <Spinner />;
        }

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return (
                <p className=" text-[2.4rem] text-center ">
                    No data available.
                </p>
            );
        }

        return <WrappedComponent data={data} {...rest} />;
    };
};

export default withLoadingAndNoData;
