import { NavLink } from 'react-router-dom';
import navItems from '../../../../constant/navItems.json';
import style from '../../../../styles/style';

interface IProps {
  toggleMobileNav: () => void;
  mobile: boolean;
}

export default function Navbar({ mobile, toggleMobileNav }: IProps) {
  return (
    <div>
      {!mobile ? (
        <nav className={`${style.flex_normal} gap-8 font-medium`}>
          {navItems &&
            navItems?.map((nav) => (
              <NavLink
                to={nav.url}
                key={nav.title}
                className={({ isActive }) =>
                  isActive ? 'text-black' : 'text-white hover:text-gray-800 transition-all'
                }
              >
                {nav.title}
              </NavLink>
            ))}
        </nav>
      ) : (
        <nav className="space-y-5">
          {navItems &&
            navItems?.map((nav) => (
              <NavLink
                onClick={toggleMobileNav}
                to={nav.url}
                key={nav.title}
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#ff7d1a] block'
                    : 'text-black hover:text-gray-800 transition-all block'
                }
              >
                {nav.title}
              </NavLink>
            ))}
        </nav>
      )}
    </div>
  );
}
