import {
  Sidebar as SaasSidebar,
  SidebarSection,
  NavItem,
} from "@saas-ui/sidebar";

const Sidebar = () => (
  <SaasSidebar h="100%">
    <SidebarSection>
      <NavItem href="https://gai.gg">generaitiv.xyz</NavItem>
      <NavItem href="https://github.com/Generaitiv/api-docs">
        docs
      </NavItem>
    </SidebarSection>
  </SaasSidebar>
);

export default Sidebar;
