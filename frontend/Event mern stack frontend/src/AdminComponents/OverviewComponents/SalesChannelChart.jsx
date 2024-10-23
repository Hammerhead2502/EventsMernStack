import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { useEffect, useState } from "react";
import {getAllEvents} from "../../lib/action/action"
import { useDispatch, useSelector } from "react-redux";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const SalesChannelChart = () => {
	const dispatch = useDispatch()
	const data = useSelector((state) => state.event?.data?.data?.data)
	  const [categoryData, setCategoryData] = useState([])
	useEffect(() => {
		dispatch(getAllEvents())
	},[])
	useEffect(() => {
		if(data){
			setCategoryData(data.filter(
				(value, index, self) =>
				  index ===
				  self.findIndex((t) => t["category"] === value["category"])
			  ).map((event) => {
				return {name: event.category, value: Math.floor(Math.random() * (60000 - 20000 + 1)) + 20000}
			  }))
		}
	}, [data])
	return (
		<motion.div
			className='bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-800'>Sales by Categories</h2>

			{categoryData && categoryData.length ? <div className='h-80'>
				<ResponsiveContainer>
					<BarChart data={categoryData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey={"value"} fill='#8884d8'>
							{categoryData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>: <></>}
		</motion.div>
	);
};
export default SalesChannelChart;