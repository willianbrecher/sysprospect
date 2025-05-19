import type { MenuItem } from "primereact/menuitem";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


const useLeadListActions = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const handleDetailAction = (id: string) => {
    navigate(`./detail/${id}`);
  };

  const handleEditAction = (id: string) => {
    navigate(`./edit/${id}`);
  };

  const listActions = useMemo(() => {
    const actions: MenuItem[] = [];
    console.log(selected);
    if (selected.value?.length === 1) {
      actions.push({
        label: "View",
        icon: "pi pi-folder-open",
        command: () => handleDetailAction(selected.value[0].id),
      } as MenuItem);

      actions.push({
        label: "Edit",
        icon: "pi pi-file-edit",
        command: () => handleEditAction(selected.value[0].id),
      } as MenuItem);
    }

    if (selected.value?.length >= 1) {
     actions.push({
        label: "Remove",
        icon: "pi pi-trash",
        //command: () => handleRemoveAction(selected.value[0].id),
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
