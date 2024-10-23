import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { FolderKanbanIcon, Menu, Ticket, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const OPTIONS = [{
    name: "Overview",
    icon: FolderKanbanIcon,
    color: "#6366f1",
    path: "overview",
},
{
    name: "Events",
    icon: Ticket,
    color: "#8B5CF6",
    path: "events",
},
{
	name: "Users",
    icon: User,
    color: "#EC4899",
    path: "users",
}
]
const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-white p-4 flex flex-col border-r border-gray-300'>
                <div className='grid grid-cols-2'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-1 rounded-full hover:bg-[#FAF9F6] transition-colors max-w-fit inline'
				>
					<Menu size={24} style={{ color: "black"}} />
				</motion.button>
                {isSidebarOpen && <motion.span initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }} transition={{ duration: 0.2, delay: 0.3 }} className='text-black font-semibold text-xl'>MDsider</motion.span> }
                </div>
				<nav className='mt-8 flex-grow border-t'>
					{OPTIONS.map((item,index) => (
						<Link key={index} to={item.path} className='no-underline text-black'>
							<motion.div className='flex items-center py-4 px-2 text-sm font-medium rounded-lg hover:bg-[#FAF9F6] transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
  )
}

export default SideBar