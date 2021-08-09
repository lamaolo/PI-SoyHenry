import FixedHeader from '../FixedHeader';

const Layout = ({ children }) => {
  return (
    <>
      <FixedHeader />
      {children}
    </>
  );
};

export default Layout;
