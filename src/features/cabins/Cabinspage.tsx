import { CabinsTable } from "./CabinsTable";
import { Header } from "../../ui/Header";
import SubMain from "../../ui/SubMain";

export default function CabinsPage() {
  return (
    <>
      <Header
        title="Cabins"
        description="Manage and track your hotel's cabin inventory and pricing"
      />
      <SubMain>
        <CabinsTable />
      </SubMain>
    </>
  );
}
