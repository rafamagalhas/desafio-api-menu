export function menuTreeCompose(data: any[]) {
  const transformedMenu = transformMenu(data);
  const newMenu: any[] = [];
  
  transformedMenu.map((menu) => {
    const subMenu = transformedMenu.filter((menuItem: { relatedId: String; }) => menuItem.relatedId === menu.id)
    menu.subMenus = subMenu
  
    if (!menu.relatedId){
      newMenu.push(menu);
    }
  })
  return newMenu;
}

function transformMenu(data: any[]) {
  const transformedMenu = data.map(({_id, ...menuItems}) => ({
    id: _id,
    ...menuItems
  }));

  return transformedMenu;
}