import React from "react";
import '../User/plan.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const Chart = ({ data, title, grid, dataKey }) => {
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="month" stroke="rgb(22 7 143)" />
                    <Line type="monotone" dataKey={dataKey} stroke="rgb(221 22 223 / 87%)"></Line>
                    <Tooltip />
                    <YAxis dataKey="Active User" stroke="rgb(22 7 143)" />
                    {grid && <CartesianGrid stroke="#e0dfdf" />}
                </LineChart>
            </ResponsiveContainer>
        </div>

    )
}

export default Chart