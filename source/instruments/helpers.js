export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function sortTasks(tasks) {
  let tasksCopy = JSON.parse(JSON.stringify(tasks));

  tasksCopy.sort((a, b) => {
    if (a.favorite > b.favorite) {
      return -1;
    }
    if (a.favorite < b.favorite) {
      return 1;
    }
    return 0;
  });

  tasksCopy.sort((a, b) => {
    if (a.completed < b.completed) {
      return -1;
    }
    if (a.completed > b.completed) {
      return 1;
    }
    return 0;
  });

  return tasksCopy;
}
