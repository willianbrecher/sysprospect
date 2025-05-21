import type { MenuItem } from "primereact/menuitem";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLeadListActions = () => {
  const [selected, setSelected] = useState<any>([]);
  const navigate = useNavigate();

  const handleDetailAction = (id: string) => {
    navigate(`./detail/${id}`);
  };

  const handleEditAction = (id: string) => {
    navigate(`./edit/${id}`);
  };

  const listActions = useMemo(() => {
    const actions: MenuItem[] = [];

    if (selected.value) {
      actions.push({
        label: "View",
        icon: "pi pi-folder-open",
        command: () => handleDetailAction(selected.value.id),
      } as MenuItem);

      actions.push({
        label: "Edit",
        icon: "pi pi-file-edit",
        command: () => handleEditAction(selected.value.id),
      } as MenuItem);
    }

    return actions;
  }, [selected]);

  return {
    actions: listActions,
    selection: {
      selected: selected.value,
      setSelected,
    },
  };
};

export default useLeadListActions;
