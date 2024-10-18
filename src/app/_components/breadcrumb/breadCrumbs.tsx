"use client"; 

import { Breadcrumb } from "antd";
import { useBreadcrumbPath } from "./useBreadcrumbPath";

const Breadcrumbs = () => {
    const breadcrumb = useBreadcrumbPath();

    return (
        <Breadcrumb style={{ marginBottom: '1rem' }}>
            {breadcrumb.map((route, index) => (
                <Breadcrumb.Item key={index}>
                    <a href={`/${route}`}>{route}</a> 
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
