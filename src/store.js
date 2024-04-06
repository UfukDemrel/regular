import { create } from 'zustand';

export const useStore = create((set) => ({
  tasks: {
    mordecai: [],
    rigby: [],
    benson: [],
    pops: [],
    skips: [],
    muscleman: [],
    highfive: [],
    done: []
  },
  addTask: (column, task) =>
    set((state) => {
      const updatedTasks = { ...state.tasks, [column]: [...state.tasks[column], task] };
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  moveTask: (source, destination, taskIndex) =>
    set((state) => {
      const updatedTasks = { ...state.tasks };
      const [movedTask] = updatedTasks[source].splice(taskIndex, 1);
      updatedTasks[destination].push(movedTask);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    })
}));
