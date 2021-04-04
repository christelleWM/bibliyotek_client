import {Suspense,lazy} from 'react'
import { ToastContainer } from 'react-toastify'
import {AdminRoute,UserRoute} from './services/AuthService'
import {LoadingOutlined} from '@ant-design/icons'
import {Layout} from 'antd'
import {Switch,Route} from 'react-router-dom' 

const DefaultHeader=lazy(()=>import('./components/nav/DefaultHeader'))
const HomePage=lazy(()=>import('./components/pages/Home/HomePage'))
const Register=lazy(()=>import( './components/pages/auth/Register'))
const RegisterComplete=lazy(()=>import('./components/pages/auth/RegisterComplete'))
const Login =lazy(()=>import('./components/pages/auth/Login'))
const ForgotPassword=lazy(()=>import( './components/pages/auth/ForgotPassword'))
const ToolsUser=lazy(()=>import( './components/pages/user'))
const ToolsAdmin=lazy(()=>import( './components/pages/admin'))
const GenreOperations=lazy(()=>import('./components/pages/admin/genre/GenreOperations'))
const LivreCard=lazy(()=>import('./components/pages/admin/livre/LivreCard'))
const LivreTable=lazy(()=>import('./components/pages/admin/livre/LivreTable'))
const LivreCreate=lazy(()=>import('./components/pages/admin/livre/LivreCreate'))
const LivreUpdate=lazy(()=>import('./components/pages/admin/livre/LivreUpdate'))
const Password=lazy(()=>import('./components/pages/user/Password'))
const SuggestionOp=lazy(()=>import('./components/pages/user/suggestion/SuggestionOp'))
const SuggestionTable=lazy(()=>import('./components/pages/user/suggestion/SuggestionTable'))
const Livre=lazy(()=>import('./components/pages/Home/Livre'))
const PretTable=lazy(()=>import('./components/pages/admin/pret/PretTable'))
const PretCreate=lazy(()=>import('./components/pages/admin/pret/PretCreate'))
const PretListTable=lazy(()=>import('./components/pages/admin/pret//list/PretListTable'))


const {Header} = Layout

const App =()=> {
  return (
   <> 

    <Suspense fallback={<div className="col text-center p-5"><LoadingOutlined/></div>}>
      <ToastContainer/>
      <Header style={{ padding:0,position: 'fixed', zIndex: 1, width: '100%',backgroundColor:'white' }}>
        <DefaultHeader/>
      </Header>
      
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/livre/:slug" component={Livre} />
          <AdminRoute exact path="/admin" component={HomePage} />
          <UserRoute exact path="/user" component={HomePage} />
          
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <UserRoute exact path="/user/tools" component={ToolsUser}/>
          <UserRoute exact path="/user/password" component={Password}/>
          <UserRoute exact path="/user/tools/nouvelle-suggestion" component={SuggestionOp}/>
          <UserRoute exact path="/user/tools/list-suggestion" component={SuggestionTable}/>
          <AdminRoute exact path="/admin/tools" component={ToolsAdmin}/>
          <AdminRoute exact path="/admin/tools/genres-interface" component={GenreOperations}/>
          <AdminRoute exact path="/admin/tools/livres-card-interface" component={LivreCard}/>
          <AdminRoute exact path="/admin/tools/livres-card-interface/livre" component={LivreCreate}/>
          <AdminRoute exact path="/admin/tools/livres-table-interface/livre" component={LivreCreate}/>
          <AdminRoute exact path="/admin/tools/livres-table-interface/livre/:slug" component={LivreUpdate}/>
          <AdminRoute exact path="/admin/tools/livres-card-interface/livre/:slug" component={LivreUpdate}/>
          <AdminRoute exact path="/admin/tools/livres-table-interface" component={LivreTable}/> 
          <AdminRoute exact path="/admin/tools/nouveau-pret" component={PretTable}/> 
          <AdminRoute exact path="/admin/tools/nouveau-pret/:slug" component={PretCreate}/>
          <AdminRoute exact path="/admin/tools/list-pret" component={PretListTable}/>
        </Switch>
     
   
      </Suspense>
   </>
  );
}

export default App;
