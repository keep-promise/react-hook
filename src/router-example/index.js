import { lazy, Suspense } from 'react';
import { 
  BrowserRouter, 
  Routes, Route, Outlet, 
  Link, useNavigate, useRoutes,
  useParams } from 'react-router-dom';

const Home = () => <div>Home</div>
const Main = () => <div>Main</div>
const Layout = () => {
  // navigate跳转
  const naviagte = useNavigate();
  const goHome = () => {
    naviagte('/home');
  }
  return(<>
    <div>Main</div>
    <div>
      <Link to="/home">link home</Link>
    </div>
    <div>
      <Link to="/b/1">link b</Link>
    </div>
    <div>
      <Link to="/c">link c</Link>
    </div>
    <button onClick={goHome}>go home</button>
    <Outlet/>
  </>);
}

const A = () => <div>A</div>
const B = () => {
  const params = useParams()
  return <div>B{params.id}</div>
}

// 懒加载
const C = lazy(() => import('./c.js'))


function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/c" element={<C />} />

      {/* 嵌套路由 */}
      <Route path="/" element={<Layout/>}>
        <Route index element={<A />} />
        <Route path="b/:id" element={<B />} />
      </Route>
    </Routes>
  </BrowserRouter>)
}



// 使用useRoutes，实现集中式路由管理
// import { useRoutes } from 'react-router-dom';


const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/a',
        element: <A />,
      },
      {
        path: '/b/:id',
        element: <B />,
      }
    ]
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/Main',
    element: <Main />,
  },
  {
    path: '/c',
    element: <C />,
  }
];

function App2() {
  return <BrowserRouter><RouteApp /></BrowserRouter>
}

function RouteApp() {
  return <Suspense fallback={<>LOADING</>}>
    {useRoutes(routes)}
  </Suspense>
}

export default App2