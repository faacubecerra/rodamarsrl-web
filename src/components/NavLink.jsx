import { NavLink as RouterNavLink } from 'react-router-dom';
import './NavLink.css';

function NavLink({ to, end, children, ...rest }) {
  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
      {...rest}
    >
      {children}
    </RouterNavLink>
  );
}

export default NavLink;
