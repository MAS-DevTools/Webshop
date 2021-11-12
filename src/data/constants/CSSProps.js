const CSSProps = {
  /**ID's*/
 
  ID: {
    Home: "home",
    Dashboard:"dashboard",
    About:"about",
    Tasks:"tasks",
    Organisation:"organisation",
    Settings:"settings",
    Servivedesk:"servicedesk",
    Login:"login",
    Audio:"audio",
    Profile:"profile",
    Services:"services",
    Volume:"volume"
  },
  /**Classes */
  Style: {
    Dark: "dark",
    Light: "light",
    Alternative: "solar",
    App: "app ",
    Host:"host",
    Hostbody:"hostbody",
    BGWhite: "--bg-solar: white;",
    BGPrimary: "--bg-solar: var(--primary);",
    BGDark: "--bg-solar: #2a2e35;",
    ItemSelected: "border-bottom: 2px solid var(--primary);",
    None: "",
    NavDeselected:"color : var(--primary);",
    NavSelected:"color: var(--onselected-color);"
  },
  NavBar: {
    Bar: "navbar ",
    Navigation: "navbar-nav ",
    Item: "navbar-item ",
    Link: "nav-link ",
    Icon: "nav-icon ",
    Text: "navlink-text ",
    NameTag: "navbar-nav-nametag ",
  },
  CatogoryNavbar: {
    Bar: "catogorynavbar ",
    Navigation: "catogorynavbar-nav ",
    Item: "catogorynavbar-item ",
    Link: "catogorynav-link ",
    Icon: "catogorynav-icon ",
    Text: "catogorynavlink-text ",
    NameTag: "catogorynavbar-nav-nametag ",
  },
  SideBar: {
    Bar: "sidebar ",
    Navigation: "sidebar-nav ",
    Logo: "side-logo ",
    Link: "sidenav-link ",
    LinkText: "sidelink-text ",
    LogoText: "sidelogo-text ",
    Item: "sidenav-item ",
  },
  UserControl: {
    Bar: "usercontrol ",
    Navigation: "usercontrol-nav ",
    Item: "usercontrol-item ",
    Link: "usercontrol-link ",
    Icon: "usercontrol-icon ",
    Text: "usercontrollink-text ",
    hasDropdown: "has-dropdown ",
    Dropdown: "dropdown ",
    DropdownItem: "dropdown-item ",
    DropdownText: "dropdown-text ",
    NameTag: "usercontrol-nav-nametag ",
    VolumeOn:"volumeOn",
    VolumeOff:"volumeOff"
  },
  Header: {
    Area: "main-header ",
    Logo: "header-logo ",
  },
  Article:{
    Area:"article ",
    Figure:"article-figure",
    Image:"article-image",
    Body:"article-body",
    Title:"article-title",
    Content:"article-content",
    Info:"article-info",
    FloatL:"floatL",
    FloatR:"floatR",
    BtnAddToCart:"btnAddToCart",
    Disabled:"disabled"

  },
  Counter:{
    Area:"counter",
    Button:"btn",
    Count:"count",
    Price:"price",
    Sum:"sum",
    ContainerL:"containerL",
    ContainerR:"containerR",
    Label:"label",
    LabelResult:"labelResult",
    CenterText:"centerText"
  },
  Footer:{
    Area:"footer"
  },
  Body:{
    Spinner:"spinner",
    BarLoader:"BarLoader",
    ErrorMessage:"errorMessage",
    Pages:{
      Home:{
        Columns:"columns",
        Column:"column",
        Cell:"cell"
      },
      About:{
        Area:"about"
      }
    }
  },
  Warning:{
    Red:"red",
    Orange:"orange",
    Green:"green"
  }
};

export default CSSProps;
