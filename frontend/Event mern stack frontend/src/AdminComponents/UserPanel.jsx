import Header from './Header'
import {motion} from "framer-motion"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {getUserOrders } from "../lib/action/action"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const UserPanel = () => {
    const dispatch = useDispatch()
    const orderData = useSelector((state) => state?.order?.data?.data?.data)
    const [userOrders, setUserOrders] = React.useState([])
    const [cookie] = useCookies(["token", "userdata"])
    const [allUsers, setAllUsers]=React.useState([])
    const fetchAllUsers = async () => {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getUsers`, { headers: { Authorization: cookie?.token } }).then((res) => {
            if(res?.status == 200){
                setAllUsers(res?.data?.data?.filter((user) => user?.role != "admin"))
            }
        }).catch((err) => console.log(err))
    }
    const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    React.useEffect(() => {
        if(cookie?.token){
           fetchAllUsers()
        }
    },[])
    const activateAccount = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/updateUser`, {data : e.target.value, operation : e.target.name}, {headers: {Authorization: cookie?.token}}).then((res) => {if(res?.status == 200){
            window.location.reload();
        }}).catch((err) => {console.log(err)})
    }
    const deactivateAccount = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/updateUser`, {data : e.target.value, operation: e.target.name}, {headers: {Authorization: cookie?.token}}).then((res) => {if(res?.status == 200){
            window.location.reload();
        }}).catch((err) => {console.log(err)})
    }
    const getOrders = async(e) => {
        e.preventDefault()
        handleShow()
        dispatch(getUserOrders(e.target.value))
    }
    React.useEffect(() => {
        if(orderData){
            setUserOrders(orderData)
        }
    }, [orderData])
  return (
        <div className="flex-1 relative z-50 overflow-auto">
      <Header title='Users' />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div className='grid grid-cols-1 gap-5 mb-8'
          initial={{ scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            ease:"easeInOut",
            duration: 0.3
          }}
        >
      <TableContainer component={Paper} className="overflow-auto mt-10">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">User name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Account type</StyledTableCell>
            <StyledTableCell align="center">Activate/Deactivate</StyledTableCell>
            <StyledTableCell align="center">Orders</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers && allUsers.length ? allUsers.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.fname}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.role}</StyledTableCell>
              <StyledTableCell align="center">{row.acc_type}</StyledTableCell>
              <StyledTableCell align="center"><button className={`${row.status != 1 ? "bg-green-600" : "bg-gray-400 disabled"} p-2 text-white rounded-md`} value={row._id} name={"activate"} onClick={activateAccount}>Act</button> / <button className={`${row.status == 1 ? "bg-red-600" : "bg-gray-400 disabled"} p-2 text-white rounded-md`} value={row._id} name={"deactivate"} onClick={deactivateAccount}>DeAct</button></StyledTableCell>
              <StyledTableCell align="center"><button onClick={getOrders} className='p-2 bg-black text-white rounded-md' value={row._id}>Check Orders</button></StyledTableCell>
            </StyledTableRow>
          )): <></>}
        </TableBody>
      </Table>
    </TableContainer>


    {/* ORDER MODAL AND TABLE */}

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor="events" className='mb-2'>Order details :-</label>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Order ID</TableCell>
            <TableCell align="center">Payment ID</TableCell>
            <TableCell align="center">Event name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Seating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders && userOrders.length ? userOrders.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.orderID}
              </TableCell>
              <TableCell align="center">{row.paymentID}</TableCell>
              {row?.products.map((prod,index) => {
                return <>
                    <TableCell align="center" key={index}>{prod.event_name}</TableCell>
                    <TableCell align="center">{prod.date}</TableCell>
                    <TableCell align="center">{prod.time}</TableCell>
                    <TableCell align="center">{prod.city}</TableCell>
                    <TableCell align="center">{prod.quantity}</TableCell>
                    <TableCell align="center">{prod.seat.replace(/_/g, " ")}</TableCell>
                </>
              })}
            </TableRow>
          )): <p className='text-red-600 ml-2 mt-2'>No orders</p>}
        </TableBody>
      </Table>
    </TableContainer>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
      </main>
    </div>
  )
}

export default UserPanel