const Dashboard = ({ children }) => {
  return (
    <div>
      <Sidebar />
      { children }
    </div>
  )
}

const Sidebar = () => {
  return (
    <ul>
    </ul>
  )
}

export default Dashboard
