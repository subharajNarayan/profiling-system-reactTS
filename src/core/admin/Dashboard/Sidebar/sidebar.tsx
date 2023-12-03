import React from 'react';
import { HomeIcon, Dashboard, Form, List, AboutIcon, Pagination, Checkbox, Carousel, Nepal_Prov, District, Municipality } from '../../../../assets/images/xd';
import { Link, NavLink } from 'react-router-dom';
import { UncontrolledCollapse } from 'reactstrap';
import topLogo from '../../../../assets/images/Profiling.png';

interface Props {
  sidebarToggle: boolean;
  setsidebarToggle: (state: boolean) => void;
}

const AppSidebar = (props: Props) => {

  const { sidebarToggle, setsidebarToggle } = props;
  const togglesidebar = () => setsidebarToggle(!sidebarToggle);

  // const [ arrow, setArrow ] = React.useState(false);

  const SidebarItem = [
    {
      name: "munici",
      title: "गा.वि.स/ न.पा",
      link:"",
      children: [
        {
          name: "Organization",
          title: "संघ संस्था",
          link: "/organization",
        },
        {
          name: "Infrastructure",
          title: "भौतिक पूर्वाधार",
          link: "/infrastructure"
        },
        {
          name: "Drinking",
          title: "खानेपानी",
          link: "/drinking"
        },
        {
          name: "Irrigation",
          title: "सिचाई",
          link: "/irrigation"
        },
        {
          name: "Forest",
          title: "वन सम्पदा",
          link: "/forest"
        },
        {
          name: "Environment-Disaster",
          title: "प्रकोप",
          link: "/environment-disaster"
        },
        {
          name: "Income Statement",
          title: "आय विवरण",
          link: "/income-statement"
        },
        {
          name: "School",
          title: "विद्यालय",
          link: "/school"
        },
        {
          name: "Industrial Description",
          title: "औधोगिग विवरण",
          link: "/industry"
        },
        {
          name: "Political Party",
          title: "राजनैतिक दल",
          link: "/politics"
        },
        {
          name: "Important Place",
          title: "महत्वपूर्ण स्थान",
          link: "/place"
        },
        {
          name: "Export Source",
          title: "निकासीजन्य स्रोत",
          link: "/export"
        },
        {
          name: "Water Source",
          title: "जलस्रोत",
          link: "water"
        },
      ]
    },
    // {
    //   name: "basti",
    //   title: "वस्ती / टोल ",
    //   link: "/admin/about"
    // },
    {
      name: "Components",
      title: "प्रशासनिया कार्यहरु",
      link: "",
      icon: Dashboard,
      children: [
        {
          name: "राज्य",
          title: "राज्य",
          link: "/state",
          icon: Nepal_Prov 
        },
        {
          name: "जिल्ला",
          title: "जिल्ला",
          link: "/district",
          icon: District 
        },
        {
          name: "नगरपालिका",
          title: "नगरपालिका",
          link: "/municipality",
          icon: Municipality
        },
        {
          name: "वडा",
          title: "वडा",
          link: "/ward",
          icon: Municipality
        }
      ]
    },
  
  ]

  const checkParentActive = (item:any) => {
    var active = false;

    item.children.forEach((child:any) => {
      if (window.location.href.indexOf(child.link) > -1) {
        active = true;
      }
    });
    return active;
  };


  return (

    <aside className="sidebar">
      <div className="pt-2">
        <div className='sidebar-header-top align-vertical px-3'>
          <div>
            {/* <h6 className='sidebar-text text-center text-uppercase font-bold'>Dashboard</h6> */}
            <img src={topLogo} alt="" width="50" />
          </div>
          <div role='button' className="toggler-close" onClick={togglesidebar}>
            <i className='ic-close'></i>
          </div>
        </div>
      </div>
      <ul className="list list-sidebar">
        {SidebarItem.map((item) => {
          if (item.children) {
            return (
              <React.Fragment key={item.name}>
                <li>
                  <Link
                    id={item.name}
                    to="#"
                    className={checkParentActive(item) ? "active" : ""}
                  >
                    {/* <img src={item.icon} alt="" className="menu_icon" /> */}
                    {item.title}
                  </Link>
                </li>
                <li key={item.name}>
                  <UncontrolledCollapse
                    toggler={`#${item.name}`}
                    className="ml-3 mr-1 menu__collapsable-sub collapse"
                  >
                    {item.children.map((subitem) => (
                      <Link
                        to={subitem.link}
                        className={`${window.location.href?.includes(subitem.link) ? "active" : ""
                          }`}
                      >
                        {/* <img src={subitem.icon} alt="" className="menu_icon" />  */}
                        {subitem.title}
                      </Link>
                    ))}
                  </UncontrolledCollapse>
                </li>
              </React.Fragment>
            );
          } else {
            return (
              <li key={item.name}>
                <NavLink
                  to={item.link}
                  className={`${window.location.href?.includes(item.link) ? "active" : ""}`}
                  // activeClassName={`${window.location.href?.includes(item.link) ? "active" : ""}`}
                >
                  {/* <img src={item.icon} alt="" className="menu_icons" />  */}
                  {item.title}
                </NavLink>
              </li>
            );
          }
        })}
      </ul>
    </aside>
  )
}

export default AppSidebar;
