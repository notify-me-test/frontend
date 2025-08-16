import React, { useState } from 'react';
import styled from 'styled-components';
import ProductList from './components/ProductList';
import InventoryManager from './components/InventoryManager';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const Header = styled.header`
  background: #343a40;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#007bff' : 'transparent'};
  color: white;
  border: 1px solid ${props => props.active ? '#007bff' : '#6c757d'};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.active ? '#0056b3' : '#495057'};
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

type ActiveTab = 'products' | 'inventory';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'inventory':
        return <InventoryManager />;
      default:
        return <ProductList />;
    }
  };

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>E-commerce Admin</Logo>
          <Navigation>
            <NavButton 
              active={activeTab === 'products'}
              onClick={() => setActiveTab('products')}
            >
              Products
            </NavButton>
            <NavButton 
              active={activeTab === 'inventory'}
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </NavButton>
          </Navigation>
        </HeaderContent>
      </Header>
      
      <MainContent>
        {renderContent()}
      </MainContent>
    </AppContainer>
  );
}

export default App;
