import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './components/Signup'
import DashboardHome from './components/DashboardHome'
import SellerSignup from './components/dashboardcomponents/SellerComponents/SellerSignup'
import Logout from './components/Logout'
import SellerLogin from './components/dashboardcomponents/SellerComponents/SellerLogin'
import SellerDashboard from './components/dashboardcomponents/SellerComponents/SellerDashboard'
import SellerAddProduct from './components/dashboardcomponents/SellerComponents/SellerAddProduct'
import CartDetails from './components/dashboardcomponents/UserComponents/CartDetails'
import CheckoutPage from './components/dashboardcomponents/UserComponents/Checkout'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<DashboardHome/>}/>
          <Route path="/seller/signup" element={<SellerSignup/>}/>
          <Route path="/seller/login" element={<SellerLogin/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/seller/dashboard" element={<SellerDashboard/>}/>
          <Route path="/seller/addproduct" element={<SellerAddProduct/>}/>
          <Route path="/cart" element={<CartDetails/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
