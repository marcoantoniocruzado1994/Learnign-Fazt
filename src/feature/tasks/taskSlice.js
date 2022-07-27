import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task 1",
    description: "Task 1 description",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task 2 description",
    completed: false,
  },
];
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      } else {
        console.log("Task not found");
      }
    },
    updateTask: (state, action) => {
      const { id, completed, title, description } = action.payload;
      const foundTask = state.find((task) => task.id === id)
      if (foundTask) {
        foundTask.completed = completed;
        foundTask.title = title;
        foundTask.description = description;
      }else{
        console.log("Task not found");
      }
    },
  },
});

export default taskSlice.reducer;
export const { addTask, deleteTask, updateTask } = taskSlice.actions;
