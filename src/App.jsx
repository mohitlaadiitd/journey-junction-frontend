import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.css';
import SubmitForm from './components/form.jsx';

const { Header, Content, Footer } = Layout;
 
function App() {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
    return (
        <div className="App">
            <Layout className="layout" style={{ background: '#f5f5f5', minHeight:'100vh'}}>
                <Header>
                    <h2 style={{color: 'white', margin: '0'}}>Journey Junction</h2>
                </Header>
                <Content style={{ padding: '30px' }}>
                    <div  style={{ background: colorBgContainer, padding: '20px'}}>
                        <SubmitForm></SubmitForm>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center'}}>Mohit Laad ©2023</Footer>
            </Layout>
        </div>
  );
}

export default App;
