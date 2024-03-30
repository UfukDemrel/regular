import {create} from 'zustand';

export const useStore = create((set) => ({
    tasks: {
        mordecai: [],
        rigby: [],
        benson: [],
        pops: [],
        skips: [],
        done: []
      },
      addTask: (column, task) =>
      set((state) => {
        const updatedTasks = { ...state.tasks, [column]: [...state.tasks[column], task] };
        console.log("Add Tasks:",updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        return { tasks: updatedTasks };
      }),
    moveTask: (source, destination, taskIndex) =>
      set((state) => {
        const updatedTasks = { ...state.tasks };
        const [movedTask] = updatedTasks[source].splice(taskIndex, 1);
        updatedTasks[destination].push(movedTask);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        console.log("Move Tasks:",updatedTasks);
        return { tasks: updatedTasks };
      }),    
}));

